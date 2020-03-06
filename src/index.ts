import Koa, {ExtendableContext} from 'koa';
import logger from 'koa-logger';
import { initialize } from './data'; // init the db
import { router } from './middlewares/router'
import {
  ContentTypeIsNotJsonException,
  ContentTypeNotSetException, DatabaseSavingOperationFailureException,
  EmptyInputException, InvalidRequestPayloadException
} from './validators/errors/custom-errors';
import {TAnyPromise} from './utils/types';
import {checkContentTypeIsJson} from './middlewares/check-content-type-is-json';
import {checkContentTypeIsSet} from './middlewares/check-content-type-is-set';
import {checkEmptyPayload} from './middlewares/check-empty-payload';
import {errorHandler} from "./middlewares/error-handler";

const PORT = process.env.PORT || 3000;

export default function createServer() {
  const server = new Koa();
  server.use(logger());

  // now define the error middleware, to catch all the untreated errors in the subsequent middleware
  server.use(async (ctx, next) => {
    await errorHandler(ctx, next);
  });
  server.use(checkEmptyPayload);
  server.use(checkContentTypeIsSet);
  server.use(checkContentTypeIsJson);
  server.use(router.allowedMethods());
  server.use(router.routes());
  return server;
}

if (!module.parent) {
  const database = initialize();
  const server = createServer();
  server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
  });
}
