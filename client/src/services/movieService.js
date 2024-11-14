import { configs } from '../utils/configs';

export const getSeats = async (sessionData) => {
  const response = await fetch(
    `${configs.backendUrl}/seats?${new URLSearchParams(sessionData).toString()}`, {
    method: "GET",
  });
  return response.json();
};

export const makeBooking = async (bookingData) => {
  const response = await fetch(`${configs.backendUrl}/seats/book`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      theaterId: bookingData.theaterId,
      roomId: bookingData.roomId,
      sessionId: bookingData.sessionId,
      seatId: bookingData.seatId,
      customerId: bookingData.customerId,
      movieId: bookingData.movieId,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
};

export const makePayment = async (paymentCode, paymentDetails) => {
  const response = await fetch(`${configs.backendUrl}/seats/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      paymentCode: paymentCode.paymentCode,
      cardHolder: paymentDetails.cardholderName,
      cardNumber: paymentDetails.cardNumber,
      expDate: paymentDetails.expiryDate,
      cvc: paymentDetails.cvc,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};
