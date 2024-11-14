import { DynamoDBService } from './dynamodb.service';
import { v4 as uuidv4 } from 'uuid';
import { NoBookingFound } from '../errors/noBookingFound';
import { StepFunctionsService } from './stepFunctions.service';

export class SeatsService {
  static seatsIDs = ['A1', 'A2', 'A3', 'A4',
                              'B1', 'B2', 'B3', 'B4',
                              'C1', 'C2', 'C3', 'C4',
                              'D1', 'D2', 'D3', 'D4']

  static getSessionSeatsIDs(sessionId) {
    return this.seatsIDs;
  }

  static async getSeats(theaterId, roomId, sessionId) {
    const seatsIDs = this.getSessionSeatsIDs(sessionId);
    const exhibitionId = DynamoDBService.buildExhibitionID(theaterId, roomId, sessionId);
    const bookedSeats = (await DynamoDBService.getBookedSeats(exhibitionId)).Items;
    const bookedSeatsIDs = bookedSeats.map(bookedSeat => bookedSeat.seatId);
    const bookedSeatIDsSet = new Set(bookedSeatsIDs);
    return seatsIDs.map(seatId => ({
      seatId,
      isBooked: bookedSeatIDsSet.has(seatId),
    }));
  }

  static async bookSeat(seatData) {
    const exhibitionId = DynamoDBService.buildExhibitionID(
      seatData.theaterId,
      seatData.roomId,
      seatData.sessionId);
    const paymentCode = uuidv4();
    const ttl1Min = Math.floor(Date.now() / 1000) + 60;
    const seatBookingData = {
      exhibitionId: exhibitionId,
      seatId: seatData.seatId,
      customerId: seatData.customerId,
      movieId: seatData.movieId,
      expires: ttl1Min,
      paymentCode: paymentCode,
    }
    await DynamoDBService.bookSeat(seatBookingData);
    return paymentCode;
  }

  static async seatCheckout(checkoutData) {
    const bookedSeat = (await DynamoDBService.getBookingByPaymentCode(checkoutData.paymentCode)).Items[0];
    if (!bookedSeat)
      throw new NoBookingFound('');
    await DynamoDBService.removeBookingExpiration(bookedSeat.exhibitionId, bookedSeat.seatId);
    delete bookedSeat.expires;
    delete bookedSeat.paymentCode;
    const postBookingWorkflowPayload = {
      bookedSeatData: bookedSeat,
      checkoutData,
    }
    await StepFunctionsService.startWorkflow(postBookingWorkflowPayload);
  }
}