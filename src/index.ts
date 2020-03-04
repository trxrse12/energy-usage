import Koa, {ExtendableContext} from 'koa';

import { initialize } from './data'; // init the db
import { router } from './middlewares/router'
import {EmptyInputException} from './validators/errors/custom-errors';

const PORT = process.env.PORT || 3000;

type TAnyPromise = () => Promise<any>;

function checkEmptyPayload (ctx: ExtendableContext, next: TAnyPromise){
  console.log('KOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOK ctx.req.method=', ctx.req.method);
  console.log('KOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOK ctx.req.headers=', ctx.req.headers);
  if (['POST', 'PATCH', 'PUT'].includes(ctx.req.method!)
  &&  ctx.req.headers['content-length'] === '0'){
    console.log('HUHUHUHUHUHUHUHUHUHUHUHUHUHUHUHHU')
    throw new EmptyInputException();
  }
  next();
}

function checkContentTypeIsSet(ctx: ExtendableContext, next: TAnyPromise){
  if (
    ctx.req.headers['content-length']
    && ctx.req.headers['content-length'] !== '0'
    && !ctx.req?.headers['content-type']
  ) {
    ctx.response.status = 400;
    ctx.body = {
      data: {message: 'The "Content-Type" header must be set for requests with a non-empty payload'},
    }
  }
  next();
}

function checkContentTypeIsJson(ctx: ExtendableContext, next: TAnyPromise){
  if (!ctx.req.headers['content-type']?.includes('application/json')){
      ctx.response.status = 415;
    ctx.body = {
      data: {message: 'The "Content-Type" header must always be "application/jssssson"'},
    }
  }
  next();
}

export default function createServer() {
  const server = new Koa();
  // now define the error middleware, to catch all the untreated errors in the subsequent middleware
  server.use(async (ctx, next) => {
    try {
      await next();
    } catch (err){
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
          data: {message: 'Payload should not be emptyyyy'}
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
