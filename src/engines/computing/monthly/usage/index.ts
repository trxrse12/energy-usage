import {EnergyReadingPayload} from "../../../../utils/types";
import _ from 'lodash';
import moment from 'moment';
import {isValidEnergyReadingPayload} from "../../../../validators/readings/create";

export const interpolateEndOfMonth = (energyReadings: EnergyReadingPayload[]): [] => {
  return [];
};

// sort readings ascendingly by the time reading
export const sortReadings = (energyReadings: EnergyReadingPayload[]): EnergyReadingPayload[] => {
  if (energyReadings && Array.isArray(energyReadings)
    && energyReadings.every((energyReading) => isValidEnergyReadingPayload(energyReading))){
    return _.orderBy(energyReadings, (reading: any) => moment(reading.readingDate).unix(), ['asc']);
  }
  return [];
};
