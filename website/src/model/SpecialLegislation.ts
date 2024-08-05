import {ReportTag} from 'shared/anomalies/Anomaly'
import {CompanySearchResult} from '@/model/Company'

export const specialLegislations = ['SHRINKFLATION'] as const
export type SpecialLegislation = (typeof specialLegislations)[number]

export function appliedSpecialLegislation(company: CompanySearchResult, tags: ReportTag[]): SpecialLegislation | undefined {
  // 47.11C supérettes moins de 400 m2
  // 47.11D supermarchés entre 400 et 2500
  // 47.11F hypermarchés égale ou > à 2500 m2
  if (tags.includes('Shrinkflation') && company.activityCode === '47.11C') {
    return 'SHRINKFLATION'
  }
}
