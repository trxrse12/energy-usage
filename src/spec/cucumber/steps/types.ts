import {EnergyReadingPayload} from '../../../utils/types';

export interface ApiError{
  response?: unknown;
  statusCode? :number;
}

export interface Payload {
  status: number,
  text?: string,
  data?: {[key:string]:string}
}

export interface EnergyDatabase {
  electricity: EnergyReadingPayload[];
}