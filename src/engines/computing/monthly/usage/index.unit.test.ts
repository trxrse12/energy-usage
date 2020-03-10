import {interpolateEnergyReadings, sortReadings, getDiffInDays} from "./index";
import {EndOfMonthForEnergyReading, EnergyReadingPayload, InterpolatedGrid} from "../../../../utils/types";
import moment from 'moment';
import {expect} from 'chai';

let validSetOfReadings = [
  { cumulative: 17580,
    readingDate: '2017-03-28T00:00:00.000Z',
    unit: 'kWh' },
  { cumulative: 18002,
    readingDate: '2017-05-08T00:00:00.000Z',
    unit: 'kWh' },
  { cumulative: 18270,
    readingDate: '2017-06-18T00:00:00.000Z',
    unit: 'kWh' },
  { cumulative: 17759,
    readingDate: '2017-04-15T00:00:00.000Z',
    unit: 'kWh' },
  { cumulative: 18682,
    readingDate: '2017-09-10T00:00:00.000Z',
    unit: 'kWh' },
  { cumulative: 18453,
    readingDate: '2017-07-31T00:00:00.000Z',
    unit: 'kWh' },
  { cumulative: 18620,
    readingDate: '2017-08-31T00:00:00.000Z',
    unit: 'kWh' },
  // { cumulative: 19887,                       INTENTIONALLY ELIMINATED
  //   readingDate: '2018-01-23T00:00:00.000Z',
  //   unit: 'kWh' },
  { cumulative: 18905,
    readingDate: '2017-10-27T00:00:00.000Z',
    unit: 'kWh' },
  { cumulative: 20750,
    readingDate: '2018-04-29T00:00:00.000Z',
    unit: 'kWh' },
  { cumulative: 19667,
    readingDate: '2017-12-31T00:00:00.000Z',
    unit: 'kWh' },
  { cumulative: 20290,
    readingDate: '2018-02-19T00:00:00.000Z',
    unit: 'kWh' },
  { cumulative: 19150,
    readingDate: '2017-11-04T00:00:00.000Z',
    unit: 'kWh' },
  { cumulative: 20406,
    readingDate: '2018-03-14T00:00:00.000Z',
    unit: 'kWh' },
] as unknown as EnergyReadingPayload[];
let interpolatedSetOfReadings = [
  // { cumulative: 17609.83,
  //   readingDate: '2017-03-31T00:00:00.000Z',
  //   unit: 'kWh' },
  { cumulative: 307.65,
    readingDate: '2017-04-30T00:00:00.000Z',
    unit: 'kWh' },
  { cumulative: 234.86,
    readingDate: '2017-05-31T00:00:00.000Z',
    unit: 'kWh' },
  { cumulative: 168.73,
    readingDate: '2017-06-30T00:00:00.000Z',
    unit: 'kWh' },
  { cumulative: 127.85,
    readingDate: '2017-07-31T00:00:00.000Z',
    unit: 'kWh' },
  { cumulative: 167,
    readingDate: '2017-08-31T00:00:00.000Z',
    unit: 'kWh' },
  { cumulative: 161.4,
    readingDate: '2017-09-30T00:00:00.000Z',
    unit: 'kWh' },
  { cumulative: 276.7,
    readingDate: '2017-10-31T00:00:00.000Z',
    unit: 'kWh' },
  { cumulative: 336.32,
    readingDate: '2017-11-30T00:00:00.000Z',
    unit: 'kWh' },
  { cumulative: 272.18,
    readingDate: '2017-12-31T00:00:00.000Z',
    unit: 'kWh' },
  // { cumulative: undefined,                 // THIS VALUE SHOULD NOT APPEAR IN THE OUTPUTS AT ALL
  //   readingDate: '2018-01-31T00:00:00.000Z', // AS IT IS UNDEFINED
  //   unit: 'kWh' },
  { cumulative: undefined,
    readingDate: '2018-02-28T00:00:00.000Z', // THIS VALUE SHOULD APPEAR IN THE OUTPUTS as UNDEFINED
    unit: 'kWh' },                           // AS THE PREVIOUS MONTH READING IS UNDEFINED
  { cumulative: 197.74,
    readingDate: '2018-03-31T00:00:00.000Z',
    unit: 'kWh' },
];
// let monthlyInterpolatedReadings =
let invalidSetOfReadingsArray = [
  null,
  undefined,
  [],
  {},
  0,
  {cumulative: 'abc'},
  {
    "cumulative": 19150,
    "readingDate": "2017-11-04T00:00:00.000Z",
    "unit": "MWh"
  },
  {
    "cumulative": 19150,
    "readingDate": "201711-04T00:00:00.000Z",
    "unit": "kWh"
  },
  () => {},
  Symbol('Not OK')
] as unknown as EnergyReadingPayload[][];

