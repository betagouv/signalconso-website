import {Progress} from './Progress';
import {expect} from 'chai';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

describe('progress', function () {

  this.timeout(10000);

  it('should works', async function () {
    const p = new Progress(1000);
    await sleep(2000);
    const t1 = p.snapshot(20);
    expect(t1.percent).to.eq(2);
    expect(t1.elapsedTime.toSeconds).to.eq(2);
    expect(t1.remainingTime.toSeconds).to.eq(98);
    expect(t1.remainingTime.toSeconds).to.eq(t1.remainingTimeAvg.toSeconds);
    expect(t1.linesPerSecond).to.eq(10);
    expect(t1.linesPerSecond).to.eq(t1.linesPerSecondAvg);

    await sleep(2000);
    const t2 = p.snapshot(100);
    expect(t2.percent).to.eq(10);
    expect(t2.elapsedTime.toSeconds).to.eq(4);
    expect(t2.linesPerSecond).to.eq(40);
    expect(t2.linesPerSecondAvg).to.eq(25);
    expect(t2.remainingTime.toSeconds).to.eq(22); // 22.5 but it's Math.floor 'ed
    expect(t2.remainingTimeAvg.toSeconds).to.eq(36);
  });
});
