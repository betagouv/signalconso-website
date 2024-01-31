import {ReportTag} from '@/anomalies/Anomaly'
import {Address, ApiAddress} from './Address'
import {DetailInputValue} from './CreatedReport'
import {Gender} from './ReportDraft'
import {AppLang} from '../i18n/localization/AppLangs'

export interface ApiInfluencer {
  socialNetwork: string
  name: string
}

// That's exactly what we should send to the API
// Equivalent to ReportDraft in Scala code.
// We don't use the optional field syntax here ("?:")
// We want to be sure to send every field to the API
export interface ApiReportDraft {
  gender: Gender | undefined
  category: string
  subcategories: string[]
  details: DetailInputValue[]
  companyName: string | undefined
  companyBrand: string | undefined
  companyAddress: Address | undefined
  companySiret: string | undefined
  companyActivityCode: string | undefined
  companyIsHeadOffice: boolean | undefined
  companyIsOpen: boolean | undefined
  companyIsPublic: boolean | undefined
  websiteURL: string | undefined
  phone: string | undefined
  firstName: string
  lastName: string
  email: string
  consumerPhone: string | undefined
  consumerReferenceNumber: string | undefined
  contactAgreement: boolean
  employeeConsumer: boolean
  forwardToReponseConso: boolean | undefined
  fileIds: string[]
  vendor: string | undefined
  tags: ReportTag[]
  reponseconsoCode: string[] | undefined
  ccrfCode: string[] | undefined
  influencer: ApiInfluencer | undefined
  lang: AppLang
  barcodeProductId: string | undefined
  metadata:
    | {
        isMobileApp: true
        os?: 'Ios' | 'Android'
      }
    | {isMobileApp: false}
}

// That's exactly what we receive from the API
// Equivalent to Report (its JSON representation) in scala code
export interface ApiCreatedReport {
  id: string
  category: string
  subcategories: string[]
  details: DetailInputValue[]
  companyId: string | null
  companyName: string | null
  companyAddress: ApiAddress
  companySiret: string | null
  creationDate: Date
  contactAgreement: boolean
  status: unknown // no need to type precisely
  websiteURL: string | null
  host: string | null
  vendor: string | null
  tags: ReportTag[]
  activityCode: string | null
  expirationDate: string
  firstName: string
  lastName: string
  email: string
  consumerReferenceNumber: string | null
  phone: string | null
  ccrfCode: string[]
  consumerPhone: string | null
  employeeConsumer: boolean
  reponseconsoCode: string[]
  gender: Gender | null
}
