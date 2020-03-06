import {ExtendableContext, Response} from 'koa';
import moment from 'moment';
import {
  DatabaseSavingOperationFailureException,
  InvalidRequestPayloadException,
  UnknownInternalErrorException,
} from "../../validators/errors/custom-errors";
import {saveReadingToDatabase} from "../../utils";
import {connection} from "../../data";
import {TAnyPromise} from "../../utils/types";

interface EnergyReadingPayload {
  cumulative: number,
  readingDate: string,
  unit: 'kWh',
}
// custom type guard for the EnergyReadingPayloads
export const isValidEnergyReadingPayload = function (energyReading: EnergyReadingPayload): energyReading is EnergyReadingPayload {
  const cumulative = energyReading?.cumulative;
  const readingDate = energyReading?.readingDate;
  const unitKwh = energyReading?.unit;
  if (
    cumulative && typeof cumulative === 'number' && cumulative > 0
    && readingDate
    && moment(readingDate).isValid()
    && energyReading?.unit === 'kWh'
  ) {
    return true;
  }
  return false;
}

export const createReading = async (ctx: ExtendableContext, next: TAnyPromise) => {
  const readingPayload = ctx?.request?.body;
  try {
    // checking the shape of the request payload to conform to the EnergyReadingPayload format
    if (!isValidEnergyReadingPayload(readingPayload)){
      throw new InvalidRequestPayloadException(); // custom validation error
    }
  } catch (e) {
    if (!(e instanceof InvalidRequestPayloadException)){
      throw new UnknownInternalErrorException(e);
    }
    throw e;
  }
  try{
    const saveOperationResult = saveReadingToDatabase(readingPayload);
    if (saveOperationResult){
      // recover the reading to be sure the write operation was ok
      ctx.response.status = 201;
      ctx.body = {
        data: {message: 'Data saved OK'},
      };
      ctx.set('content-type', 'application/json')
    } else {
      throw new DatabaseSavingOperationFailureException(); // not tested in this project
    }
  } catch (e) {
    throw (e);
  }


};
