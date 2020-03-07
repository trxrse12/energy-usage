import {expect} from 'chai';
import {isValidEnergyReadingPayload} from '.';
import {EnergyReadingPayload} from "../../../utils/types";

describe('isValidEnergyReadingPayload() function ', () => {
  let invalidEnergyReadingArray = [
    null, undefined, NaN, 0, [], ()=>{}, Symbol('incorrect reading'), {},
    {
      cumulative: -100000, // negative reading
      readingDate: "2017-07-31T00:00:00.000Z",
      unit: 'kWh',
    },
    {
      cumulative: 100, // negative reading
      readingDate: "xxxx-07-31T00:00:00.000Z", //brings up deprecation warning
      unit: 'kWh',
    },
    {
      cumulative: 100, // negative reading
      readingDate: "xxxx-07-31T00:00:00.000Z", //brings up deprecation warning
      unit: 'mWh',
    },
  ] as unknown as EnergyReadingPayload[];
  let validEnergyReading = {
    "cumulative": 18453,
    "readingDate": "2017-07-31T00:00:00.000Z",
    "unit": "kWh"
  } as unknown as EnergyReadingPayload;
  it('should return false when the input param is not a valid energy reading', () => {
    invalidEnergyReadingArray.forEach(invalidEnergyReading => {
      expect(isValidEnergyReadingPayload(invalidEnergyReading)).to.to.be.equal(false)
    })
  });
  it('should return true', () => {
    expect(isValidEnergyReadingPayload(validEnergyReading)).to.be.equal(true);
  });
});