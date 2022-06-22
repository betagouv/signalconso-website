import {expect} from 'chai'
import { QueryStringApi } from './QueryStringApi';

describe('QueryStringApi.toObject', function () {
  it('should works', function () {
    expect(QueryStringApi.toObject('?orderBy=desc&sortBy=createdAt')).deep.eq({
      orderBy: 'desc',
      sortBy: 'createdAt',
    });
  });

  it('should works with undefined parameters', function () {
    expect(QueryStringApi.toObject('?orderBy=&sortBy=')).deep.eq({
      orderBy: '',
      sortBy: '',
    });
  });
  it('should works with undefined parameters', function () {
    expect(QueryStringApi.toObject('')).deep.eq({});
  });
});

describe('QueryStringApi.fromObject', function () {
  it('should works', async function () {
    expect(QueryStringApi.fromObject({
      orderBy: 'desc',
      sortBy: 'createdAt',
    })).eq('?orderBy=desc&sortBy=createdAt');
  });

  it('should works with undefined parameters', function () {
    expect(QueryStringApi.fromObject({
      orderBy: '',
      sortBy: '',
    })).eq('?orderBy=&sortBy=');
  });
});

describe('objectToQueryString <-> queryStringToObject', function () {
  it('QueryStringApi.fromObject > QueryStringApi.toObject', async function () {
    const object = {
      orderBy: 'desc',
      sortBy: 'createdAt',
    };
    expect(QueryStringApi.toObject(QueryStringApi.fromObject(object))).deep.eq(object);
  });

  it('QueryStringApi.fromObject < QueryStringApi.toObject', function () {
    const string = '?orderBy=&sortBy=';
    expect(QueryStringApi.fromObject(QueryStringApi.toObject(string))).eq(string);
  });
});
