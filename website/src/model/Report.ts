import {OpenFfResult} from '@/feature/openFoodFacts'
import {RappelConsoResult} from '@/feature/rappelConso'
import {AppLang} from '@/i18n/localization/AppLangs'
import {CompanyKind, NightTrain, SocialNetwork, Ter, Train} from 'shared/anomalies/Anomaly'
import {Step2Model} from './Step2Model'
import {UploadedFile} from './UploadedFile'

export interface Report {
  step0: {
    category: string
    lang: AppLang
  }
  step1: {
    openFf?: OpenFfResult
    rappelConso?: RappelConsoResult
    subcategoriesIndexes: number[]
    employeeConsumer: boolean
    companyKindOverride?: CompanyKind
    consumerWish: ConsumerWish
  }
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
  // Cas standard, process signalconso standard
  | 'reportSomething'
  // - on met le tag ReponseConso
  // - on met le flag forwardToReponseConso
  // - on ne transmet pas à l'entreprise
  | 'getAnswer'

export type DetailInputValues2 = {
  // the keys here are actually stringified numbers : "0", "1", etc.
  [key: string]: string | string[]
}

export type TransmissionStatus = 'NOT_TRANSMITTABLE' | 'WILL_BE_TRANSMITTED' | 'MAY_BE_TRANSMITTED' | 'CANNOT_BE_TRANSMITTED'

// ex:
// ReportWithPickInStep1<"subcategoriesIndexes" | "employeeConsumer">
// = a report which already has these subfields from step1
// (and also has step0)
export type ReportWithPickInStep1<A extends keyof Report['step1']> = Pick<Report, 'step0'> & {
  step1: Pick<Report['step1'], A>
}
