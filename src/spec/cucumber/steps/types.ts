export interface ApiError{
  response?: unknown;
  statusCode? :number;
}

export interface Payload {
  status: number,
  text?: string,
  data?: string,
}

export interface EnergyReadingPayload {
  cumulative: number,
  readingDate: string,
  unit: 'kWh',
}
