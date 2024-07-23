import {findAnomaly} from '@/anomalies/Anomalies'
import {Anomaly, ReportTag, SocialNetwork, Subcategory} from '@/anomalies/Anomaly'
import {CompanySearchResult} from '@/model/Company'
import {Influencer, ReportDraft, TransmissionStatus} from '@/model/ReportDraft'
import {ReportDraft2} from '@/model/ReportDraft2'
import {ApiInfluencer, ApiReportDraft} from '@/model/reportsFromApi'
import {CommonCompanyIdentification, ForeignWebsiteCompanyIdentification, Step2Model} from '@/model/Step2Model'
import uniq from 'lodash/uniq'

export function hasStep0(r: Partial<ReportDraft2>): r is Pick<ReportDraft, 'step0'> & Partial<ReportDraft2> {
  return !!r.step0
}
export function hasSubcategoryIndexes(
  r: Partial<ReportDraft2>,
): r is Pick<ReportDraft, 'subcategoriesIndexes'> & Partial<ReportDraft2> {
  return !!r.subcategoriesIndexes
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
// Quand l'entreprise n'a pas pu être identifiée par le conso
export const mayBeTransmittedLater = (r: Pick<ReportDraft, 'influencer' | 'companyDraft'>) => {
  return !r.influencer && !r.companyDraft?.siret && r.companyDraft?.address.postalCode
}

export const cannotBeTransmitted = (r: Pick<ReportDraft, 'influencer' | 'companyDraft'>) => {
  return !r.influencer && !r.companyDraft?.siret && !r.companyDraft?.address.postalCode && r.companyDraft?.address.country
}

// SIRET existant mais adresse postale à l'étranger
export const foreignCompany = (r: Pick<ReportDraft, 'step2'>) => {
  return !r.influencer && r.companyDraft?.siret && r.companyDraft?.address.country && r.companyDraft?.address.country !== 'FR'
}

export const getTransmissionStatus = (
  r: Pick<ReportDraft, 'employeeConsumer' | 'consumerWish' | 'step2' | 'companyDraft'>,
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

const toApiSocialNetwork = (socialNetwork: SocialNetwork): string | undefined => {
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

export const toApiInfluencer = (influencer: Influencer): ApiInfluencer => {
  return {
    name: influencer.name,
    socialNetwork: toApiSocialNetwork(influencer.socialNetwork),
    otherSocialNetwork: influencer.otherSocialNetwork,
  }
}

const specialCategoryTag = (anomaly: Anomaly): ReportTag[] => {
  switch (anomaly.specialCategory) {
    case 'OpenFoodFacts':
      return ['OpenFoodFacts']
    case 'RappelConso':
      return ['RappelConso']
    default:
      return []
  }
}

export const toApi = (draft: ReportDraft, metadata: ApiReportDraft['metadata']): ApiReportDraft => {
  const {
    consumerWish,
    reponseconsoCode,
    step4: {contactAgreement, consumer},
    ccrfCode,
  } = draft
  const anomaly = getAnomaly(draft)
  const subcategories = getSubcategories(draft)

  const additionalTags: ReportTag[] = [
    ...(consumerWish === 'fixContractualDispute' ? (['LitigeContractuel'] as const) : []),
    ...(consumerWish === 'getAnswer' ? (['ReponseConso'] as const) : []),
    ...specialCategoryTag(anomaly),
  ]

  const tags = uniq([...(draft.tags ?? []), ...additionalTags])
  return {
    // We don't use the rest syntax here ("..."),
    // we prefer to be sure to fill each field explicitely
    gender: consumer.gender,
    category: draft.categoryOverride ?? draft.step0.category,
    subcategories: subcategories.map(_ => _.title),
    details: draft.step3.details,
    firstName: consumer.firstName,
    lastName: consumer.lastName,
    email: consumer.email,
    consumerPhone: consumer.phone,
    consumerReferenceNumber: consumer.referenceNumber,
    contactAgreement,
    employeeConsumer: draft.employeeConsumer ?? false,
    forwardToReponseConso: consumerWish === 'getAnswer',
    fileIds: draft.step3.uploadedFiles?.map(file => file.id) ?? [],
    tags,
    reponseconsoCode: reponseconsoCode ? [reponseconsoCode] : undefined,
    ccrfCode,
    lang: draft.step0.lang,
    rappelConsoId: draft.rappelConso?.id,
    metadata,
    ...step2ToApi(draft.step2),
  }
}

function step2ToApi(
  step2: Step2Model,
): Pick<
  ApiReportDraft,
  | 'companyName'
  | 'companyBrand'
  | 'companyCommercialName'
  | 'companyEstablishmentCommercialName'
  | 'companyAddress'
  | 'companySiret'
  | 'companyActivityCode'
  | 'companyIsHeadOffice'
  | 'companyIsOpen'
  | 'companyIsPublic'
  | 'vendor'
  | 'barcodeProductId'
  | 'websiteURL'
  | 'phone'
  | 'train'
  | 'station'
  | 'influencer'
> {
  const otherFieldsUndefined = {
    barcodeProductId: undefined,
    websiteURL: undefined,
    phone: undefined,
    train: undefined,
    station: undefined,
    influencer: undefined,
  }
  switch (step2.kind) {
    case 'basic':
      return {
        ...otherFieldsUndefined,
        ...companyIdentificationToApi(step2.companyIdentification),
      }
    case 'product':
      return {
        ...otherFieldsUndefined,
        barcodeProductId: step2.barcodeProduct.id,
        ...companyIdentificationToApi(step2.companyIdentification),
      }
    case 'website':
      return {
        ...otherFieldsUndefined,
        websiteURL: step2.website,
        ...companyIdentificationToApi(step2.companyIdentification),
      }
    case 'phone':
      return {
        ...otherFieldsUndefined,
        phone: step2.phone,
        ...companyIdentificationToApi(step2.companyIdentification),
      }
    case 'train': {
      return {
        ...otherFieldsUndefined,
        train: step2.train,
        ...companyIdentificationFieldsUndefined,
      }
    }
    case 'station': {
      return {
        ...otherFieldsUndefined,
        station: step2.station,
        ...companyIdentificationFieldsUndefined,
      }
    }
    case 'influencer':
      return {
        ...otherFieldsUndefined,
        ...companyIdentificationFieldsUndefined,
        influencer: {
          name: step2.influencerName,
          socialNetwork: toApiSocialNetwork(step2.socialNetwork),
          otherSocialNetwork: undefined,
        },
      }
    case 'influencerOtherSocialNetwork':
      return {
        ...otherFieldsUndefined,
        ...companyIdentificationFieldsUndefined,
        companyAddress: {postalCode: step2.consumerPostalCode},
        influencer: {
          name: step2.influencerName,
          socialNetwork: toApiSocialNetwork(step2.socialNetwork),
          otherSocialNetwork: step2.otherSocialNetwork,
        },
      }
  }
}

const companyIdentificationFieldsUndefined = {
  companyName: undefined,
  companyBrand: undefined,
  companyCommercialName: undefined,
  companyEstablishmentCommercialName: undefined,
  companyAddress: undefined,
  companySiret: undefined,
  companyActivityCode: undefined,
  companyIsHeadOffice: undefined,
  companyIsOpen: undefined,
  companyIsPublic: undefined,
  vendor: undefined,
}

function companyIdentificationToApi(
  companyIdentification: CommonCompanyIdentification | ForeignWebsiteCompanyIdentification,
): Pick<
  ApiReportDraft,
  | 'companyName'
  | 'companyBrand'
  | 'companyCommercialName'
  | 'companyEstablishmentCommercialName'
  | 'companyAddress'
  | 'companySiret'
  | 'companyActivityCode'
  | 'companyIsHeadOffice'
  | 'companyIsOpen'
  | 'companyIsPublic'
  | 'vendor'
> {
  const allUndefined = companyIdentificationFieldsUndefined
  switch (companyIdentification.kind) {
    case 'companyFound':
      return {
        ...companySearchResultToApi(companyIdentification.company),
        vendor: undefined,
      }
    case 'marketplaceCompanyFound':
      return {
        ...companySearchResultToApi(companyIdentification.company),
        vendor: companyIdentification.vendor,
      }
    case 'consumerLocation': {
      return {
        ...allUndefined,
        companyAddress: {postalCode: companyIdentification.consumerPostalCode},
      }
    }
    case 'consumerPreciseLocation': {
      return {
        ...allUndefined,
        companyAddress: {
          postalCode: companyIdentification.consumerPostalCode,
          street: companyIdentification.consumerStreet,
        },
      }
    }
    case 'foreignCompany': {
      const {companyName, companyCountryCode, consumerPostalCode} = companyIdentification
      return {
        ...allUndefined,
        companyName,
        companyAddress: {
          country: companyCountryCode,
          postalCode: consumerPostalCode,
        },
      }
    }
    case 'foreignWebsiteWithJustCountry': {
      const {countryCode} = companyIdentification
      return {
        ...allUndefined,
        companyAddress: {
          country: countryCode,
        },
      }
    }
  }
}

function companySearchResultToApi(company: CompanySearchResult) {
  return {
    companyName: company.name,
    companyBrand: company.brand,
    companyCommercialName: company.commercialName,
    companyEstablishmentCommercialName: company.establishmentCommercialName,
    companyAddress: company.address,
    companySiret: company.siret,
    companyActivityCode: company.activityCode,
    companyIsHeadOffice: company.isHeadOffice,
    companyIsOpen: company.isOpen,
    companyIsPublic: company.isPublic,
  }
}
