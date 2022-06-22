import {expect} from 'chai';
import {gunzipFile, gzipFile} from './Gzip';
import * as fs from 'fs';


const fixturePath = `${__dirname}/../../../src/node/gzip/fixture`;

describe('Gzip', function () {
  it('should gunzipFile', async function () {
    const unzippedFile = await gunzipFile(`${fixturePath}/zipped.gz`);
    expect(fs.existsSync(unzippedFile), `${unzippedFile} should exists`).true;
    fs.unlinkSync(unzippedFile);
  });

  it('should gzipFile', async function () {
    const zippedFile = await gzipFile(`${fixturePath}/notzipped`);
    expect(fs.existsSync(zippedFile), `${zippedFile} should exists`).true;
    fs.unlinkSync(zippedFile);
  });
});
