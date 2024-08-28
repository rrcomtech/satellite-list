import { Satellite } from './util';
import fs from 'fs';
import * as csv from 'fast-csv';
import path from 'path';
import { escape } from 'querystring';

const filename = "satellites.csv";
const delimiter = ";";

const csvStream = csv.format({ headers: true });
csvStream.pipe(process.stdout).on('end', () => process.exit());

let data: Satellite[] = [];

/**
 * Store data in a CSV database.
 *
 * @param data The data to store in object (not string) format.
 * @param endpoint The endpoint to store the data in. Does not have a leading slash.
 */
const storeData = (sat_data: Satellite) => {
  if (!sat_data.norad_id) sat_data.norad_id = -1;
  data.push(sat_data);
};

const finalize_csv = () => {
  const options = {
    headers: true,
    delimiter: delimiter,
    escape: delimiter
  };

  csv.writeToPath(path.resolve(__dirname, `../${filename}`), data, options)
    .on('error', e => console.error(e))
    .on('finish', () => console.log('Done writing.'));
};

export { storeData, finalize_csv };
