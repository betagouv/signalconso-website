import {SocialNetwork} from '@/anomalies/Anomaly'
import {BarcodeProduct} from './BarcodeProduct'
import {CompanySearchResult} from './Company'
import {TrainDraft} from './ReportDraft'

export type Step2Model =
  | {kind: 'basic'; companyIdentification: Step2CompanyIdentification}
  | {kind: 'product'; companyIdentification: Step2CompanyIdentification; barcodeProduct: BarcodeProduct}
  | {kind: 'website'; companyIdentification: Step2CompanyIdentification; website: string}
  | {kind: 'phone'; companyIdentification: Step2CompanyIdentification; phone: string}
  | {
      kind: 'train'
      train: TrainDraft
    }
  | {
      kind: 'station'
      station: string
    }
  | {
      kind: 'influencer'
      socialNetwork: Exclude<SocialNetwork, 'OTHER'>
      influencerName: string
    }
  | {
      kind: 'influencerOtherSocialNetwork'
      socialNetwork: 'OTHER'
      otherSocialNetwork: string
      influencerName: string
      consumerPostalCode: string
    }

type Step2CompanyIdentification =
  | {
      kind: 'companyFound'
      company: CompanySearchResult
    }
  | {
      kind: 'foreignCompany'
      companyName: string
      companyCountryCode: string
      consumerPostalCode: string
    }
  | {
      kind: 'consumerLocation'
      consumerPostalCode: string
    }
  | {
      kind: 'consumerPreciseLocation'
      consumerPostalCode: string
      consumerStreet: string
    }
