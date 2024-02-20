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

// The shape we store in the ReportDraft, throughout the different steps
//
// /!\ This type is still wrong /!\
// There is a least one case where you identify a product, can't find with barcode,
// Then you say you "je ne peux pas identifer" then "je ne sais pas"
// Then you end up with a company with only an adress with only a postal code
// All other fields are missing
// To represent that properly we would need a big refacto
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
