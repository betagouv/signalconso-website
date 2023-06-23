import {appConfig} from 'core/appConfig'
import {BaseApiClient} from './BaseApiClient'
import {CompanySearchResult} from '../model/Company'

export class CompanyPublicClient {
  private client = new BaseApiClient({
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

  readonly searchCompaniesByIdentity = (identity: string, openOnly: boolean) => {
    return this.client.get<CompanySearchResult[]>(`/companies/search/${identity}?openOnly=${openOnly}`, {})
  }
}
