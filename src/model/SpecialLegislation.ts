import {CompanySearchResult} from '@/model/Company'
import {ReportDraft2} from '@/model/ReportDraft2'

export const specialLegislations = ['SHRINKFLATION'] as const
export type SpecialLegislation = (typeof specialLegislations)[number]

export function appliedSpecialLegislation(
  company: CompanySearchResult,
  reportDraft: Partial<ReportDraft2>,
): SpecialLegislation | undefined {
  if (reportDraft.tags?.includes('Shrinkflation') && company.activityCode === '47.11C') {
    return 'SHRINKFLATION'
  }
}
