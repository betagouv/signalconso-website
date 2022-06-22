import {countLines, countLinesSync, countLinesFromStream } from './countLine';
import {expect} from 'chai';
import { Readable } from 'stream';

describe('countLine', function () {

  it('should return the correct number', async function () {
    const count = await countLines(__dirname + '/countLine.fixture.json');
    expect(count).to.be.equal(23);
  });

  it('should throw an error', function (done) {
    countLines('/unexistingfile.void').catch(e => {
      expect(e).to.be.an('Error');
      done();
    })
  });
});

describe('countLineSync', function () {

  it('should return the correct number', function () {
    const count = countLinesSync(__dirname + '/countLine.fixture.json');
    expect(count).to.be.equal(23);
  });

  it('should throw an error', function () {
    expect(() => countLinesSync('/unexistingfile.void')).to.throw();
  });
});

describe('countLineFromReadStream', function () {

  it('should return the correct number', async function() {
    const readStream = new Readable();
    readStream.push('this is a first line\n');
    readStream.push('this is a second line\n');
    readStream.push('this is a third line\n');
    readStream.push(null);
    const linesParsed = await countLinesFromStream(readStream);
    expect(linesParsed).to.eq(3);
  });
});
