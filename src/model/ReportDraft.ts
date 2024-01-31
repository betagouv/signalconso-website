import {CompanyKinds, ReportTag, SocialNetworks, Subcategory, Ters, Trains} from '@/anomalies/Anomaly'
import uniq from 'lodash/uniq'
import {AppLang} from '../i18n/localization/AppLangs'
import {CompanyDraft} from './Company'
import {DetailInputValue} from './CreatedReport'
import {UploadedFile} from './UploadedFile'
import {ApiInfluencer, ApiReportDraft} from './reportsFromApi'
import {BarcodeProduct} from './BarcodeProduct'

export const genders = ['Male', 'Female'] as const
export type Gender = (typeof genders)[number]

export interface ReportDraftConsumer {
  firstName: string
  lastName: string
  email: string
  phone?: string
  referenceNumber?: string
  gender?: Gender
}

export interface ReportDraft {
  category: string
  subcategories: Subcategory[]
  companyDraft?: CompanyDraft
  details: DetailInputValue[]
  uploadedFiles?: UploadedFile[]
  consumer: ReportDraftConsumer
  // pretty sure some of these fields aren't actually optional in the draft
  employeeConsumer?: boolean
  contactAgreement: boolean
  vendor: string
  ccrfCode?: string[]
  reponseconsoCode?: string
  tags?: ReportTag[]
  consumerWish?: ConsumerWish
  companyKind?: CompanyKinds
  influencer?: Influencer
  lang: AppLang
  barcodeProduct?: BarcodeProduct
  train: Train
}

export interface Train {
  train: Trains
  ter?: Ters
}

export interface Influencer {
  socialNetwork: SocialNetworks
  name: string
}

export type ConsumerWish =
  // - on empêche l'utilisateur d'être anonyme
  // - on met le tag LitigeContractuel
  // C'est tout.
  // En vrai cela ne change donc pas grand chose pour l'utilisateur
  | 'fixContractualDispute'
  // Cas standard
  | 'companyImprovement'
  // - on met le tag ReponseConso
  // - on met le flag forwardToReponseConso
  // - on ne transmet pas à l'entreprise
  | 'getAnswer'

export class ReportDraft {
  static readonly isTransmittableToPro = (r: Pick<ReportDraft, 'employeeConsumer' | 'consumerWish'>): boolean => {
    return ReportDraft.isTransmittableToProBeforePickingConsumerWish(r) && r.consumerWish !== 'getAnswer'
  }

  static readonly isTransmittableToProBeforePickingConsumerWish = (r: Pick<ReportDraft, 'employeeConsumer'>): boolean => {
    return !r.employeeConsumer
  }

  static readonly toApiInfluencer = (influencer: Influencer): ApiInfluencer => {
    const toApiSocialNetwork = (socialNetwork: SocialNetworks): string => {
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
      }
    }

    return {
      name: influencer.name,
      socialNetwork: toApiSocialNetwork(influencer.socialNetwork),
    }
  }

  static readonly toApi = (draft: ReportDraft, metadata: ApiReportDraft['metadata']): ApiReportDraft => {
    const {consumerWish, reponseconsoCode, category, contactAgreement, vendor, ccrfCode} = draft

    const additionalTags: ReportTag[] = [
      ...(consumerWish === 'fixContractualDispute' ? (['LitigeContractuel'] as const) : []),
      ...(consumerWish === 'getAnswer' ? (['ReponseConso'] as const) : []),
    ]

    const tags = uniq([...(draft.tags ?? []), ...additionalTags])

    return {
      // We don't use the rest syntax here ("..."),
      // we prefer to be sure to fill each field explicitely
      gender: draft.consumer.gender,
      category,
      subcategories: draft.subcategories.map(_ => _.title),
      details: draft.details,
      companyName: draft.companyDraft?.name,
      companyBrand: draft.companyDraft?.brand,
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
      influencer: draft.influencer ? ReportDraft.toApiInfluencer(draft.influencer) : undefined,
      lang: draft.lang,
      barcodeProductId: draft.barcodeProduct?.id,
      metadata,
    }
  }
}
