import {useFetcher} from './UseFetcher'
import {createUserApi} from '../useCrudList/UseCrudList.spec'

describe('UseFetcher', function () {

  it('. Typing playground', async function () {
    const userApi = createUserApi()

    const fetcher = useFetcher(userApi.fetch)
    fetcher.fetch({force: true, clean: true}, {onlineOnly: true}).then(console.log)
  })
})
