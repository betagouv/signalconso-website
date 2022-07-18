import {CompanySearchResult} from './Company'
import {ApiClientApi} from '../ApiClient'
import {Country} from '../constant/Country'

export class PublicCompanyClient {
  constructor(private client: ApiClientApi) {}

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

  readonly searchCompaniesByUrl = (url: string) => {
    return this.client.get<CompanySearchResult[]>(`/companies/search-url`, {qs: {url}})
  }

  readonly searchForeignCompaniesByUrl = (url: string) => {
    return this.client.get<Country[]>(`/websites/search-url`, {qs: {url}})
  }
}
