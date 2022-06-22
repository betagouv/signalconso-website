import {expect} from 'chai'
import {map} from './Map'

describe('Map', function () {

  const obj = {
    key: {
      subKey: 2,
      subKeyUndefined: undefined,
    }
  }

  const square = (x: number) => x * x

  it('should prevent function computation at the 2nd call', async function () {
    expect(map(obj.key.subKey, square)).eq(4)
  })

  it('should prevent function computation at the 2nd call', async function () {
    expect(map(obj.key.subKeyUndefined, square)).eq(undefined)
  })
})
