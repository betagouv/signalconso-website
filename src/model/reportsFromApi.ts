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
// Equivalent to ReportDraft in scala code
export interface ApiReportDraft {
  gender?: Gender
  category: string
  subcategories: string[]
  details: DetailInputValue[]
  companyName?: string
  companyBrand?: string
  companyAddress?: Address
  companySiret?: string
  companyActivityCode?: string
  companyIsHeadOffice?: boolean
  companyIsOpen?: boolean
  companyIsPublic?: boolean
  websiteURL?: string
  phone?: string
  firstName: string
  lastName: string
  email: string
  consumerPhone?: string
  consumerReferenceNumber?: string
  contactAgreement: boolean
  employeeConsumer: boolean
  forwardToReponseConso?: boolean
  fileIds: string[]
  vendor?: string
  tags: ReportTag[]
  reponseconsoCode?: string[]
  ccrfCode?: string[]
  influencer?: ApiInfluencer
  lang: AppLang
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
  ccrfCode: string[]
  phone: string | null
  consumerPhone: string | null
  employeeConsumer: boolean
  reponseconsoCode: string[]
  gender: Gender | null
}
