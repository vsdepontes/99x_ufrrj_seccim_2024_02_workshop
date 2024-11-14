import { createResponse } from '../utils/createResponse';
import { SeatsService } from '../services/seats.service';

export const handler = async (event) => {
  const { httpMethod, resource } = event;
  const endpointKey = `${httpMethod} ${resource}`;
  const queryParams = event.queryStringParameters;
  const body = JSON.parse(event.body);

  switch (endpointKey) {
    case 'GET /seats': {
      const seats = await SeatsService.getSeats(
        queryParams.theaterId,
        queryParams.roomId,
        queryParams.sessionId,
      );
      return createResponse(200, seats);
    }

    case 'POST /seats/book': {
      let paymentCode;
      try {
        paymentCode = await SeatsService.bookSeat(body);
      } catch (error) {
        if (error.name === 'ConditionalCheckFailedException') {
          return createResponse(409, { message: 'Reservation failed! Seat is already booked.'})
        } else {
          throw error;
        }
      }
      return createResponse(201, { paymentCode });
    }

    case 'POST /seats/checkout': {
      try {
        await SeatsService.seatCheckout(body);
      } catch (error) {
        if (error.name === 'ConditionalCheckFailedException' ||
            error.name === 'NoBookingFound'
        ) {
          return createResponse(404, { message: 'This booking already expired or paymentCode is invalid!' })
        } else {
          throw error;
        }
      }
      return createResponse(201)
    }

    default:
      return createResponse(400, { message: 'Invalid Operation' });
  }
}