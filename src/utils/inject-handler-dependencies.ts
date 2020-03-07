import {ExtendableContext} from "koa";
import {
  DbType,
  EngineType, HandlerInjecter,
  HandlerReturnType,
  HandlerToEngineMap, HandlerToValidatorMap,
  HandlerType,
  TAnyPromise
} from "./types";


export const injectHandlerDependencies: HandlerInjecter = (
  handler: HandlerType,
  db: DbType,
  handlerToEngineMap: HandlerToEngineMap,
  handlerToValidatorMap: HandlerToValidatorMap): (ctx: ExtendableContext, next: TAnyPromise) => void => {
  if (handlerToEngineMap.has(handler)){
    const engine: EngineType | undefined =
      handlerToEngineMap.get(handler);
    if (engine) {
      if (handlerToValidatorMap.has(handler)){
        const validator = handlerToValidatorMap.get(handler);
        return (ctx: ExtendableContext, next: TAnyPromise) => {
          return handler(ctx, next, db, engine, validator!)
        }
      }
      throw new Error('Invalid handler');
    }
    throw new Error('Invalid engine');
  }
  throw new Error('Invalid handler');
};