import {ReportTag} from '../../anomaly/Anomaly'
import {ReportStatus} from './Report'
import {Id} from '../../model'

export interface ReportSearch {
  departments?: string[]
  withTags?: ReportTag[]
  withoutTags?: ReportTag[]
  companyCountries?: string[]
  siretSirenList?: string[]
  activityCodes?: string[]
  status?: ReportStatus[]
  companyIds?: Id[]
  start?: Date
  end?: Date
  email?: string
  websiteURL?: string
  phone?: string
  category?: string
  details?: string
  contactAgreement?: boolean
  hasPhone?: boolean
  hasWebsite?: boolean
  hasForeignCountry?: boolean
  hasCompany?: boolean
  hasAttachment?: boolean
}
