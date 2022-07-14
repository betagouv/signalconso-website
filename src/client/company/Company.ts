import {Address, Id, PaginatedFilters} from '../../model'

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

export interface Company {
  id: Id
  siret: string
  creationDate: Date
  name: string
  address: Address
  // postalCode?: string
  activityCode?: string
}

export interface CompanySearch extends PaginatedFilters {
  readonly departments?: string[]
  readonly activityCodes?: string[]
  emailsWithAccess?: string
  identity?: string
}
