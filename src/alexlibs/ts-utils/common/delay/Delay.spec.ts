import {expect} from 'chai'
import {getTime} from '../lazy/Lazy.spec'
import {delay, sleep} from './Delay'

interface User {
  name: string
}
describe('Delay', function () {

  it('should delay promise', async function () {
    const getUser = (): Promise<User> => Promise.resolve({name: 'a'})
    const t0 = getTime()
    const x: User = await getUser().then(delay(1000))
    const t1 = getTime()
    expect(t1 - t0).eq(1)
  })

  it('should wait', async function () {
    const t0 = getTime()
    await sleep(1000)
    const t1 = getTime()
    expect(t1 - t0).eq(1)
  })
})
