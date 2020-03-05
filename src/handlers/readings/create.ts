import {ExtendableContext, Response} from 'koa';
import moment from 'moment';
import {
  InvalidRequestPayloadException,
  UnknownInternalErrorException,
} from "../../validators/errors/custom-errors";

interface EnergyReadingPayload {
  cumulative: number,
  readingDate: string,
  unit: 'kWh',
}
// custom type guard for the EnergyReadingPayloads
function isValidEnergyReadingPayload(energyReading: EnergyReadingPayload): energyReading is EnergyReadingPayload {
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

export const createReading = async (ctx: ExtendableContext, next: () => Promise<any>) => {
  try {
    console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD Context Body:", ctx.request.body);

    // checking the shape of the request payload to conform to the EnergyReadingPayload format
    if (!isValidEnergyReadingPayload(ctx?.request?.body)){
      throw new InvalidRequestPayloadException(); // custom validation error
    }
  } catch (e) {
    if (!(e instanceof InvalidRequestPayloadException)){
      throw new UnknownInternalErrorException(e);
    }
    throw e;
  }
  ctx.response.status = 201;
  ctx.body = {
    data: {message: 'Data saved OK'},
  };
  ctx.set('content-type', 'application/json')
};
