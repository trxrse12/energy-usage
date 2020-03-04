import {EnergyReadingPayload} from "./types";

type PayloadType = 'create reading';


// utility fction used in preparation of the BDD test suite
export const getValidPayload = (payloadType: PayloadType): EnergyReadingPayload | undefined => {
  const lowercasePayloadType = payloadType?.toLowerCase();
  switch (lowercasePayloadType){
    case 'create reading':
      return {
        cumulative: 100000,
        readingDate: '3000-00-00T00:00:00.000Z',
        unit: 'kWh',
      };
    default: return undefined
  }
};