import {Address, Id, PaginatedFilters} from '../../model'

export interface CompanySearchResult {
  siret: string
  name?: string
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

export interface Company {
  id: Id
  siret: string
  creationDate: Date
  name: string
  address: Address
  activityCode?: string
  isHeadOffice: boolean
  isPublic: boolean
  isOpen: boolean
}

export interface CompanySearch extends PaginatedFilters {
  readonly departments?: string[]
  readonly activityCodes?: string[]
  emailsWithAccess?: string
  identity?: string
}
