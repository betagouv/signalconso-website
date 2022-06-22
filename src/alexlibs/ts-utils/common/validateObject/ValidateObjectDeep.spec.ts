import {expect} from 'chai';
import {getMissingPropertiesDeep, validateObjectDeep} from './ValidateObjectDeep';

const conf = {
  debugMode: false,
  server: {
    host: 'mediarithmics.com',
    database: {
      name: 'hubit',
    }
  }
};

describe('getMissingPropertiesDeep', function () {
  it('should return the list with one missing fields', function () {
    const missingFields = getMissingPropertiesDeep([
      'server.host',
      'server.database.name',
      'server.database.port'
    ], conf);
    expect(missingFields).to.deep.equal(['server.database.port']);
  });

  it('should return an empty list', function () {
    const missingFields = getMissingPropertiesDeep([
      'debugMode',
      'server.host',
      'server.database.name',
    ], conf);
    expect(missingFields).to.deep.equal([]);
  });
});

describe('validateObjectDeep', function () {
  it('should throw an error', function () {
    expect(() => validateObjectDeep([
      'server.host',
      'server.database.name',
      'server.database.port'
    ], conf)).to.throw();
  });

  it('should not throw an error', function () {
    expect(() => validateObjectDeep([
      'server.host',
      'server.database.name',
    ], conf)).to.not.throw();
  });
});
