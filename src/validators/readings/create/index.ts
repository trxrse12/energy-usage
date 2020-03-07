// custom type guard for the EnergyReadingPayloads
import moment from "moment";
import {EnergyReadingPayload, ValidatorType} from "../../../utils/types";

export const isValidEnergyReadingPayload: ValidatorType =
  function (energyReading: EnergyReadingPayload): energyReading is EnergyReadingPayload {
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
};