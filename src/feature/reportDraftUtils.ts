import {findAnomaly} from '@/anomalies/Anomalies'
import {Subcategory} from '@/anomalies/Anomaly'
import {ReportDraft, TransmissionStatus} from '@/model/ReportDraft'
import {ReportDraft2} from '@/model/ReportDraft2'

export function hasStep0(r: Partial<ReportDraft2>): r is Pick<ReportDraft, 'step0'> & Partial<ReportDraft2> {
  return !!r.step0
}
export function hasSubcategoryIndexes(
  r: Partial<ReportDraft2>,
): r is Pick<ReportDraft, 'subcategoriesIndexes'> & Partial<ReportDraft2> {
  return !!r.subcategoriesIndexes
}
export function hasStep2(r: Partial<ReportDraft2>): r is Pick<ReportDraft, 'step2'> & Partial<ReportDraft2> {
  return !!r.step2
}

export const getAnomaly = (r: Pick<ReportDraft, 'step0'>) => {
  return findAnomaly(r.step0.category, r.step0.lang)
}

export const getSubcategories = (r: Pick<ReportDraft, 'subcategoriesIndexes' | 'step0'>): Subcategory[] => {
  const anomaly = findAnomaly(r.step0.category, r.step0.lang)
  const startingIndexes = r.subcategoriesIndexes
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
  recurse(r.subcategoriesIndexes, anomaly.subcategories)
  return collectedSubcategories
}

export const isTransmittableToPro = (r: Pick<ReportDraft, 'employeeConsumer' | 'consumerWish'>): boolean => {
  return isTransmittableToProBeforePickingConsumerWish(r) && r.consumerWish !== 'getAnswer'
}
export const isTransmittableToProBeforePickingConsumerWish = (r: Pick<ReportDraft, 'employeeConsumer'>): boolean => {
  return !r.employeeConsumer
}

export const getTransmissionStatus = (
  r: Pick<ReportDraft, 'employeeConsumer' | 'consumerWish' | 'step2'>,
): TransmissionStatus => {
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
        case 'consumerPreciseLocation':
          return 'MAY_BE_TRANSMITTED'
        case 'foreignCompany':
        case 'foreignWebsiteWithJustCountry':
          return 'CANNOT_BE_TRANSMITTED'
      }
  }
}
