import KoaRouter from 'koa-router';
const router = new KoaRouter();

import koaBody from 'koa-body';
import {injectHandlerDependencies} from "../utils/inject-handler-dependencies";
import {connection} from "../data";
import { createReadingHandler } from '../handlers/readings/create'
import { createReadingEngine } from '../engines/readings/create';
import {HandlerType, EngineType, HandlerToEngineMap, HandlerToValidatorMap} from "../utils/types";
import {create} from "domain";
import {isValidEnergyReadingPayload} from "../validators/readings/create";
// define the mappers need to inject Engines into the Handlers
const handlerToEngineMap: HandlerToEngineMap = new Map();
handlerToEngineMap.set(createReadingHandler, createReadingEngine);
const handlerToValidatorMap: HandlerToValidatorMap = new Map();
handlerToValidatorMap.set(createReadingHandler, isValidEnergyReadingPayload);

router.post('/readings', koaBody(), async (ctx, next) => {
  const injectionResult = injectHandlerDependencies(
    createReadingHandler, 'CONNECTION', handlerToEngineMap, handlerToValidatorMap)
  await injectionResult(ctx, next);
  await next();
});
export {
  router
};
