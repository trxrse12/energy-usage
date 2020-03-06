import {EnergyReadingPayload} from '../../../utils/types';
import * as path from "path";

type PayloadType = 'create reading';

const appDirectory = path.resolve('.');

// utility fction used in preparation of the BDD test suite
export const getValidPayload = (): EnergyReadingPayload | undefined => {
  return {
    cumulative: 100000,
    readingDate: '3000-01-01T00:00:00.000Z',
    unit: 'kWh',
  };
};
