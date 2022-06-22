import {mapPromise} from './MapPromise'
import {expect} from 'chai'

interface User {
  id: number
  name: string
}

interface ApiError {
  code: number
  message: string
}

describe('MapPromise', function () {

  const getUser = (someArg: number, otherArg: boolean, againAgainMoreArgs: {test: string}): Promise<User> =>
    Promise.resolve({id: 1, name: 'Mike'})

  const getUserFailed = (someArg: number, otherArg: boolean, againAgainMoreArgs: {test: string}): Promise<User> =>
    Promise.reject({code: 404, name: 'Not found'})

  it('mapThen', async function () {
    const getUserId = mapPromise({
      promise: getUser,
      mapThen: _ => _.id
    })
    const res = await getUserId(1, true, {test: ''})
    expect(res).to.eq(1)
  })

  it('mapCatch', async function() {
    const getUserFailedCode = mapPromise({
      promise: getUserFailed,
      // Typescript cannot infer error type, so ApiError must be set explicitly
      mapCatch: (_: ApiError) => _.code
    })
    const res = await getUserFailedCode(1, true, {test: ''})
    expect(res).to.eq(404)
  })
})
