// custom type guard for the EnergyReadingPayloads
import moment from "moment";
import {EnergyReadingPayload, ValidatorType} from "../../../utils/types";

export const isValidEnergyReadingPayload: ValidatorType =
  function (energyReading: EnergyReadingPayload): energyReading is EnergyReadingPayload {
  const cumulative = energyReading?.cumulative;
  const readingDate = energyReading?.readingDate;
  const unitKwh = energyReading?.unit;
  const testConditions = cumulative && (typeof cumulative === 'number') && (cumulative > 0)
    && readingDate
    && moment(readingDate).isValid()
    && (energyReading?.unit === 'kWh');
  if (testConditions) {
    return true;
  }
  return false;
};