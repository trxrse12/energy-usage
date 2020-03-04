export class EmptyInputException extends Error {
  constructor (...params: (string|undefined)[]) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, EmptyInputException);
    }
  }
}

export class ContentTypeNotSetException extends Error {
  constructor (...params: (string|undefined)[]) {
    super(...params);
    this.name = 'ContentTypeNotSetException';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ContentTypeNotSetException);
    }
  }
}