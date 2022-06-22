import {prefixLog, prefixLogger} from './prefixLogger'
import {expect} from 'chai'

const mockConsoleLog = (message?: any, ...optionalParams: any[]): string => {
  return message + ' ' + optionalParams.join(' ');
};

describe('prefixLogger', function () {

  // TODO Add tests using winston since the behavior is different than console.log

  it('should prefixLog correctly', function () {
    const loggedMessage = prefixLog('PREFIX')(mockConsoleLog)('Hello world', {a: 'a'});
    expect(loggedMessage).to.be.equal('PREFIX Hello world [object Object]');
  });

  it('should not mutate the original log', function () {
    prefixLog('PREFIX')(mockConsoleLog)('Hello world', {a: 'a'});
    expect(mockConsoleLog('Hello world', {a: 'a'})).to.be.equal('Hello world [object Object]');
  });

  it('should prefixLogger correctly', function () {
    const winstonMock = {
      debug: mockConsoleLog,
      info: mockConsoleLog,
    } as any;
    const prefixedWinstonMock = prefixLogger('PREFIX')(winstonMock);

    expect((prefixedWinstonMock.debug)('Hello world', 1))
      .to.be.equal('PREFIX Hello world 1');

    expect((prefixedWinstonMock.info)('Hello world', [2, 3]))
      .to.be.equal('PREFIX Hello world 2,3');
  });

  it('should work when nested and do a FIFO prefixing', function () {
    const winstonMock = {
      debug: mockConsoleLog,
      info: mockConsoleLog,
    } as any;
    const fstWinstonLog = prefixLogger('[FST]')(winstonMock);
    const ftpWinstonLog = prefixLogger('[FTP]')(fstWinstonLog);

    expect((ftpWinstonLog.debug)('Hello world', 1))
      .to.be.equal('[FST] [FTP] Hello world 1');

  });

  it('should not mutate the original logger', function () {
    const winstonMock = {
      debug: mockConsoleLog,
      info: mockConsoleLog,
      other: {
        log: mockConsoleLog,
      }
    } as any;
    prefixLogger('PREFIX')(winstonMock, ['debug', 'info', 'other.log']);

    expect((winstonMock.debug)('Hello world', 1))
      .to.be.equal('Hello world 1');
  });
});
