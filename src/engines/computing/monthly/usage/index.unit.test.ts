import sampleData from '../../../../../sampleData.json';
import {interpolateEndOfMonth, sortReadings} from "./index";
import {EnergyReadingPayload} from "../../../../utils/types";
import moment from 'moment';
import _ from 'lodash';
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
    reading_date: '2017-09-10T00:00:00.000Z',
    unit: 'kWh' },
  { cumulative: 18453,
    reading_date: '2017-07-31T00:00:00.000Z',
    unit: 'kWh' },
  { cumulative: 18620,
    readingDate: '2017-08-31T00:00:00.000Z',
    unit: 'kWh' },
  { cumulative: 19887,
    readingDate: '2018-01-23T00:00:00.000Z',
    unit: 'kWh' },
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
  { cumulative: 100000,
    readingDate: '3000-01-01T00:00:00.000Z',
    unit: 'kWh' }
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
  describe('when called with a valid set of readings', () => {
    beforeEach(() => {
      sortedReadings = sortReadings(validSetOfReadings);
    });
    it('should return a time sorted set of readings', () => {
      sortedReadings.forEach((sortedReading) =>  {
        console.log('><><><><>', sortedReading)
        console.log('>>>>>>>>',moment(sortedReading.readingDate).isValid())
        expect(sortedReadings.length).to.be.equal(validSetOfReadings.length);
      })
    });
  });
});