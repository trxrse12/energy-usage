import {
  DatabaseSavingOperationFailureException,
  InvalidRequestPayloadException,
  UnknownInternalErrorException,
} from "../../../validators/errors/custom-errors";
import {EnergyReadingPayload, HandlerType} from "../../../utils/types";

// the actual reading insertion handler
export const createReadingHandler: HandlerType = async (
  ctx, next, db: unknown, engine, validator
) => {
  const readingPayload = ctx?.request?.body as unknown as EnergyReadingPayload;
  try {
    // checking the shape of the request payload to conform to the EnergyReadingPayload format
    if (!validator!(readingPayload)){
      throw new InvalidRequestPayloadException(); // custom validation error
    }
  } catch (e) {
    if (!(e instanceof InvalidRequestPayloadException)){
      throw new UnknownInternalErrorException(e);
    }
    throw e;
  }
  try{
    // calls the engine
    const saveOperationResult = await engine(readingPayload, db, validator);
    if (saveOperationResult){
      // recover the reading to be sure the write operation was ok
      ctx.body = {
        data: {message: 'Data saved OK'},
      };
      ctx.response.status = 201;
      ctx.set('content-type', 'application/json')
      // await next();
    } else {
      throw new DatabaseSavingOperationFailureException(); // not tested in this project
    }
  } catch (e) {
    throw (e);
  }
};
