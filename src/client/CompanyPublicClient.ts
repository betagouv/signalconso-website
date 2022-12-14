import {appConfig} from 'conf/appConfig'
import {ApiClient} from './ApiClient'
import {CompanySearchResult} from './company/Company'

export class CompanyPublicClient {
  private client = new ApiClient({
    baseUrl: appConfig.apiCompanyUrl + '/api',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  readonly searchCompanies = (search: string, searchPostalCode: string) => {
    return this.client.get<CompanySearchResult[]>(`/companies/search`, {
      qs: {
        postalCode: searchPostalCode.toString(),
        q: search,
      },
    })
  }

  readonly searchCompaniesByIdentity = (identity: string) => {
    return this.client.get<CompanySearchResult[]>(`/companies/search/${identity}`, {})
  }
}
