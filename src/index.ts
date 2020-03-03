import Koa from 'koa';

import { initialize } from './data'; // init the db
import { router } from './middlewares/router'

const PORT = process.env.PORT || 3000;

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
    }
  });
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
