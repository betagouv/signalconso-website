export interface SearchAnalyticsRequest {
  startDate: string
  endDate: string
  contains: string[]
  notContains: string[]
}

export interface QueryAnalyticsRequest {
  startDate: string
  endDate: string
  page: string
}

export interface AnalyticsRow {
  keys: string[],
  clicks: number,
  impressions: number,
  ctr: number,
  position: number
}

export interface SearchAnalyticsResponse {
  month: string
  rows: AnalyticsRow[]
}

export type AirtableAnalyticsData = {
  date: string,
  page: string,
  clicks: number,
  impressions: number,
  ctr: number,
  position: number,
  landingType: string,
  topRequest: string,
  topRequestClicks: number,
  topRequestImpressions: number
}