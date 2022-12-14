import {ApiClient} from '../ApiClient'
import {Country} from '../constant/Country'
import {CompanySearchResult, WebsiteCompanySearchResult} from './Company'

export class PublicWebsiteClient {
  constructor(private client: ApiClient) {}

  readonly searchCompaniesByUrl = (url: string) => {
    return this.client.get<WebsiteCompanySearchResult>(`/companies/hosts`, {qs: {url}})
  }

  readonly searchForeignCompaniesByUrl = (url: string) => {
    return this.client.get<Country[]>(`/websites/search-url`, {qs: {url}})
  }
}
