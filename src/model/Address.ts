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

export interface ApiAdress {
  number?: string
  street?: string
  addressSupplement?: string
  postalCode?: string
  city?: string
  country?: {
    code: string
    european: boolean
    name: string
    transfer: boolean
  }
}
