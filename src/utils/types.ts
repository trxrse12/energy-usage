export interface EnergyReadingPayload {
  cumulative: number,
  readingDate: string,
  unit: 'kWh',
}