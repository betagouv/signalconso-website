import {ReportTag} from 'anomalies/Anomaly'
import {Address} from './Address'

export interface CreatedReport {
  tags: ReportTag[]
  companyAddress: Address
  companySiret?: string
  websiteURL?: string
  employeeConsumer: boolean
  contactAgreement: boolean
}

export interface DetailInputValue {
  label: string
  value: string
}
