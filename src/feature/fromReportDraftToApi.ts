import {Anomaly, ReportTag, SocialNetwork} from '@/anomalies/Anomaly'
import {CompanySearchResult} from '@/model/Company'
import {Influencer, ReportDraft} from '@/model/ReportDraft'
import {ApiInfluencer, ApiReportDraft} from '@/model/reportsFromApi'
import {CommonCompanyIdentification, ForeignWebsiteCompanyIdentification, Step2Model} from '@/model/Step2Model'
import {getAnomaly, getCcrfCode, getCompanyKind, getReponseConsoCode, getSubcategories, getTags} from './reportDraftUtils'

export const toApi = (draft: ReportDraft, metadata: ApiReportDraft['metadata']): ApiReportDraft => {
  const {
    consumerWish,
    step4: {contactAgreement, consumer},
  } = draft
  const reponseconsoCode = getReponseConsoCode(draft)
  const ccrfCode = getCcrfCode(draft)
  const subcategories = getSubcategories(draft)
  const tags = computeFinalTags(draft)
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

function computeFinalTags(draft: ReportDraft): ReportTag[] {
  const {consumerWish} = draft
  const companyKind = getCompanyKind(draft)
  const tagsSet = new Set(getTags(draft))
  if (companyKind === 'WEBSITE' || companyKind === 'MERCHANT_WEBSITE' || companyKind === 'TRANSPORTER_WEBSITE') {
    tagsSet.add('Internet')
  }
  if (consumerWish === 'fixContractualDispute') {
    tagsSet.add('LitigeContractuel')
  }
  if (consumerWish === 'getAnswer') {
    tagsSet.add('ReponseConso')
  } else {
    // ReponseConso was set in the arbo to offer the choice
    // but the user didn't pick it
    tagsSet.delete('ReponseConso')
  }
  const special = specialCategoryTag(getAnomaly(draft))
  if (special) {
    tagsSet.add(special)
  }
  return Array.from(tagsSet)
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

const specialCategoryTag = (anomaly: Anomaly): ReportTag | undefined => {
  switch (anomaly.specialCategory) {
    case 'OpenFoodFacts':
      return 'OpenFoodFacts'
    case 'RappelConso':
      return 'RappelConso'
    default:
      return undefined
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
