import {ReportTag} from 'anomalies/Anomaly'
import {ApiAddress} from './Address'

export interface CreatedReport {
  tags: ReportTag[]
  companyAddress: ApiAddress
  companySiret?: string
  websiteURL?: string
  employeeConsumer: boolean
  contactAgreement: boolean
}

export interface DetailInputValue {
  label: string
  value: string
}
