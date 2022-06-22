import * as zlib from 'zlib';
import {Gunzip, Gzip, ZlibOptions} from 'zlib';
import * as fs from 'fs';
import * as path from 'path';

const createStream = (
  action: Gzip | Gunzip,
  inputPath: string,
  outputPath: string = `${inputPath}.gz`,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(inputPath)
      .on('error', reject)
      .pipe(action)
      .on('error', reject)
      .pipe(fs.createWriteStream(outputPath))
      .on('error', reject)
      .on('finish', () => resolve(outputPath));
  });
};

export const gunzipFile = async (
  inputPath: string,
  outputPath: string = `${path.dirname(inputPath)}/${path.basename(inputPath, '.gz')}`,
  options: ZlibOptions = {}
) => createStream(zlib.createUnzip(options), inputPath, outputPath);

export const gzipFile = async (
  inputPath: string,
  outputPath: string = `${inputPath}.gz`,
  options: ZlibOptions = {}
) => createStream(zlib.createGzip(options), inputPath, outputPath);
