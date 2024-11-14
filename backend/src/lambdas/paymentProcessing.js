export const handler = async (event) => {
  console.log({
    message: 'Event received by Payment Processing Lambda',
    event
  })
  // Interact with payment gateway and payment-related services
  // throw new Error('Payment Gateway unavailable!');
  const paymentApproved = true;
  return {
    paymentApproved,
    bookedSeatData: event.bookedSeatData,
  };
}