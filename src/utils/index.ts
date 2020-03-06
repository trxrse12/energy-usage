import {EnergyReadingPayload} from './types';
import {connection} from '../data';
import {isValidEnergyReadingPayload} from "../handlers/readings/create";
import util from 'util';

const promisifiedRun = util.promisify(connection.run.bind(connection));
const promisifiedAll = util.promisify(connection.all.bind(connection));

export const saveReadingToDatabase = async (reading: EnergyReadingPayload): Promise<boolean> => {
  let operationalResult = false;
  let insertResult: unknown;
  if (isValidEnergyReadingPayload(reading)){
    const insertSql: string =
      `INSERT INTO meter_reads (cumulative, reading_date, unit)
        VALUES ('${reading?.cumulative}', '${reading?.readingDate}', '${reading?.unit}');`
    const showTableSql = `SELECT * FROM dbname.sqlite_master WHERE type='table';`;
    try {
      insertResult = await promisifiedRun(insertSql);
      // check to see the value is saved
      const selectRecentlyInsertedRecordSql =
        `SELECT * FROM meter_reads WHERE (
          cumulative = '${reading?.cumulative}'
          AND reading_date = '${reading?.readingDate}' 
          AND unit = '${reading?.unit}');`
      const recentInsertion = await promisifiedAll(selectRecentlyInsertedRecordSql)
      if (recentInsertion && (recentInsertion as unknown[]).length>0){
        return true;
      } else {
        return false;
      }
    } catch(e) {
      throw e;
    }
  }
  return false;
};

