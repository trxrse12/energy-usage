import {EnergyReadingPayload} from "./types";

type PayloadType = 'create reading';


// utility fction used in preparation of the BDD test suite
export const getValidPayload = (): EnergyReadingPayload | undefined => {
  return {
    cumulative: 100000,
    readingDate: '3000-01-01T00:00:00.000Z',
    unit: 'kWh',
  };
};