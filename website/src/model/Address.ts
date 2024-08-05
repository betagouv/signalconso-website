import {Country} from './Country'

// That's what we send to our API
export interface Address {
  number?: string
  street?: string
  addressSupplement?: string
  postalCode?: string
  city?: string
  country?: string
}

// That's what we receive from our API

export interface ApiAddress {
  number?: string
  street?: string
  addressSupplement?: string
  postalCode?: string
  city?: string
  country?: Country
}
