export type TAnyPromise = () => Promise<any>;

export interface EnergyReadingPayload {
  cumulative: number,
  readingDate: string,
  unit: 'kWh',
}