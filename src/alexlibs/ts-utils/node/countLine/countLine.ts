import {exec, execSync} from 'child_process';
import {promisify} from 'util';
import {Readable, Transform} from 'stream';
import {createWriteStream} from 'fs';
import byline from 'byline';

/**
 * Only working for an UNIX env
 */
export const countLines = async (filePath: string): Promise<number> => {
  return promisify(exec)(`wc -l ${filePath}`)
    .then(res => parseInt(res.stdout));
};

/**
 * Only working for an UNIX env
 */
export const countLinesSync = (filePath: string): number => {
  return parseInt(execSync(`wc -l ${filePath}`).toString());
};

export const countLinesFromStream = async (stream: Readable) => {
  let lines = 0;
  return new Promise((resolve, reject) => {
    const parser = new Transform({
      transform: (line: string, encoding, cb) => {
        lines++;
        cb(null, line);
      }
    });
    const noop = createWriteStream('/dev/null');
    noop.on('finish', () => {
      resolve(lines);
    });
    byline.createStream((stream))
      .pipe(parser)
      .pipe(noop);
  });
};
