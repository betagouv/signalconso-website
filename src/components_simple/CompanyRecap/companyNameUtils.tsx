import {CompanySearchResult} from '@/model/Company'

// Use name + commercialName if present
// Does not use brand
export function buildCompanyName(_: {name?: string; commercialName?: string}) {
  const name = _.name
  const commercialName = _.commercialName
  return commercialName ? `${commercialName} (${name})` : name
}

export function buildBrandName(_: CompanySearchResult) {
  const brand = _.brand
  const establishmentCommercialName = _.establishmentCommercialName
  if (establishmentCommercialName && brand) {
    return `${establishmentCommercialName} / ${brand}`
  } else if (establishmentCommercialName && !brand) {
    return `${establishmentCommercialName}`
  } else if (!establishmentCommercialName && brand) {
    return `${brand}`
  } else {
    return undefined
  }
}
