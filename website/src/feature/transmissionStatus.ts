import {Report, ReportWithPickInStep1 as ReportPickInStep1} from '@/model/Report'
import {ReportTag, reportTagsNotTransmittableToPro} from 'shared/anomalies/Anomaly'
import {getTags} from './reportUtils'

// the one we deduce before picking the consumerWish
// it's not definite!
export type TransmissionStatusBeforeConsumerWish =
  | {
      kind: 'NOT_TRANSMITTABLE'
      reason: 'employeeConsumer' | 'tags'
    }
  | {
      kind: 'SO_FAR_SO_GOOD'
    }

// the one we deduce after step1 is finished
// but we still don't have the company
export type TransmissionStatusAfterConsumerWish =
  | {
      kind: 'NOT_TRANSMITTABLE'
      reason: 'employeeConsumer' | 'tags' | 'getAnswer'
    }
  | {
      kind: 'SO_FAR_SO_GOOD'
    }

export type FinalTransmissionStatus =
  | {
      kind: 'NOT_TRANSMITTABLE'
      reason: 'employeeConsumer' | 'tags' | 'getAnswer' | 'foreign'
    }
  | {
      // i.e. we don't the company but it could be identified manually later
      kind: 'MAY_BE_TRANSMITTED'
    }
  | {
      kind: 'WILL_BE_TRANSMITTED'
    }

export const getTransmissionStatusBeforeConsumerWish = (
  r: ReportPickInStep1<'subcategoriesIndexes' | 'employeeConsumer'>,
): TransmissionStatusBeforeConsumerWish => {
  if (r.step1.employeeConsumer) {
    return {kind: 'NOT_TRANSMITTABLE', reason: 'employeeConsumer'}
  }
  const tags = getTags(r)
  if (tags.some(tag => (reportTagsNotTransmittableToPro as readonly ReportTag[]).includes(tag))) {
    return {kind: 'NOT_TRANSMITTABLE', reason: 'tags'}
  }
  return {kind: 'SO_FAR_SO_GOOD'}
}

export const getTransmissionStatusAfterConsumerWish = (
  r: ReportPickInStep1<'subcategoriesIndexes' | 'employeeConsumer' | 'consumerWish'>,
): TransmissionStatusAfterConsumerWish => {
  const statusBeforeConsumerWish = getTransmissionStatusBeforeConsumerWish(r)
  switch (statusBeforeConsumerWish.kind) {
    case 'NOT_TRANSMITTABLE':
      return statusBeforeConsumerWish
    case 'SO_FAR_SO_GOOD':
      if (r.step1.consumerWish === 'getAnswer') {
        return {kind: 'NOT_TRANSMITTABLE', reason: 'getAnswer'}
      }
      return {kind: 'SO_FAR_SO_GOOD'}
    default:
      return statusBeforeConsumerWish satisfies never
  }
}

export const getFinalTransmissionStatus = (r: Pick<Report, 'step0' | 'step1' | 'step2'>): FinalTransmissionStatus => {
  const statusAfterConsumerWish = getTransmissionStatusAfterConsumerWish(r)
  switch (statusAfterConsumerWish.kind) {
    case 'NOT_TRANSMITTABLE':
      return statusAfterConsumerWish
    case 'SO_FAR_SO_GOOD':
      const step2kind = r.step2.kind
      switch (step2kind) {
        case 'influencer':
        case 'influencerOtherSocialNetwork':
        case 'train':
        case 'station':
          return {kind: 'WILL_BE_TRANSMITTED'}
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
                return {kind: 'NOT_TRANSMITTABLE', reason: 'foreign'}
              }
              return {kind: 'WILL_BE_TRANSMITTED'}
            }
            case 'consumerLocation':
              return {kind: 'MAY_BE_TRANSMITTED'}
            case 'foreignCompany':
            case 'foreignWebsiteWithJustCountry':
              return {kind: 'NOT_TRANSMITTABLE', reason: 'foreign'}
          }
        default:
          return step2kind satisfies never
      }
    default:
      return statusAfterConsumerWish satisfies never
  }
}

export const isTransmittable = (r: Pick<Report, 'step0' | 'step1' | 'step2'>): boolean => {
  return getFinalTransmissionStatus(r).kind !== 'NOT_TRANSMITTABLE'
}
