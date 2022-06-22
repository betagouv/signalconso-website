import {bool, defaultValue, int, required} from './EnvParser'
import {env as _env} from './Env'
import {expect} from 'chai'

process.env.PORT = '3000'
process.env.IS_PRODUCTION = 'true'
process.env.IS_DEV = 'false'
process.env.API_TOKEN = 'api:token'
process.env.SOME_NUMBER = '0'

const env = _env(process.env)

describe('Env', function () {
  it('Should parse we no parameter', function () {
    const port = env()('PORT')
    expect(port, 'forward env').to.eq('3000')
  })

  it('Should parse an int', function () {
    const port = env(int)('PORT')
    expect(port, 'parse a number').to.eq(3000)
  });

  it('should test required', function () {
    const port = env(required)('PORT');
    expect(port, 'should be env variable').to.be.eq(process.env.PORT);

    try {
      env(required)('DB_PORT');
      expect(false, 'should throw an error').to.be.true;
    } catch (e) {
      expect(true).to.be.true;
    }
  });

  it('should test default value', function () {
    const port = env(defaultValue('100'))('PORT');
    expect(port, 'should be env variable').to.be.eq(process.env.PORT);

    const dbPort = env(defaultValue('100'))('DB_PORT');
    expect(dbPort, 'should be default value').to.be.eq('100');
  });

  it('should test bool', function () {
    const res = env(bool)('DB_PORT');
    expect(res, 'bool should be undefined').to.be.undefined;

    const res1 = env(bool)('IS_PRODUCTION');
    expect(res1, 'bool should be true').to.be.true;

    const res2 = env(bool)('IS_DEV');
    expect(res2, 'bool should be false').to.be.false;
  });

  it('should test compose', function () {
    try {
      const res = env(int, required)('DB_PORT');
      expect(false, 'should throw an error').to.be.true;
    } catch (e) {
      expect(true).to.be.true;
    }

    const res = env(int, required)('PORT');
    expect(res, 'should be equal to env variable').to.be.eq(3000);
  });

  it('should test compose', function () {
    const res = env(int, defaultValue('10'))('SOME_NUMBER');
    expect(res).eq(0);
  });
});
