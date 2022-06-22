import {lazy} from './Lazy';
import {expect} from 'chai';
import {sleep} from '../delay/Delay'

export const getTime = () => parseInt('' + new Date().getTime() / 1000);

describe('Lazy', function () {

  it('should prevent function computation at the 2nd call', async function () {
    const longValueToGet = lazy(async () => {
      await sleep(1000);
      return 1;
    });
    const t0 = getTime();
    await longValueToGet();
    const t1 = getTime();
    await longValueToGet();
    const t2 = getTime();

    expect(t1 - t0).eq(1);
    expect(t1).eq(t2);
  });

  it('should considers arguments when using cache', async function () {
    let sideEffect = 0;

    const users = [{id: 1, name: 'n1'}, {id: 2, name: 'n2'}, {id: 3, name: 'n3'}, {id: 4, name: 'n4'}, {id: 5, name: 'n5'}];
    const findByUserId = lazy((id: number, complexArgs: {a: string, b: number}, uselessArgForTypeChecking?: string) => {
      ++sideEffect;
      return users.find(_ => _.id === id);
    });

    expect(findByUserId(3, {a: '1', b: 1})?.name).eq('n3');
    expect(sideEffect).eq(1);
    expect(findByUserId(4, {a: '1', b: 1})?.name).eq('n4');
    expect(sideEffect).eq(2);
    expect(findByUserId(3, {a: '1', b: 1})?.name).eq('n3');
    expect(sideEffect).eq(2);
    expect(findByUserId(3, {a: '2', b: 2})?.name).eq('n3');
    expect(sideEffect).eq(3);
  });
});
