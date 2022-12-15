// That's exactly what we send/receive to/from the API

export interface Address {
  number?: string
  street?: string
  addressSupplement?: string
  postalCode?: string
  city?: string
  country?: string
}
