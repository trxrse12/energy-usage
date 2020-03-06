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

export class InvalidRequestPayloadException extends Error {
  constructor (...params: (string|undefined)[]) {
    super(...params);
    this.name = 'InvalidRequestPayloadException';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidRequestPayloadException);
    }
  }
}

export class UnknownInternalErrorException extends Error {
  constructor (...params: (string|undefined)[]) {
    super(...params);
    this.name = 'UnknownInternalErrorException';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnknownInternalErrorException);
    }
  }
}

export class DatabaseSavingOperationFailureException extends Error {
  constructor (...params: (string|undefined)[]) {
    super(...params);
    this.name = 'DatabaseSavingOperationFailureException';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DatabaseSavingOperationFailureException);
    }
  }
}
