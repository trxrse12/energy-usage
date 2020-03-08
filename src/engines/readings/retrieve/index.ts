import {connection} from "../../../data";
import {EngineType} from "../../../utils/types";
import {ExtendableContext} from "koa";
import {promisifiedAll} from "../../../utils";

export const retrieveAllReadings: EngineType = async () => {
  const retrieveAllSql: string =
    `SELECT * FROM meter_reads;`
  const showTableSql = `SELECT * FROM dbname.sqlite_master WHERE type='table';`;
  try {
    const retrieveResult = await promisifiedAll(retrieveAllSql);
    return retrieveResult;
  } catch (e){
    throw e
  }
};