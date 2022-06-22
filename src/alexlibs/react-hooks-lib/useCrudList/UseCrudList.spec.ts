import {useCrudList} from './UseCrudList'
import {expect} from 'chai'

export interface User {
  id: string
  name?: string
  online?: boolean
  other?: number
}

export const createUserApi = () => {
  const users: User[] = [{id: '1', name: 'Mat Fraser'}]
  return {
    users,
    fetch: ({onlineOnly}: {onlineOnly?: boolean}): Promise<User[]> => Promise.resolve(users.filter(u => !onlineOnly || u.online)),
    create: (u: User): Promise<User> => {
      users.push(u)
      return Promise.resolve(u)
    },
    update: (id: any, updatedUser: User): Promise<User> => Promise.resolve({
      ...users.find(_ => _.id === id), ...updatedUser
    }),
    delete: async (id: string) => {
      users.filter(_ => _.id !== id)
    },
  }
}

describe('UseCrudList', function () {

  it('should return the correct number', async function () {

    const userApi = createUserApi()

    const crud = useCrudList('id', {
      r: userApi.fetch,
    })

    await crud.fetch({})
    expect(crud.list).deep.eq(userApi.users)
  })

  it('should return the correct number', async function () {
    const userApi = createUserApi()

    const crud = useCrudList('id', {
      c: userApi.create,
      r: userApi.fetch,
      u: userApi.update,
      d: userApi.delete,
    })

    crud.createError
    crud.fetchError
    crud.removeError
    crud.fetch()
    crud.clearCache()
    crud.create({}, {a: ''})
    crud.update('1')
    crud.remove('1')
  })
})
