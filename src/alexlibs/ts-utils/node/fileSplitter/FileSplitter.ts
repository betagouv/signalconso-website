import * as fs from 'fs-extra'
import * as path from 'path'
import * as os from 'os'
import {Transform} from 'stream'
import byline from 'byline'
import {countLinesSync} from '../countLine/countLine'
import {mapFor} from '../../common'

export const fileSplitter = (
  filepath: string,
  maxFileSizeMB: number,
  outputDirPath: string = path.dirname(filepath) + path.sep + 'split',
  logger?: (msg: string) => void
): Promise<string[]> => {
  const log = (msg: string) => logger && logger(msg);

  fs.ensureDirSync(outputDirPath);

  const nbLinesInputFile: number = countLinesSync(filepath);
  const fileSizeMB: number = fs.statSync(filepath).size / (1024 * 1024);
  const nbOfPartitions: number = Math.floor(fileSizeMB / maxFileSizeMB) + 1;
  const nbOfLinesPerPartition: number = Math.floor(nbLinesInputFile / nbOfPartitions) + 1;

  log(`[fileSplitter] Started split of file ${filepath}`);
  log(`[fileSplitter] File size is ${Math.round(fileSizeMB * 10) / 10} Mo --> need ${nbOfPartitions} partitions with ${nbOfLinesPerPartition} lines each`);

  const fileExt: string = path.extname(filepath);
  const baseName: string = path.basename(filepath, fileExt);
  const partitionsPaths = mapFor(nbOfPartitions, (i: number) => `${outputDirPath}/${baseName}_${i + 1}`);

  return new Promise((resolve, reject) => {
    let currentWriteStream: fs.WriteStream;
    let lineIndex: number = 0;
    let partitionIndex: number = 0;

    byline(fs.createReadStream(filepath, {encoding: 'utf8'}))
      .pipe(new Transform({
        objectMode: true,
        transform: (line: string, encoding, callback) => {
          if (lineIndex === 0) {
            log(`[fileSplitter] Start filling in partition ${partitionIndex + 1}`);
            if (currentWriteStream) {
              currentWriteStream.end();
            }
            currentWriteStream = fs.createWriteStream(partitionsPaths[partitionIndex++]);
          }
          currentWriteStream.write(line + os.EOL, callback);
          lineIndex = ++lineIndex % nbOfLinesPerPartition;
        }
      }))
      .on('finish', () => resolve(partitionsPaths))
      .on('error', (err) => {
        reject(new Error(`Error in lineStream: ${JSON.stringify(err)}`));
      });
  });
};
