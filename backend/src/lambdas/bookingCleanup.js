import { DynamoDBService } from '../services/dynamodb.service';

export const handler = async (event) => {
  console.log({
    message: 'Event received by Booking Cleanup Lambda',
    event
  })
  const { exhibitionId, seatId } = event.bookedSeatData;
  await DynamoDBService.removeBooking(exhibitionId, seatId);
  return event;
}