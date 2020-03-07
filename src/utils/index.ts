import {connection} from '../data';
import util from 'util';

export const promisifiedRun = util.promisify(connection.run.bind(connection));
export const promisifiedAll = util.promisify(connection.all.bind(connection));



