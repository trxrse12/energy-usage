import Koa, {ExtendableContext} from 'koa';

import { initialize } from './data'; // init the db
import { router } from './middlewares/router'
import {
  ContentTypeNotSetException,
  EmptyInputException
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
  console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC ctx=', ctx)
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
      ctx.response.status = 415;
    ctx.body = {
      data: {message: 'The "Content-Type" header must always be "application/jssssson"'},
    }
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
      // console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB err.name=', err.name);
      // unknown error
      ctx.response.status = 500;
      ctx.body = {
        data: {message: 'Unknown internal error'},
      };
      // ctx.status = err.status || 500;
      // ctx.body = err.message;
      if (err instanceof SyntaxError
        && err.message.includes('Unexpected token')){
        ctx.response.status = 400;
        ctx.body = {
          data: {message: 'Payload should be in JSON format'}
        }
      }
      if (err instanceof EmptyInputException){
        ctx.response.status = 400;
        ctx.body = {
          data: {message: 'Payload should not be empty'}
        }
      }
      if (err instanceof ContentTypeNotSetException){
        ctx.response.status = 400;
        ctx.body = {
          data: {message: 'The "Content-Type" header must be set for requests with a non-empty payload'},
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
