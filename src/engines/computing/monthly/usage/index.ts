import {EnergyReadingPayload} from "../../../../utils/types";
import _ from 'lodash';
import moment from 'moment';
import {isValidEnergyReadingPayload} from "../../../../validators/readings/create";

/**
 * Check whether a moment object is the end of the month.
 * Ignore the time part.
 * @param {moment} mmt
 */
function isEndOfMonth(mmt: moment.MomentInput) {
  // startOf allows to ignore the time component
  // we call moment(mmt) because startOf and endOf mutate the momentj object.
  return moment
    .utc(mmt)
    .startOf('day')
    .isSame(
      moment
        .utc(mmt)
        .endOf('month')
        .startOf('day'),
    );
}

/**
 * Returns the difference between two moment objects in number of days.
 * @param {moment} mmt1
 * @param {moment} mmt2
 */
function getDiffInDays(mmt1: moment.Moment, mmt2: moment.MomentInput) {
  return mmt1.diff(mmt2, 'days');
}

/**
 * Return the number of days between the given moment object
 * and the end of the month of this moment object.
 * @param {moment} mmt
 */
function getDaysUntilMonthEnd(mmt: moment.MomentInput) {
  return getDiffInDays(moment.utc(mmt).endOf('month'), mmt);
}

type InterpolationGrid = [moment.Moment[], moment.Moment[]];

// build a function that returns a regular grid of
export const buildLimitsOfMonth = (energyReadings: EnergyReadingPayload[]): InterpolationGrid => {
  const sortedReadings = sortReadings(energyReadings);
  const interpolationStartDatesGrid: moment.Moment[] = [];
  const interpolationEndDatesGrid: moment.Moment[] = [];
  sortedReadings.forEach((reading, idx: number) => {
    interpolationStartDatesGrid[idx] = moment(reading.readingDate).startOf('month');
    interpolationEndDatesGrid[idx] = moment(reading.readingDate).endOf('month');
  });
  const zippedGrid = _.zip(interpolationStartDatesGrid, interpolationEndDatesGrid) as unknown as InterpolationGrid;
  return zippedGrid;
};


// sort readings ascendingly by the time reading
export const sortReadings = (energyReadings: EnergyReadingPayload[]): EnergyReadingPayload[] => {
  if (energyReadings && Array.isArray(energyReadings)
    && energyReadings.every((energyReading) => isValidEnergyReadingPayload(energyReading))){
    return _.orderBy(energyReadings, (reading: any) => moment(reading.readingDate).unix(), ['asc']);
  }
  return [];
};
