import {CompanyKinds, ReportTag, SocialNetworks, Subcategory, Ters, Trains} from '@/anomalies/Anomaly'
import {Address} from './Address'
import {DetailInputValue} from './CreatedReport'
import {ApiInfluencer, ApiReportDraft} from './reportsFromApi'
import {UploadedFile} from './UploadedFile'
import uniq from 'lodash/uniq'
import {AppLang} from '../i18n/localization/AppLangs'
import {CompanyDraft} from './Company'

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
  barcodeProductId?: string
  train: Train
}

export interface Train {
  train: Trains
  ter?: Ters
}

export interface Influencer {
  socialNetwork: SocialNetworks
  otherSocialNetwork?: string
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

export type TransmissionStatus = 'NOT_TRANSMITTABLE' | 'WILL_BE_TRANSMITTED' | 'MAY_BE_TRANSMITTED' | 'CANNOT_BE_TRANSMITTED'

export class ReportDraft {
  static readonly isTransmittableToPro = (r: Pick<ReportDraft, 'employeeConsumer' | 'consumerWish'>): boolean => {
    return ReportDraft.isTransmittableToProBeforePickingConsumerWish(r) && r.consumerWish !== 'getAnswer'
  }

  static readonly isTransmittableToProBeforePickingConsumerWish = (r: Pick<ReportDraft, 'employeeConsumer'>): boolean => {
    return !r.employeeConsumer
  }

  // Quand l'entreprise n'a pas pu être identifiée par le conso
  static readonly mayBeTransmittedLater = (r: Pick<ReportDraft, 'influencer' | 'companyDraft'>) => {
    return !r.influencer && !r.companyDraft?.siret && r.companyDraft?.address.postalCode
  }

  // Identifiée comme à l'étranger par nos soins
  static readonly cannotBeTransmitted = (r: Pick<ReportDraft, 'influencer' | 'companyDraft'>) => {
    return !r.influencer && !r.companyDraft?.siret && !r.companyDraft?.address.postalCode && r.companyDraft?.address.country
  }

  static readonly transmissionStatus = (
    r: Pick<ReportDraft, 'employeeConsumer' | 'consumerWish' | 'influencer' | 'companyDraft'>,
  ): TransmissionStatus => {
    if (!ReportDraft.isTransmittableToPro(r)) {
      return 'NOT_TRANSMITTABLE'
    } else if (ReportDraft.mayBeTransmittedLater(r)) {
      return 'MAY_BE_TRANSMITTED'
    } else if (ReportDraft.cannotBeTransmitted(r)) {
      return 'CANNOT_BE_TRANSMITTED'
    } else {
      return 'WILL_BE_TRANSMITTED'
    }
  }

  static readonly toApiInfluencer = (influencer: Influencer): ApiInfluencer => {
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

  static readonly toApi = (draft: ReportDraft, metadata: ApiReportDraft['metadata']): ApiReportDraft => {
    const {consumerWish, reponseconsoCode, ...restOfDraft} = draft

    const additionalTags: ReportTag[] = [
      ...(consumerWish === 'fixContractualDispute' ? (['LitigeContractuel'] as const) : []),
      ...(consumerWish === 'getAnswer' ? (['ReponseConso'] as const) : []),
    ]

    const tags = uniq([...(draft.tags ?? []), ...additionalTags])

    return {
      ...restOfDraft,
      reponseconsoCode: reponseconsoCode ? [reponseconsoCode] : undefined,
      details: draft.details,
      gender: draft.consumer.gender,
      subcategories: draft.subcategories.map(_ => _.title),
      firstName: draft.consumer.firstName,
      lastName: draft.consumer.lastName,
      email: draft.consumer.email,
      consumerPhone: draft.consumer.phone,
      consumerReferenceNumber: draft.consumer.referenceNumber,
      fileIds: draft.uploadedFiles?.map(file => file.id) ?? [],
      companyName: draft.companyDraft?.name,
      companyBrand: draft.companyDraft?.brand,
      companyAddress: draft.companyDraft?.address,
      companySiret: draft.companyDraft?.siret,
      companyIsHeadOffice: draft.companyDraft?.isHeadOffice,
      companyIsPublic: draft.companyDraft?.isPublic,
      companyIsOpen: draft.companyDraft?.isOpen,
      companyActivityCode: draft.companyDraft?.activityCode,
      websiteURL: draft.companyDraft?.website,
      phone: draft.companyDraft?.phone,
      forwardToReponseConso: consumerWish === 'getAnswer',
      lang: draft.lang,
      metadata,
      // pretty sure these fields aren't actually optional in the draft
      employeeConsumer: draft.employeeConsumer ?? false,
      tags,
      influencer: draft.influencer ? ReportDraft.toApiInfluencer(draft.influencer) : undefined,
    }
  }
}
