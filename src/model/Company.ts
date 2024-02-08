import {Address} from './Address'

// the shapes of companies in the api result, when searching companies
export type CompanySearchResult = {
  siret: string
  name?: string
  brand?: string
  address: Address
  isHeadOffice: boolean
  isPublic: boolean
  isOpen: boolean
  commercialName?: string
  activityCode: string
  activityLabel?: string
  isMarketPlace: boolean
}

// the shape we store in the ReportDraft, throughout the different steps
export type CompanyDraft = CompanySearchResult & {
  website?: string
  phone?: string
}

// To narrow down the type
export function isCompanyDraft(company: CompanySearchResult): company is CompanyDraft {
  const companyDraft = company as any as CompanyDraft
  return !!companyDraft.website || !!companyDraft.phone
}

export interface WebsiteCompanySearchResult {
  exactMatch: CompanySearchResult[]
  similarHosts: string[]
}

export const isGovernmentCompany = (_?: {activityCode?: string}): boolean => _?.activityCode?.startsWith('84.') ?? false
