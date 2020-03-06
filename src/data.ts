import * as sqlite3 from 'sqlite3';
import sampleData from '../sampleData.json';
import {EnergyReadingPayload} from "./utils/types";
import util from "util";

const SQLite = sqlite3.verbose();

// @ts-ignore
export const connection = new SQLite.Database(':memory:');
const promisifiedRun = util.promisify(connection.run.bind(connection));

/**
 * Imports the data from the sampleData.json file into a `meter_reads` table.
 * The table contains three columns - cumulative, reading_date and unit.
 *
 * An example query to get all meter reads,
 *   connection.all('SELECT * FROM meter_reads', (error, data) => console.log(data));
 *
 * Note, it is an in-memory database, so the data will be reset when the
 * server restarts.
 */
export const initialize = () => {
  connection.serialize(async () => {
    await promisifiedRun(
      'CREATE TABLE meter_reads (cumulative INTEGER, reading_date TEXT, unit TEXT)'
    );

    const { electricity } = sampleData;
    electricity.forEach((data: { cumulative: any; readingDate: any; unit: any; }) => {
      connection.run(
        'INSERT INTO meter_reads (cumulative, reading_date, unit) VALUES (?, ?, ?)',
        [data.cumulative, data.readingDate, data.unit]
      );
    });
  });
};
