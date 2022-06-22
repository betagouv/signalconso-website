import { getMissingProperties, validateObject } from './ValidateObject';
import { expect } from 'chai';

interface Config {
  host: string
  port: number
  username: string
}

describe('getMissingProperties', function () {
  it('should return the list with one missing fields', function () {
    const conf = { host: 'mediarithmics.com', port: 80, };
    const missingFields = getMissingProperties<Config>(['host', 'port', 'username'], conf as any);
    expect(missingFields).to.deep.equal(['username']);
  });

  it('should return an empty list', function () {
    const conf = { host: 'mediarithmics.com', port: 80, username: 'hubit' };
    const missingFields = getMissingProperties<Config>(['host', 'port', 'username'], conf);
    expect(missingFields).to.deep.equal([]);
  });
});

describe('validateObject', function () {
  it('should throw an error', function () {
    const conf = { host: 'mediarithmics.com', port: 80, };
    expect(() => validateObject<Config>(['host', 'port', 'username'], conf as any)).to.throw();
  });

  it('should not throw an error', function () {
    const conf = { host: 'mediarithmics.com', port: 80, username: 'hubit' };
    expect(() => validateObject<Config>(['host', 'port', 'username'], conf)).to.not.throw();
  });
});
