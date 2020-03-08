import {ExtendableContext} from "koa";

export type TAnyPromise = () => Promise<any>;

export interface EnergyReadingPayload {
  cumulative: number,
  readingDate: string,
  unit: 'kWh',
}

// type needed to typecheck the structures used in decoupling engine from handlers for each route
export type HandlerReturnType = Promise<void>;
export type HandlerType =
  (ctx: ExtendableContext, next: TAnyPromise, db: DbType, engine: EngineType, validator: ValidatorType) => HandlerReturnType;
export type EngineType = (energyReading: EnergyReadingPayload, db: DbType, validator: ValidatorType) => Promise<boolean> | Promise<unknown>;
export type ValidatorType = (energyReading: EnergyReadingPayload) => boolean;

export type HandlerToEngineMap = Map<HandlerType, EngineType>;
export type HandlerToValidatorMap = Map<HandlerType, ValidatorType>;
export type DbType = unknown; // to be replaced with a more precise type


export type HandlerInjecter = (
  handler: HandlerType,
  db: DbType,
  handlerToEngineMap: HandlerToEngineMap,
  handlerToValidatorMap: HandlerToValidatorMap) =>
    (ctx: ExtendableContext, next: TAnyPromise) => unknown;