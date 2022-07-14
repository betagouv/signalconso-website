import {ReportStatus, ReportStatusPro} from '../report/Report'
import {Index} from '../helper/Utils'

export interface SimpleStat {
  value: string | number
}

export type Period = 'Day' | 'Month'

export type ReportResponseType = 'ACCEPTED' | 'REJECTED' | 'NOT_CONCERNED'

export interface CountByDate {
  date: Date
  count: number
}

export type ReportStatusDistribution = {[key in ReportStatus]: number}
export type ReportStatusProDistribution = {[key in ReportStatusPro]: number}

export type ReportTagsDistribution = Index<number>

export interface ReportResponseReviews {
  positive: number
  negative: number
  neutral: number
}

export interface CurveStatsParams {
  ticks?: number
  tickDuration?: Period
}

export interface ReportResponseStatsParams {
  ticks?: number
  responseStatusQuery?: ReportResponseType[]
}
