import {filterUndefined, mapFor, multipleFilters, shuffleArray, throwIf, throwIfUndefined, toPromise} from './Common'
import {expect} from 'chai'

describe('mapFor', function () {
  it('should create an array 0..20', function () {
    const generatedArray = mapFor(20, i => i);
    expect(generatedArray.length).to.equal(20);
    expect(generatedArray[10]).to.be.equal(10);
  });
});

describe('multipleFilters', function () {
  it('should return the original array when there is not filters', function () {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const filteredData = multipleFilters()(data);
    expect(data).to.be.deep.equal(filteredData);
  });

  it('should works with multiple filters', function () {
    const data: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const filteredData = multipleFilters(
      (x: number) => x % 2 === 0,
      (x: number) => x > 5,
    )(data);
    expect(filteredData).to.be.deep.equal([6, 8, 10]);
  });

  it('should works when filters are added conditionally', function () {
    const data: string[] = ['aaa', 'bbb', 'ab', 'ba', 'c'];
    const filterA = true;
    const filterC = false;
    const filteredData = multipleFilters<string>(
      filterA && ((x: string) => x.indexOf('a') === -1),
      filterC && ((x: string) => x.indexOf('c') === -1),
    )(data);
    expect(filteredData).to.be.deep.equal(['bbb', 'c']);
  });
});

describe('filterUndefined', function () {
  it('should correctly filter and infer type', async function () {
    const fetchData = (): Promise<Array<number | undefined>> => Promise.resolve([undefined, 1, undefined, 2, undefined]);
    const res: number[] = await fetchData().then(filterUndefined);
    expect(res).to.deep.eq([1, 2]);
  });
});

describe('throwIfUndefined', function () {
  it('should not throw and infer type', async function () {
    const fetchData = (): Promise<number | undefined> => Promise.resolve(1);
    const res: number = await fetchData().then(throwIfUndefined('fetch data should be defined'));
    expect(res).to.deep.eq(1);
  });

  it('should throw and infer type', async function () {
    try {
      const fetchData = (): Promise<number | undefined> => Promise.resolve(undefined);
      const res: number = await fetchData().then(throwIfUndefined('fetch data should be defined'));
      expect(false, 'should throw an error').to.be.true;
    } catch (e) {
      expect(true, 'should throw an error').to.be.true;
    }
  });
});

describe('toPromise', function () {
  it('should not throw and infer type', async function () {
    const fnNotThrowing = (x: number) => x + 1;
    const res = await toPromise(() => fnNotThrowing(0)).then(x => x + 1);
    expect(res).to.eq(2);
  });

  it('should not throw and infer type', async function () {
    const fnThrowing = () => {
      throw new Error();
    };
    const res = await toPromise(fnThrowing).catch(e => 1);
    expect(res).to.eq(1);
  });
});


describe('throwIf', function () {

  it('should not throw', async function () {
    const fetchUser = (): Promise<{ nationality: string }> => Promise.resolve({ nationality: 'fr' });
    const frenchUser = await fetchUser().then(throwIf(_ => _.nationality !== 'fr', 'Must be french'));
    expect(true).to.be.true;
  });

  it('should throw', async function () {
    try {
      const fetchUser = (): Promise<{ nationality: string }> => Promise.resolve({ nationality: 'en' });
      const frenchUser = await fetchUser().then(throwIf(_ => _.nationality !== 'fr', 'Must be french'));
      expect(false, 'should throw an error').to.be.true;
    } catch (e) {
      expect(true, 'should throw an error').to.be.true;
    }
  });
});


describe('shuffleArray', function () {

  it('should shuffle the array and keep all values', async function () {
    const inputArray = ["1", "2", "3", "4"];
    const outputArray = shuffleArray(["1", "2", "3", "4"]);
    expect(outputArray).to.not.equal(inputArray);
    expect(outputArray).to.includes("1");
    expect(outputArray).to.includes("2");
    expect(outputArray).to.includes("3");
    expect(outputArray).to.includes("4");
  });
});
