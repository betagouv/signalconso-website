import {expect} from 'chai'
import {fnSwitch} from './FnSwitch'


describe('FnSwitch', function () {
  it('Should works when all cases are set', function () {
    type Value = 'yes' | 'no' | 'unknown'
    const value = 'yes' as Value
    const port = fnSwitch(value, {
      'yes': 1,
      'no': 2,
      'unknown': 3,
    })
    expect(port).to.eq(1)
  })

  it('Should fall in the default case function', function () {
    type Value = 'yes' | 'no' | 'unknown'
    const value = 'no' as Value
    const port = fnSwitch(value, {
      'yes': 1,
    }, _ => 3)
    expect(port).to.eq(3)
  })
  it('Should fall in the default case function', function () {
    enum Value {
      yes = 'yes',
      no = 'no',
      unknown = 'unknown',
    }
    const value = Value.unknown as Value

    const port = fnSwitch(value, {
      [Value.yes]: 1,
      [Value.no]: 2,
      [Value.unknown]: 3,
    }, _ => 4)
    expect(port).to.eq(3)
  })
})
