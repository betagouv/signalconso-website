import {ReportTag, SocialNetworks} from '@/anomalies/Anomaly'
import {Influencer, ReportDraft, TransmissionStatus} from '@/model/ReportDraft'
import {ApiInfluencer, ApiReportDraft} from '@/model/reportsFromApi'
import uniq from 'lodash/uniq'

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
  const {consumerWish, reponseconsoCode, anomaly, contactAgreement, vendor, ccrfCode} = draft

  const isOpenFf = draft.anomaly.isSpecialOpenFoodFactsCategory

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
    category: draft.categoryOverride ?? anomaly.category,
    subcategories: draft.subcategories.map(_ => _.title),
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
