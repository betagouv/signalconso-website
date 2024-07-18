import {SocialNetwork} from '@/anomalies/Anomaly'
import {BarcodeProduct} from './BarcodeProduct'
import {CompanySearchResult} from './Company'
import {TrainDraft} from './ReportDraft'

type Step2Model =
  | {kind: 'general'; companyIdentification: Step2CompanyIdentification}
  | {kind: 'product'; companyIdentification: Step2CompanyIdentification; barcodeProduct: BarcodeProduct}
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
      kind: 'consumerLocation'
      consumerPostalCode: string
    }
  | {
      kind: 'consumerPreciseLocation'
      consumerPostalCode: string
      consumerStreet: string
    }
  | {
      kind: 'foreignCompany'
      companyName: string
      companyCountryCode: string
      consumerPostalCode: string
    }
