import {EnergyReadingPayload, EngineType} from "../../../utils/types";
import {isValidEnergyReadingPayload} from "../../../validators/readings/create";
import {promisifiedRun, promisifiedAll} from "../../../utils";


export const createReadingEngine: EngineType = async (reading) => {
  let operationalResult = false;
  let insertResult: unknown;
  // if valid energy reading
  if (isValidEnergyReadingPayload(reading!)){
    // start preparing the reading insertion
    const insertSql: string =
      `INSERT INTO meter_reads (cumulative, reading_date, unit)
        VALUES ('${reading?.cumulative}', '${reading?.readingDate}', '${reading?.unit}');`
    // const showTableSql = `SELECT * FROM dbname.sqlite_master WHERE type='table';`;
    try {
      insertResult = await promisifiedRun(insertSql);
      // check to see the value is saved
      const selectRecentlyInsertedRecordSql =
        `SELECT * FROM meter_reads WHERE (
          cumulative = '${reading?.cumulative}'
          AND reading_date = '${reading?.readingDate}' 
          AND unit = '${reading?.unit}');`;
      const recentInsertion = await promisifiedAll(selectRecentlyInsertedRecordSql)
      return recentInsertion && (recentInsertion as unknown[]).length > 0;
    } catch(e) {
      throw e;
    }
  }
  return false;
};