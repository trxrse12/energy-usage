import {
  ContentTypeIsNotJsonException,
  ContentTypeNotSetException, DatabaseSavingOperationFailureException,
  EmptyInputException, InvalidRequestPayloadException
} from "../validators/errors/custom-errors";
import {ExtendableContext} from "koa";
import {TAnyPromise} from "../utils/types";

export const errorHandler = async (ctx: ExtendableContext, next: TAnyPromise) => {
  try {
    await next();
  } catch (err){
    // console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB err.name=', err.name);
    // console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB err.message=', err.message);
    // unknown error by default
    ctx.response.status = 500;
    ctx.body = {
      data: {message: 'Unknown internal error'},
    };

    // Invalid JSON error which results in the body parser
    if (err instanceof SyntaxError
      && err.message.includes('Unexpected token')){
      ctx.response.status = 400;
      ctx.body = {
        data: {message: 'Payload should be in JSON format'}
      }
    }

    // Empty input in a POST request
    if (err instanceof EmptyInputException){
      ctx.response.status = 400;
      ctx.body = {
        data: {message: 'Payload should not be empty'}
      }
    }

    // Content-Type header not set in a POST request
    if (err instanceof ContentTypeNotSetException){
      ctx.response.status = 400;
      ctx.body = {
        data: {message: 'The "Content-Type" header must be set for requests with a non-empty payload'},
      }
    }

    // Content-type is not set in a POST request
    if (err instanceof ContentTypeIsNotJsonException){
      ctx.response.status = 415;
      ctx.body = {
        data: {message: 'The "Content-Type" header must always be "application/json"'},
      }
    }

    // Content payload does not represent an energy reading
    if (err instanceof InvalidRequestPayloadException){
      ctx.response.status = 400;
      ctx.body = {
        data: {message: 'Payload must contain three fields: "cumulative", "readingDate" and "unit" fields'},
      }
    }

    // Readings could not be saved to the database
    if (err instanceof DatabaseSavingOperationFailureException){
      ctx.response.status = 403;
      ctx.body = {
        data: {message: 'Electricity reading could not be saved'},
      }
    }
  }
};