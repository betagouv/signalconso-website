import {findAnomaly} from '@/anomalies/Anomalies'
import {PartialReport} from '@/components_feature/reportFlow/ReportFlowContext'
import {Report, ReportWithPickInStep1 as ReportPickInStep1, TransmissionStatus} from '@/model/Report'
import {lastFromArray, notUndefined} from '@/utils/utils'
import {CompanyKind, ReportTag, Subcategory, reportTagsNotTransmittableToPro} from 'shared/anomalies/Anomaly'

function isValidString(str: string | undefined) {
  return typeof str === 'string' && str.trim() !== ''
}

export function hasStep0(r: PartialReport): r is Pick<Report, 'step0'> & PartialReport {
  return !!r.step0
}

export function hasStep1Full(r: PartialReport): r is Pick<Report, 'step1'> & PartialReport {
  return !!r.step1 && hasSubcategoryIndexes(r) && hasConsumerWish(r) && hasEmployeeConsumer(r)
}

export function hasSubcategoryIndexes(r: PartialReport): r is ReportPickInStep1<'subcategoriesIndexes'> & PartialReport {
  return hasStep0(r) && !!r.step1?.subcategoriesIndexes
}

export function hasEmployeeConsumer(r: PartialReport): r is ReportPickInStep1<'employeeConsumer'> & PartialReport {
  return hasStep0(r) && r.step1?.employeeConsumer !== undefined
}

export function hasConsumerWish(r: PartialReport): r is ReportPickInStep1<'consumerWish'> & PartialReport {
  return hasStep0(r) && r.step1?.consumerWish !== undefined
}

export function hasStep2(r: PartialReport): r is Pick<Report, 'step2'> & PartialReport {
  return !!r.step2
}

export function hasStep4(r: PartialReport): r is Pick<Report, 'step4'> & PartialReport {
  return (
    !!r.step4 &&
    r.step4?.contactAgreement !== undefined &&
    isValidString(r.step4?.consumer?.firstName) &&
    isValidString(r.step4?.consumer?.lastName) &&
    isValidString(r.step4?.consumer?.email)
  )
}

export const getAnomaly = (r: Pick<Report, 'step0'>) => {
  return findAnomaly(r.step0.category, r.step0.lang)
}

export const getSubcategories = (r: ReportPickInStep1<'subcategoriesIndexes'>): Subcategory[] => {
  const anomaly = findAnomaly(r.step0.category, r.step0.lang)
  const startingIndexes = r.step1.subcategoriesIndexes
  const collectedSubcategories: Subcategory[] = []

  function recurse(indexes: number[], subcategories: Subcategory[] = []) {
    if (indexes.length === 0) {
      return
    }
    const [index, ...indexesLeft] = indexes
    const subcategory = subcategories[index]
    if (!subcategory) {
      throw new Error(
        `Nonsensical subcategory indexes ${startingIndexes} for category ${r.step0.category} (${r.step0.lang}). Can't find index ${index} in ${subcategories.length} subcategories`,
      )
    }
    collectedSubcategories.push(subcategory)
    recurse(indexesLeft, subcategory.subcategories)
  }

  recurse(r.step1.subcategoriesIndexes, anomaly.subcategories)
  return collectedSubcategories
}

export const getTags = (r: ReportPickInStep1<'subcategoriesIndexes'>): ReportTag[] => {
  return getSubcategories(r).flatMap(_ => _.tags ?? [])
}

export const getCompanyKind = (r: ReportPickInStep1<'subcategoriesIndexes' | 'companyKindOverride'>): CompanyKind => {
  const {companyKindOverride} = r.step1
  return companyKindOverride ? companyKindOverride : (getWipCompanyKindFromSelected(r) ?? 'SIRET')
}

export const getReponseConsoCode = (r: ReportPickInStep1<'subcategoriesIndexes'>) => {
  // 2023-12 ReponseConso says we should not send them multiple reponseConso codes, it breaks something for them
  // We should send only one code maximum, and it doesn't really matter which one
  return lastFromArray(
    getSubcategories(r)
      .map(_ => _.reponseconsoCode)
      .filter(notUndefined),
  )
}

export const getCcrfCode = (r: ReportPickInStep1<'subcategoriesIndexes'>) => {
  const codes = getSubcategories(r).flatMap(_ => _.ccrfCode ?? [])
  return Array.from(new Set(codes))
}

export const getCategoryOverride = (r: ReportPickInStep1<'subcategoriesIndexes'>) => {
  return [...getSubcategories(r)].reverse().find(_ => !!_.categoryOverride)?.categoryOverride
}

// Returns the company kind for a WIP draft during step1
// - the subcategories may not all be picked
// - we do not apply the companyKindOverride
// - we may return undefined if the selected subcategories have no CompanyKind
//   (we do not apply a default CompanyKind value yet)
export const getWipCompanyKindFromSelected = (r: ReportPickInStep1<'subcategoriesIndexes'>): CompanyKind | undefined => {
  const {specialCategory} = getAnomaly(r)
  return specialCategory === 'OpenFoodFacts'
    ? 'PRODUCT_OPENFF'
    : specialCategory === 'RappelConso'
      ? 'PRODUCT_RAPPEL_CONSO'
      : [...getSubcategories(r)].reverse().find(_ => !!_.companyKind)?.companyKind
}

export const isTransmittableToPro = (
  r: ReportPickInStep1<'subcategoriesIndexes' | 'employeeConsumer' | 'consumerWish'>,
): boolean => {
  return isTransmittableToProBeforePickingConsumerWish(r) && r.step1.consumerWish !== 'getAnswer'
}
export const isTransmittableToProBeforePickingConsumerWish = (
  r: ReportPickInStep1<'subcategoriesIndexes' | 'employeeConsumer'>,
): boolean => {
  const tags = getTags(r)
  return !r.step1.employeeConsumer && !tags.some(tag => reportTagsNotTransmittableToPro.includes(tag))
}

export const getTransmissionStatus = (r: Pick<Report, 'step0' | 'step1' | 'step2'>): TransmissionStatus => {
  if (!isTransmittableToPro(r)) {
    return 'NOT_TRANSMITTABLE'
  }
  switch (r.step2.kind) {
    case 'influencer':
    case 'influencerOtherSocialNetwork':
    case 'train':
    case 'station':
      return 'WILL_BE_TRANSMITTED'
    case 'basic':
    case 'phone':
    case 'product':
    case 'website':
      switch (r.step2.companyIdentification.kind) {
        case 'companyFound':
        case 'marketplaceCompanyFound': {
          const company = r.step2.companyIdentification.company
          const country = company.address.country
          if (country && country !== 'FR') {
            // SIRET existant mais adresse postale à l'étranger
            return 'CANNOT_BE_TRANSMITTED'
          }
          return 'WILL_BE_TRANSMITTED'
        }
        case 'consumerLocation':
          return 'MAY_BE_TRANSMITTED'
        case 'foreignCompany':
        case 'foreignWebsiteWithJustCountry':
          return 'CANNOT_BE_TRANSMITTED'
      }
  }
}
