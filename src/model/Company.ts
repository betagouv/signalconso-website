import {Address} from './Address'

// the shape expected by the main api in the report
export interface CompanyDraft {
  siret: string
  name: string
  brand?: string
  address: Address
  website?: string
  phone?: string
  activityCode?: string
  isHeadOffice: boolean
  isPublic: boolean
  isOpen: boolean
}

// the shapes of companies in the api result
export type CompanySearchResult = {
  siret: string
  name?: string
  commercialName?: string
  brand?: string
  isHeadOffice: boolean
  isPublic: boolean
  isOpen: boolean
  address: Address
  activityCode: string
  activityLabel?: string
  isMarketPlace: boolean
}

export interface WebsiteCompanySearchResult {
  exactMatch: CompanySearchResult[]
  similarHosts: string[]
}

export const isGovernmentCompany = (_?: {activityCode?: string}): boolean => _?.activityCode?.startsWith('84.') ?? false
