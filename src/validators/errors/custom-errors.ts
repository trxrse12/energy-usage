export class EmptyInputException extends Error {
  constructor (...params: (string|undefined)[]) {
    super(...params);
    this.name = 'EmptyInputException';
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

export class ContentTypeIsNotJsonException extends Error {
  constructor (...params: (string|undefined)[]) {
    super(...params);
    this.name = 'ContentTypeIsNotJsonException';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ContentTypeIsNotJsonException);
    }
  }
}