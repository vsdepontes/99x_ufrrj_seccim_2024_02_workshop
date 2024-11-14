export const handler = async (event) => {
  console.log({
    message: 'Event received by Mailing Lambda',
    event
  })
  // Fetch customer info (including e-mail) with customerId
  if (event.paymentApproved) {
    // Interact with mailing service
    console.log('Mail Sent - Success Checkout')
  } else {
    // Interact with mailing service
    console.log('Mail Sent - Failed Checkout')
  }
  // throw new Error('Mailing Service unavailable!');
}