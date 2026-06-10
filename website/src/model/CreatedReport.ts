import {PostReportHelper, ReportTag} from 'shared/anomalies/Anomaly'
import {ApiAddress} from './Address'

export interface CreatedReport {
  tags: ReportTag[]
  companyAddress: ApiAddress
  companySiret?: string
  websiteURL?: string
  contactAgreement: boolean
  postReportHelper?: PostReportHelper
}

export interface DetailInputValue {
  label: string
  value: string
}
