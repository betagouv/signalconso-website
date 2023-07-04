import {CompanyKinds, ReportTag, socialNetworks, SocialNetworks, Subcategory} from 'anomalies/Anomaly'
import {Address} from './Address'
import {DetailInputValue} from './CreatedReport'
import {ApiInfluencer, ApiReportDraft} from './reportsFromApi'
import {UploadedFile} from './UploadedFile'
import uniq from 'lodash/uniq'
export const genders = ['Male', 'Female'] as const
export type Gender = typeof genders[number]

export interface ReportDraftConsumer {
  firstName: string
  lastName: string
  email: string
  phone?: string
  referenceNumber?: string
  gender?: Gender
}

export interface CompanyDraft {
  siret: string
  name: string
  brand?: string
  address: Address
  website?: string
  phone?: string
  activityCode?: string
  isHeadOffice: boolean
  isPublic: boolean
  isOpen: boolean
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
  reponseconsoCode?: string[]
  tags?: ReportTag[]
  consumerWish?: ConsumerWish
  companyKind?: CompanyKinds
  influencer?: Influencer
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
  static readonly isTransmittableToPro = (r: Pick<ReportDraft, 'employeeConsumer' | 'tags' | 'consumerWish'>): boolean => {
    return ReportDraft.isTransmittableToProBeforePickingConsumerWish(r) && r.consumerWish !== 'getAnswer'
  }

  static readonly isTransmittableToProBeforePickingConsumerWish = (
    r: Pick<ReportDraft, 'employeeConsumer' | 'tags'>,
  ): boolean => {
    return !r.employeeConsumer && !(r.tags ?? []).find(_ => ['ProduitDangereux'].includes(_))
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
    const {consumerWish, ...restOfDraft} = draft

    const additionalTags: ReportTag[] = [
      ...(consumerWish === 'fixContractualDispute' ? (['LitigeContractuel'] as const) : []),
      ...(consumerWish === 'getAnswer' ? (['ReponseConso'] as const) : []),
    ]

    const tags = uniq([...(draft.tags ?? []), ...additionalTags])

    return {
      ...restOfDraft,
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
      companyAddress: draft.companyDraft?.address,
      companySiret: draft.companyDraft?.siret,
      companyIsHeadOffice: draft.companyDraft?.isHeadOffice,
      companyIsPublic: draft.companyDraft?.isPublic,
      companyIsOpen: draft.companyDraft?.isOpen,
      companyActivityCode: draft.companyDraft?.activityCode,
      websiteURL: draft.companyDraft?.website,
      phone: draft.companyDraft?.phone,
      forwardToReponseConso: consumerWish === 'getAnswer',
      metadata,
      // pretty sure these fields aren't actually optional in the draft
      employeeConsumer: draft.employeeConsumer ?? false,
      tags,
      influencer: draft.influencer ? ReportDraft.toApiInfluencer(draft.influencer) : undefined,
    }
  }
}
