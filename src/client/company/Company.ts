import {Address, Id, PaginatedFilters} from '../../model'

export interface CompanyWithReportsCount extends Company {
  count: number
  responseRate: number
}

export interface Company {
  id: Id
  siret: string
  creationDate: Date
  name: string
  address: Address
  // postalCode?: string
  activityCode?: string
}

export interface CompanyToActivate {
  company: Company
  lastNotice?: Date
  tokenCreation: Date
}

export interface CompanyCreation {
  siret: string
  name: string
  address: Address
  // postalCode?: string
  activityCode?: string
}

export interface CompanyUpdate {
  address: Address
  // postalCode: string
  activationDocumentRequired: boolean
}

export interface CompanySearchResult {
  siret: string
  name?: string
  brand?: string
  isHeadOffice: boolean
  address: Address
  activityCode: string
  activityLabel?: string
  isMarketPlace: boolean
}

export interface CompanySearch extends PaginatedFilters {
  readonly departments?: string[]
  readonly activityCodes?: string[]
  emailsWithAccess?: string
  identity?: string
}

// TODO(Alex) Harmonize with company-access types
export enum AccessLevel {
  NONE = 'none',
  MEMBER = 'member',
  ADMIN = 'admin',
}

export interface CompanyWithAccessLevel extends Company {
  level: AccessLevel
}
