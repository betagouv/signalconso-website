import {CompanyKind, NightTrain, SocialNetwork, Ter, Train} from '@/anomalies/Anomaly'
import {OpenFfResult} from '@/feature/openFoodFacts'
import {RappelConsoResult} from '@/feature/rappelConso'
import {AppLang} from '@/i18n/localization/AppLangs'
import {Step2Model} from './Step2Model'
import {UploadedFile} from './UploadedFile'

export interface Report {
  step0: {
    category: string
    lang: AppLang
  }
  // --- step1 fields --
  openFf?: OpenFfResult
  rappelConso?: RappelConsoResult
  subcategoriesIndexes: number[]
  employeeConsumer: boolean
  companyKindOverride?: CompanyKind
  consumerWish: ConsumerWish
  // -------------------
  step2: Step2Model
  step3: {
    details: DetailInputValues2
    uploadedFiles?: UploadedFile[]
  }
  step4: {
    consumer: {
      firstName: string
      lastName: string
      email: string
      phone?: string
      referenceNumber?: string
      gender?: Gender
    }
    contactAgreement: boolean
  }
}

export interface TrainDraft {
  train: Train
  ter?: Ter
  nightTrain?: NightTrain
}

export interface Influencer {
  socialNetwork: SocialNetwork
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

export const genders = ['Male', 'Female'] as const
export type Gender = (typeof genders)[number]

export type DetailInputValues2 = {
  // the keys here are actually stringified numbers : "0", "1", etc.
  [key: string]: string | string[]
}

export type TransmissionStatus = 'NOT_TRANSMITTABLE' | 'WILL_BE_TRANSMITTED' | 'MAY_BE_TRANSMITTED' | 'CANNOT_BE_TRANSMITTED'
