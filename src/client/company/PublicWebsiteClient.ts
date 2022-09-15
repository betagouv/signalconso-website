import {ApiClientApi} from '../ApiClient'
import {Country} from '../constant/Country'
import {CompanySearchResult} from './Company'

export class PublicWebsiteClient {
  constructor(private client: ApiClientApi) {}

  readonly searchCompaniesByUrl = (url: string) => {
    return this.client.get<CompanySearchResult[]>(`/companies/search-url`, {qs: {url}})
  }

  readonly searchForeignCompaniesByUrl = (url: string) => {
    return this.client.get<Country[]>(`/websites/search-url`, {qs: {url}})
  }
}
