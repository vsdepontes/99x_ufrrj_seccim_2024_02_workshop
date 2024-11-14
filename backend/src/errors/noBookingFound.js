export class NoBookingFound extends Error {
  constructor(message) {
    super(message);
    this.name = 'NoBookingFound';
    Error.captureStackTrace(this, this.constructor);
  }
}