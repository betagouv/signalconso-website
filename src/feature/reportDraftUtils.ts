import {findAnomaly} from '@/anomalies/Anomalies'
import {ReportTag, SocialNetworks, Subcategory} from '@/anomalies/Anomaly'
import {Influencer, ReportDraft, TransmissionStatus} from '@/model/ReportDraft'
import {ReportDraft2} from '@/model/ReportDraft2'
import {ApiInfluencer, ApiReportDraft} from '@/model/reportsFromApi'
import uniq from 'lodash/uniq'

export function hasLangAndCategory(
  r: Partial<ReportDraft2>,
): r is Pick<ReportDraft, 'category' | 'lang'> & Partial<ReportDraft2> {
  return !!r.category && !!r.lang
}
export function hasSubcategoryIndexes(
  r: Partial<ReportDraft2>,
): r is Pick<ReportDraft, 'subcategoriesIndexes'> & Partial<ReportDraft2> {
  return !!r.subcategoriesIndexes
}

export const getAnomaly = (r: Pick<ReportDraft, 'category' | 'lang'>) => {
  return findAnomaly(r.category, r.lang)
}

export const getSubcategories = (r: Pick<ReportDraft, 'subcategoriesIndexes' | 'category' | 'lang'>): Subcategory[] => {
  const anomaly = findAnomaly(r.category, r.lang)
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
        `Nonsensical subcategory indexes ${startingIndexes} for category ${r.category} (${r.lang}). Can't find index ${index} in ${subcategories.length} subcategories`,
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
// Quand l'entreprise n'a pas pu être identifiée par le conso
export const mayBeTransmittedLater = (r: Pick<ReportDraft, 'influencer' | 'companyDraft'>) => {
  return !r.influencer && !r.companyDraft?.siret && r.companyDraft?.address.postalCode
}

export const cannotBeTransmitted = (r: Pick<ReportDraft, 'influencer' | 'companyDraft'>) => {
  return !r.influencer && !r.companyDraft?.siret && !r.companyDraft?.address.postalCode && r.companyDraft?.address.country
}

// SIRET existant mais adresse postale à l'étranger
export const foreignCompany = (r: Pick<ReportDraft, 'influencer' | 'companyDraft'>) => {
  return !r.influencer && r.companyDraft?.siret && r.companyDraft?.address.country && r.companyDraft?.address.country !== 'FR'
}

export const getTransmissionStatus = (
  r: Pick<ReportDraft, 'employeeConsumer' | 'consumerWish' | 'influencer' | 'companyDraft'>,
): TransmissionStatus => {
  if (!isTransmittableToPro(r)) {
    return 'NOT_TRANSMITTABLE'
  } else if (mayBeTransmittedLater(r)) {
    return 'MAY_BE_TRANSMITTED'
  } else if (cannotBeTransmitted(r) || foreignCompany(r)) {
    return 'CANNOT_BE_TRANSMITTED'
  } else {
    return 'WILL_BE_TRANSMITTED'
  }
}

export const toApiInfluencer = (influencer: Influencer): ApiInfluencer => {
  const toApiSocialNetwork = (socialNetwork: SocialNetworks): string | undefined => {
    switch (socialNetwork) {
      case 'YOUTUBE':
        return 'YouTube'
      case 'FACEBOOK':
        return 'Facebook'
      case 'INSTAGRAM':
        return 'Instagram'
      case 'TIKTOK':
        return 'TikTok'
      case 'TWITTER':
        return 'Twitter'
      case 'LINKEDIN':
        return 'LinkedIn'
      case 'SNAPCHAT':
        return 'Snapchat'
      case 'TWITCH':
        return 'Twitch'
      case 'OTHER':
        return undefined
    }
  }

  return {
    name: influencer.name,
    socialNetwork: toApiSocialNetwork(influencer.socialNetwork),
    otherSocialNetwork: influencer.otherSocialNetwork,
  }
}

export const toApi = (draft: ReportDraft, metadata: ApiReportDraft['metadata']): ApiReportDraft => {
  const {consumerWish, reponseconsoCode, contactAgreement, vendor, ccrfCode} = draft
  const anomaly = getAnomaly(draft)
  const subcategories = getSubcategories(draft)
  const isOpenFf = anomaly.isSpecialOpenFoodFactsCategory

  const additionalTags: ReportTag[] = [
    ...(consumerWish === 'fixContractualDispute' ? (['LitigeContractuel'] as const) : []),
    ...(consumerWish === 'getAnswer' ? (['ReponseConso'] as const) : []),
    ...(isOpenFf ? (['OpenFoodFacts'] as const) : []),
  ]

  const tags = uniq([...(draft.tags ?? []), ...additionalTags])

  return {
    // We don't use the rest syntax here ("..."),
    // we prefer to be sure to fill each field explicitely
    gender: draft.consumer.gender,
    category: draft.categoryOverride ?? draft.category,
    subcategories: subcategories.map(_ => _.title),
    details: draft.details,
    companyName: draft.companyDraft?.name,
    companyBrand: draft.companyDraft?.brand,
    companyCommercialName: draft.companyDraft?.commercialName,
    companyEstablishmentCommercialName: draft.companyDraft?.establishmentCommercialName,
    companyAddress: draft.companyDraft?.address,
    companySiret: draft.companyDraft?.siret,
    companyActivityCode: draft.companyDraft?.activityCode,
    companyIsHeadOffice: draft.companyDraft?.isHeadOffice,
    companyIsOpen: draft.companyDraft?.isOpen,
    companyIsPublic: draft.companyDraft?.isPublic,
    websiteURL: draft.companyDraft?.website,
    phone: draft.companyDraft?.phone,
    firstName: draft.consumer.firstName,
    lastName: draft.consumer.lastName,
    email: draft.consumer.email,
    consumerPhone: draft.consumer.phone,
    consumerReferenceNumber: draft.consumer.referenceNumber,
    contactAgreement,
    employeeConsumer: draft.employeeConsumer ?? false,
    forwardToReponseConso: consumerWish === 'getAnswer',
    fileIds: draft.uploadedFiles?.map(file => file.id) ?? [],
    vendor,
    tags,
    reponseconsoCode: reponseconsoCode ? [reponseconsoCode] : undefined,
    ccrfCode,
    influencer: draft.influencer ? toApiInfluencer(draft.influencer) : undefined,
    lang: draft.lang,
    barcodeProductId: draft.barcodeProduct?.id,
    train: draft.train,
    station: draft.station,
    metadata,
  }
}
