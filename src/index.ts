import Koa, {ExtendableContext} from 'koa';

import { initialize } from './data'; // init the db
import { router } from './middlewares/router'
import {
  ContentTypeIsNotJsonException,
  ContentTypeNotSetException,
  EmptyInputException, InvalidRequestPayloadException
} from './validators/errors/custom-errors';

const PORT = process.env.PORT || 3000;

type TAnyPromise = () => Promise<any>;

async function checkEmptyPayload (ctx: ExtendableContext, next: TAnyPromise){
  if (['POST', 'PATCH', 'PUT'].includes(ctx.req.method!)
  &&  ctx.req.headers['content-length'] === '0'){
    throw new EmptyInputException();
  }
  await next();
}

async function checkContentTypeIsSet(ctx: ExtendableContext, next: TAnyPromise){
  if (
    ctx.req.headers['content-length']
    && ctx.req.headers['content-length'] !== '0'
    && !ctx.req?.headers['content-type']
  ) {
    throw new ContentTypeNotSetException();
  }
  await next();
}

async function checkContentTypeIsJson(ctx: ExtendableContext, next: TAnyPromise){
  if (!ctx.req.headers['content-type']?.includes('application/json')){
    throw new ContentTypeIsNotJsonException();
  }
  await next();
}

export default function createServer() {
  const server = new Koa();
  // now define the error middleware, to catch all the untreated errors in the subsequent middleware
  server.use(async (ctx, next) => {
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
    }
  });
  server.use(checkEmptyPayload);
  server.use(checkContentTypeIsSet);
  server.use(checkContentTypeIsJson);
  server.use(router.allowedMethods());
  server.use(router.routes());
  return server;
}

if (!module.parent) {
  initialize();
  const server = createServer();
  server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
  });
}
