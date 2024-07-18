import {CompanyKinds, NightTrains, ReportTag, SocialNetworks, Ters, Trains} from '@/anomalies/Anomaly'
import {OpenFfResult} from '@/feature/openFoodFacts'
import {RappelConsoResult} from '@/feature/rappelConso'
import {AppLang} from '@/i18n/localization/AppLangs'
import {BarcodeProduct} from './BarcodeProduct'
import {CompanyDraft} from './Company'
import {DetailInputValue} from './CreatedReport'
import {UploadedFile} from './UploadedFile'

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
  step0: {
    category: string
    lang: AppLang
  }
  step4: {
    consumer: ReportDraftConsumer
    contactAgreement: boolean
  }
  subcategoriesIndexes: number[]
  categoryOverride?: string
  companyDraft?: CompanyDraft
  details: DetailInputValue[]
  uploadedFiles?: UploadedFile[]
  // pretty sure some of these fields aren't actually optional in the draft
  employeeConsumer?: boolean
  vendor: string
  ccrfCode?: string[]
  reponseconsoCode?: string
  tags?: ReportTag[]
  consumerWish?: ConsumerWish
  companyKind?: CompanyKinds
  influencer?: Influencer
  barcodeProduct?: BarcodeProduct
  train: Train
  station: string
  openFf?: OpenFfResult
  rappelConso?: RappelConsoResult
}

export interface Train {
  train: Trains
  ter?: Ters
  nightTrain?: NightTrains
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
