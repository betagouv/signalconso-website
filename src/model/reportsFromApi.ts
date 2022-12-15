import {ReportTag} from 'anomalies/Anomaly'
import {Address, ApiAdress} from './Address'
import {DetailInputValue, ReportStatus} from './Report'
import {Gender} from './ReportDraft'

// That's exactly what we should send to the API
// Equivalent to ReportDraft in scala code
export interface ApiReportDraft {
  gender?: Gender
  category: string
  subcategories: string[]
  details: DetailInputValue[]
  companyName?: string
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
}

// That's exactly what we receive from the API
// Equivalent to Report (its JSON representation) in scala code
export interface ApiCreatedReport {
  id: string
  category: string
  subcategories: string[]
  details: DetailInputValue[]
  companyId?: string
  companyName?: string
  companyAddress: ApiAdress
  companySiret?: string
  creationDate: Date
  contactAgreement: boolean
  status: ReportStatus
  websiteURL?: string
  host?: string
  vendor?: string
  tags: ReportTag[]
  activityCode?: string
  expirationDate: string
  firstName: string
  lastName: string
  email: string
  consumerReferenceNumber?: string
  ccrfCode: string[]
  phone?: string
  consumerPhone?: string
  employeeConsumer: boolean
  reponseconsoCode: string[]
  gender?: Gender
}
