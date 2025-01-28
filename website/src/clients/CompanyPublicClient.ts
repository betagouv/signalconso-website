import {appConfig} from '@/core/appConfig'
import {extractFromGeoArea, GeoArea} from '@/model/GeoArea'
import {CompanySearchResult} from '../model/Company'
import {BaseApiClient} from './BaseApiClient'

export class CompanyPublicClient {
  private client = new BaseApiClient({
    baseUrl: appConfig.apiCompanyUrl + '/api',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  readonly searchSmart = (q: string, postalCode: string | undefined, departmentCode: string | undefined, lang: string) => {
    return this.client.get<CompanySearchResult[]>(`/companies/search/smart`, {
      qs: {
        q,
        ...(postalCode ? {postalCode} : null),
        ...(departmentCode ? {departmentCode} : null),
        lang,
      },
    })
  }

  readonly searchCompaniesByNameAndPostalCode = (search: string, searchPostalCode: string, lang: string) => {
    return this.client.get<CompanySearchResult[]>(`/companies/search`, {
      qs: {
        postalCode: searchPostalCode.toString(),
        q: search,
        lang: lang,
      },
    })
  }

  readonly searchCompaniesByNameAndGeoArea = (search: string, geoArea: GeoArea, lang: string) => {
    const {postalCode, departmentCode} = extractFromGeoArea(geoArea)
    return this.searchSmart(search, postalCode, departmentCode, lang)
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
