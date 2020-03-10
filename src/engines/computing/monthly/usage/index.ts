import {
  EndOfMonthForEnergyReading,
  EnergyReading,
  EnergyReadingPayload,
  InterpolatedGrid
} from "../../../../utils/types";
import _ from 'lodash';
import moment from 'moment';
import {isValidEnergyReadingPayload} from "../../../../validators/readings/create";

const getDiffInMonths = (mmt1: moment.Moment, mmt2: moment.Moment) => {
  // console.log('JIJIJIJIJIJIJJIJIJIJIJIJIJJIJIJIJ mmt1=', mmt1)
  // console.log('JIJIJIJIJIJIJJIJIJIJIJIJIJJIJIJIJ mmt2=', mmt2)
  // console.log('JIJIJIJIJIJIJJIJIJIJIJIJIJJIJIJIJ mmt1.diff(mmt2, \'months\')=', mmt1.diff(mmt2, 'months', true))
  return mmt1.diff(mmt2, 'months', true); // without 'true' it does not work, as it truncates
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
export const interpolateEnergyReadings = (energyReadings: EnergyReadingPayload[])
  : InterpolatedGrid => {
  const sortedReadings = sortReadings(energyReadings);
  const interpolatedGrid: InterpolatedGrid = [];
  sortedReadings.forEach((reading, idx: number, readings) => {
    const endOfMonth: moment.Moment = moment(reading.readingDate).endOf('month').utc();
    const isNextMonthValueMissing = readings[idx+1]?.readingDate
      && moment(reading.readingDate).endOf('month').add(1).endOf('month').isBefore(moment(readings[idx+1].readingDate));

    // save the reading value as the interpolated value if the reading correspond to the last day of the month
    if (getDiffInDays(moment(reading.readingDate), moment(reading.readingDate).endOf('month'))===0){
      return interpolatedGrid[idx] = [endOfMonth, reading.cumulative, 0];
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
      return interpolatedGrid[idx] = [endOfMonth, interpolatedValue, 0]
    } else { // when there is no subsequent value reading for next month
      return interpolatedGrid[idx] = [endOfMonth, undefined, 0]
    }
  });
  // calculate the energy consumption
  let energyConsumption: EnergyReading | undefined;

  let energyConsumptionGrid:InterpolatedGrid = [];
  interpolatedGrid.forEach((processedRecord, idx) => {
    // console.log('')
    // console.log('UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU processedRecord=', processedRecord)
    // starts the parsing from the second record in the interpolatedGrid
    if (idx > 0 && processedRecord[1]){
      // if is safe to calculate the energy consumption because the current record' month is
      //  consecutive to the previous record's month
      if ( getDiffInMonths(processedRecord[0], moment(interpolatedGrid[idx-1][0]))<=1.01){ // 1.01 instead of 1 due to diff misbehaviour!!!
        // console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX getDiffInMonths=', getDiffInMonths(processedRecord[0], moment(interpolatedGrid[idx-1][0])))
        // console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB processedRecord[0]=', processedRecord[0])
        // console.log('WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW interpolatedGrid[idx-1][0]=', interpolatedGrid[idx-1][0])
        // console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF processedRecord[1]!=', processedRecord[1]!)
        // console.log('NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN interpolatedGrid[idx-1][1]!=', interpolatedGrid[idx-1][1]!)
        // console.log('KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK processedRecord[1]! - interpolatedGrid[idx-1][1]!=', processedRecord[1]! - interpolatedGrid[idx-1][1]!)
        energyConsumptionGrid.push([
          processedRecord[0],
          processedRecord[1],
          processedRecord[1]! - interpolatedGrid[idx-1][1]!,
        ]) as unknown as EndOfMonthForEnergyReading;
      } else {
        energyConsumptionGrid.push([
          processedRecord[0],
          processedRecord[1],
          undefined,
        ]) as unknown as EndOfMonthForEnergyReading;
      }
    }
  });
 console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO energyConsumptionGrid=', energyConsumptionGrid)
  return energyConsumptionGrid!;

};
