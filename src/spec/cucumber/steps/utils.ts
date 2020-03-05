import {EnergyReadingPayload} from "./types";
import * as path from "path";
import * as fs from "fs";
import {COPYFILE_EXCL} from "constants";

type PayloadType = 'create reading';

const appDirectory = path.resolve('.');

// utility fction used in preparation of the BDD test suite
export const getValidPayload = (): EnergyReadingPayload | undefined => {
  return {
    cumulative: 100000,
    readingDate: '3000-01-01T00:00:00.000Z',
    unit: 'kWh',
  };
};

export const backupEnergyDatabase = (fileName: string): boolean => {
  const energyDatabaseFilePath = path.join(appDirectory, fileName);
  if (!fs.existsSync(energyDatabaseFilePath)){
    throw new Error('Could not find the energy readings file')
  } else {
    try {
      fs.copyFileSync(energyDatabaseFilePath, energyDatabaseFilePath + '.backup', COPYFILE_EXCL);
      console.log('Database backed up')
      return true
    } catch (e) {
      console.log('Database backup already exists')
      return true // the db already exists
    }
  }
  return false // could not copy as the original file not present
};

export const restoreEnergyDatabase = (fileName: string): boolean => {
  const energyDatabaseFilePath = path.join(appDirectory, fileName);
  if (!fs.existsSync(energyDatabaseFilePath + '.backup')){
    throw new Error('Could not find the backup for the energy readings file')
  } else {
    try {
      fs.copyFileSync(energyDatabaseFilePath + '.backup', energyDatabaseFilePath);
      console.log('database properly restored');
      return true;
    } catch (e) {
      console.log('could not restore the database file');
      return false;
    }
  }
  return false
};
