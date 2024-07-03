import {CompanySearchResult} from '@/model/Company'
import {ReportDraft} from '@/model/ReportDraft'

export const specialLegislations = ['SHRINKFLATION'] as const
export type SpecialLegislation = (typeof specialLegislations)[number]

export function appliedSpecialLegislation(
  company: CompanySearchResult,
  reportDraft: Pick<ReportDraft, 'tags'>,
): SpecialLegislation | undefined {
  if (reportDraft.tags?.includes('Shrinkflation') && company.activityCode === '47.11C') {
    return 'SHRINKFLATION'
  }
}
