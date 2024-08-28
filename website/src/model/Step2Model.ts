import {SocialNetwork} from 'shared/anomalies/Anomaly'
import {BarcodeProduct} from './BarcodeProduct'
import {CompanySearchResult} from './Company'
import {TrainDraft} from './Report'

export type Step2Model =
  | {
      kind: 'basic'
      companyIdentification: CommonCompanyIdentification
    }
  | {
      kind: 'product'
      barcodeProduct: BarcodeProduct
      companyIdentification: CommonCompanyIdentification
    }
  | {
      kind: 'website'
      website: string
      companyIdentification: CommonCompanyIdentification | ForeignWebsiteCompanyIdentification
    }
  | {
      kind: 'phone'
      companyIdentification: CommonCompanyIdentification
      phone: string
    }
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

export type CommonCompanyIdentification =
  | {
      kind: 'companyFound'
      company: CompanySearchResult
    }
  | {
      kind: 'marketplaceCompanyFound'
      company: CompanySearchResult
      vendor: string
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

export type ForeignWebsiteCompanyIdentification = {
  kind: 'foreignWebsiteWithJustCountry'
  countryCode: string
}
