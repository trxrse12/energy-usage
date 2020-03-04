export class EmptyInputException extends Error {
  constructor (...params: (string|undefined)[]) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, EmptyInputException);
    }
  }
}