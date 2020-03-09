import {EnergyReadingPayload, EngineType} from "../../../utils/types";
import {interpolateEnergyReadings} from "../../computing/monthly/usage";
import sampleData from '../../../../sampleData.json';

export const retrieveUsageEngine: EngineType = async () => {
  const energyReadings = sampleData.electricity as unknown as EnergyReadingPayload[];
  try {
    const retrieveUsage = await interpolateEnergyReadings(energyReadings);
    return retrieveUsage;
  } catch (e){
    throw e
  }
};