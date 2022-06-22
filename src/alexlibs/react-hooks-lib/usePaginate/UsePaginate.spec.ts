import {usePaginate} from './UsePaginate'
import {createUserApi, User} from '../useCrudList/UseCrudList.spec'

describe('UsePaginate', function () {

  it('. Typing playground', async function () {
    const userApi = createUserApi()
    const search = () => userApi.fetch({}).then(_ => ({data: _, totalSize: _.length}))

    const paginate = usePaginate<User, {limit: number, offset: number}>(search, {limit: 0, offset: 0})
  })
})
