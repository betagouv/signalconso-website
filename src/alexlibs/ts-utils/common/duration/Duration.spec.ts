import {expect} from 'chai'
import {Duration, duration} from './Duration'

describe('Duration', function () {
  it('Should correctly convert', function () {
    const d = duration(10, 'minute');
    expect(d.toSeconds).to.eq(600);
    expect(d.toMs).to.eq(600000);
    expect(d.toMinutes).to.eq(10);
    expect(d.toHours).to.eq(0);
    expect(d.toDays).to.eq(0);

  });

  it('Should correctly convert (2)', function () {
    const d = duration(4000);
    expect(d.valueOf()).to.eq(4000);
    expect(d.toMs).to.eq(4000);
    expect(d.toSeconds).to.eq(4);
    expect(d.toMinutes).to.eq(0);
  });

  it('Should implicitly be converted to a number', function (done) {
    let callCounter = 0;
    const markCalled = () => callCounter++;
    setTimeout(markCalled, 1000);
    setTimeout(markCalled, duration(2, 'second'));
    setTimeout(markCalled, 3000);
    setTimeout(() => {
      expect(callCounter).eq(2);
      done();
    }, 2100);
  });

  it('should correctly format to string', function () {
    expect(duration(75, 'minute').toString()).to.be.equal('1 Hr 15 Min');
  });
});
