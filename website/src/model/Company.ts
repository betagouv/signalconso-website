import {Address} from './Address'

// the shapes of companies in the api result, when searching companies
export type CompanySearchResult = {
  siret: string
  name?: string
  commercialName?: string
  establishmentCommercialName?: string
  brand?: string
  address: Address
  isHeadOffice: boolean
  isPublic: boolean
  isOpen: boolean
  activityCode: string
  activityLabel?: string
  isMarketPlace: boolean
}

export interface WebsiteCompanySearchResult {
  exactMatch: CompanySearchResult[]
  similarHosts: string[]
}

export const isGovernmentCompany = (_?: {activityCode?: string}): boolean => _?.activityCode?.startsWith('84.') ?? false
