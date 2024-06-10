import {appConfig} from '@/core/appConfig'
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

  readonly searchCompaniesByNameAndPostalCode = (search: string, searchPostalCode: string, lang: string) => {
    return this.client.get<CompanySearchResult[]>(`/companies/search`, {
      qs: {
        postalCode: searchPostalCode.toString(),
        q: search,
        lang: lang,
      },
    })
  }

  readonly searchHeadOfficesByName = (search: string, lang: string) => {
    return this.client.get<CompanySearchResult[]>(`/companies/search`, {
      qs: {
        onlyHeadOffice: true,
        q: search,
        lang: lang,
      },
    })
  }

  readonly searchCompaniesByIdentity = (identity: string, openOnly: boolean, lang: string) => {
    return this.client.get<CompanySearchResult[]>(`/companies/search/${identity}`, {
      qs: {
        openOnly: openOnly,
        lang: lang,
      },
    })
  }
}
