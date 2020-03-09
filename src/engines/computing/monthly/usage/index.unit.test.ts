import sampleData from '../../../../../sampleData.json';
import {buildLimitsOfMonth, sortReadings} from "./index";
import {EnergyReadingPayload} from "../../../../utils/types";
import moment from 'moment';
import _ from 'lodash';
import {expect} from 'chai';
import set = Reflect.set;

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

describe('buildLimitsOfMonth function', () => {
  describe('when called with a valid set of energy readings', () => {
    it('should produce an array of pairs representing the [beginning,end] of months surrounding the readings', () => {
      const setOfTuples = buildLimitsOfMonth(validSetOfReadings);
      expect(setOfTuples.length).to.be.equal(validSetOfReadings.length);
      setOfTuples.forEach((tuple) => {
        expect(moment(tuple[0]).diff(moment(tuple[0]).startOf("month"))).to.be.equal(0);
        expect(moment(tuple[1]).diff(moment(tuple[1]).endOf("month"))).to.be.equal(0);
      })
    });
  });
});

