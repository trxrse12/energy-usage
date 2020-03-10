import { EnergyReadingPayload, EngineType} from "../../../utils/types";
import {interpolateEnergyReadings} from "../../computing/monthly/usage";
import sampleData from '../../../../sampleData.json';

export const retrieveUsageEngine: EngineType = async () => {
  const energyReadings = sampleData.electricity as unknown as EnergyReadingPayload[];
  try {
    const retrievedUsage = await interpolateEnergyReadings(energyReadings);
    console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLL retrievedUsage=', retrievedUsage)
    return retrievedUsage;
  } catch (e){
    throw e
  }
};