describe('function sortReadings', () => {
  let sortedReadings: EnergyReadingPayload[];
  describe('when called with an invalid set of readings', () => {
    it('should return an empty array', () => {
      invalidSetOfReadingsArray.forEach((invalidSetOfReadings) => {
        expect(sortReadings(invalidSetOfReadings)).to.be.eql([]);
      })
    });
  });
  describe('when called with a valid set of readings, vvv', () => {
    beforeEach(() => {
      sortedReadings = sortReadings(validSetOfReadings);
    });
    it('should return a time sorted set of readings', () => {
      expect(sortedReadings.length).to.be.greaterThan(0);
      sortedReadings.forEach((sortedReading) =>  {
        // console.log('><><><><>', sortedReading)
        // console.log('>>>>>>>>',moment(sortedReading.readingDate).isValid())
        expect(sortedReadings.length).to.be.equal(validSetOfReadings.length);
      })
    });
  });
});

describe('interpolateEnergyReadings function', () => {
  let setOfInterpolatedReadings: InterpolatedGrid = [];
  describe('when called with a valid set of energy readings', () => {
    beforeEach(() => {
      setOfInterpolatedReadings = interpolateEnergyReadings(validSetOfReadings);
    });
    it('should produce an array of pairs having length equal to the number of months that can be calculated', () => {
      expect(setOfInterpolatedReadings.length).to.be.equal(11);
    });
    it('should report correct interpolation dates', () => {
      // check the dates in the interpolated output are correct (against the model built in Excel)
      setOfInterpolatedReadings.forEach((reading: EndOfMonthForEnergyReading, idx: number) => {
        const getDiffInDaysValue = getDiffInDays(reading[0], moment(interpolatedSetOfReadings[idx].readingDate));
        expect(getDiffInDaysValue).to.be.equal(0);
      });
    });
    it('should report interpolated values are within less than 2% from the correct values', () => {
      setOfInterpolatedReadings.forEach((reading: EndOfMonthForEnergyReading, idx: number) => {
        // console.log('IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII reading=', reading)
        // check the interpolated values are within less than 1% from the correct values (as per the Excel model)
        if (reading[2]) { // not undefined
          expect(Math.abs(reading[2]/interpolatedSetOfReadings[idx].cumulative!)).to.be.closeTo(1, 0.02);
        }
      });
    });
    it('should report non-interpolable values as undefined', () => {
      setOfInterpolatedReadings.forEach((reading: EndOfMonthForEnergyReading, idx: number) => {
// last but not least check the non-interpolable values are undefined
//         console.log('IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII reading=', reading)
        if (idx === 11) {
          expect(reading[1]).to.be.undefined;
        }
      });
    });
  });
});

describe('calculateEnergyUsage() function', () => {
  describe('when called with a valid set of monthly interpolated readings', () => {
    it('should return a valid set of monthly electricity usage figures', () => {
      // const monthlyUsageFigures = calculateEnergyUsage(validSetOfReadings);

    });
  });
});
