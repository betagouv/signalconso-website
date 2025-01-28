import {Departement} from '@/data/departments'
import {notUndefined} from '@/utils/utils'

export type GeoArea =
  | {
      kind: 'postcode'
      postalCode: string
      city?: string
    }
  | {
      kind: 'department'
      dpt: Departement
    }

export function extractFromGeoArea(geoArea: GeoArea | undefined): {
  postalCode?: string
  departmentCode?: string
} {
  if (!geoArea) {
    return {}
  }
  switch (geoArea.kind) {
    case 'department':
      return {departmentCode: geoArea.dpt.code}
    case 'postcode':
      return {postalCode: geoArea.postalCode}
    default:
      // https://stackoverflow.com/questions/39419170/how-do-i-check-that-a-switch-block-is-exhaustive-in-typescript
      return geoArea satisfies never
  }
}

// string representation, for various purposes
export function geoAreaToString(geoArea: GeoArea | undefined): string {
  if (!geoArea) {
    return ''
  }
  const {postalCode, departmentCode} = extractFromGeoArea(geoArea)
  return [postalCode, departmentCode].filter(notUndefined).join('')
}
