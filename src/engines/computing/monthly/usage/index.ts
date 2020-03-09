import {EnergyReadingPayload} from "../../../../utils/types";
import _ from 'lodash';
import moment from 'moment';
import {isValidEnergyReadingPayload} from "../../../../validators/readings/create";

type EnergyReading = number | undefined;

// A tuple type: [end_of_month_for_that_reading, interpolated_energy_reading_value]
type EndOfMonthForEnergyReading = [moment.Moment, EnergyReading];

// A simple structure that will ease the energy interpolation algorithm:
type InterpolatedGrid = EndOfMonthForEnergyReading[];

const getDiffInMonths = (mmt1: moment.Moment, mmt2: moment.Moment) => {
  return mmt1.diff(mmt2, 'months');
}

export const getDiffInDays = (mmt1: moment.Moment, mmt2: moment.Moment) => {
  return mmt1.diff(mmt2, 'days');
};

// sort readings ascendingly by the time reading
export const sortReadings = (energyReadings: EnergyReadingPayload[]): EnergyReadingPayload[] => {
  if (energyReadings && Array.isArray(energyReadings)
    && energyReadings.every((energyReading) => isValidEnergyReadingPayload(energyReading))){
    return _.orderBy(energyReadings, (reading: any) => moment(reading.readingDate).unix(), ['asc']);
  }
  return [];
};


// build a function that returns the interpolated values
// Obs. The interpolation algorithm will return a set of pairs, [endOfMonths, interpolatedReading]
//    Special cases:
//    1. when there is not possible to interpolate the end of the month reading (because there is no reading
//        for the subsequent month, the interpolated value is simply "undefined", but IS actually being reported
//    2. when there is NO reading for a samople month, that month is NOT actually being reported
export const interpolateEnergyReadings = (energyReadings: EnergyReadingPayload[]): InterpolatedGrid => {
  const sortedReadings = sortReadings(energyReadings);
  const interpolatedGrid: InterpolatedGrid = [];
  sortedReadings.forEach((reading, idx: number, readings) => {
    const endOfMonth: moment.Moment = moment(reading.readingDate).endOf('month').utc();
    const isNextMonthValueMissing = readings[idx+1]?.readingDate
      && moment(reading.readingDate).endOf('month').add(1).endOf('month').isBefore(moment(readings[idx+1].readingDate));
    // save the reading value as the interpolated value if the reading correspond to the last day of the month
    if (getDiffInDays(moment(reading.readingDate), moment(reading.readingDate).endOf('month'))===0){
      return interpolatedGrid[idx] = [endOfMonth, reading.cumulative];
    };
    // in the cases where the reading is NOT reported the last day of the month
    if (!isNextMonthValueMissing){ // then if there is a valid subsequent reading for next month, interpolate!
      const v1 = readings[idx+1] ? readings[idx+1].cumulative : undefined;
      const v0 = reading.cumulative;
      const M1 = endOfMonth.unix();
      const d0 = moment(reading.readingDate).unix();
      const d1 = readings[idx+1] ? moment(readings[idx+1].readingDate).unix() : undefined;
      const interpolatedValue: number|undefined =
        v1 && d1 ? (v1 -v0) * (M1 - d0)/(d1 -d0) + v0 : undefined;
      return interpolatedGrid[idx] = [endOfMonth, interpolatedValue]
    } else { // when there is no subsequent value reading for next month
      return interpolatedGrid[idx] = [endOfMonth, undefined]
    }
  });
  return interpolatedGrid;
};
