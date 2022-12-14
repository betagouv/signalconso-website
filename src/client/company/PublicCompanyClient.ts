import {CompanySearchResult} from './Company'
import {ApiClient} from '../ApiClient'

export class PublicCompanyClient {
  constructor(private client: ApiClient) {}

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
