import {CountByDate, CurveStatsParams, SimpleStat} from './Stats'
import {Id, Report, ReportStatus, ReportTag} from '../../model'
import {subDays} from 'date-fns'
import {pipe} from 'rxjs'
import {ApiClientApi} from '../ApiClient'
import {ReportSearch} from '../report/ReportSearch'
import {cleanObject, dateToApiTime, roundValue} from '../helper/Utils'

export interface ReportFilterQuerystring {
  readonly departments?: string[]
  readonly withTags?: ReportTag[]
  readonly withoutTags?: ReportTag[]
  readonly companyCountries?: string[]
  readonly siretSirenList?: string[]
  readonly status?: string[]
  start?: string
  end?: string
  email?: string
  websiteURL?: string
  phone?: string
  category?: string
  details?: string
  hasWebsite?: 'true' | 'false'
  hasPhone?: 'true' | 'false'
  hasForeignCountry?: 'true' | 'false'
  hasCompany?: 'true' | 'false'
}

export class PublicStatsClient {
  constructor(private client: ApiClientApi) {}

  private readonly baseURL = `stats/reports`

  readonly reportFilter2QueryString = (report: ReportSearch): ReportFilterQuerystring => {
    try {
      const {hasCompany, hasForeignCountry, hasWebsite, hasPhone, start, end, ...r} = report
      const parseBoolean = (_: keyof Pick<ReportSearch, 'hasForeignCountry' | 'hasWebsite' | 'hasPhone' | 'hasCompany'>) =>
        report[_] !== undefined && {[_]: ('' + report[_]) as 'true' | 'false'}
      const parseDate = (_: keyof Pick<ReportSearch, 'start' | 'end'>) => (report[_] ? {[_]: dateToApiTime(report[_])} : {})
      return {
        ...r,
        ...parseBoolean('hasCompany'),
        ...parseBoolean('hasWebsite'),
        ...parseBoolean('hasPhone'),
        ...parseBoolean('hasForeignCountry'),
        ...parseDate('start'),
        ...parseDate('end'),
      }
    } catch (e) {
      console.error('Caught error on "reportFilter2QueryString"', report, e)
      return {}
    }
  }

  readonly cleanReportFilter = (filter: ReportSearch): ReportSearch => {
    if (filter.hasCompany === false) {
      delete filter.siretSirenList
    }
    if (filter.hasForeignCountry === false) {
      delete filter.companyCountries
    }
    if (filter.hasWebsite === false) {
      delete filter.websiteURL
    }
    if (filter.hasPhone === false) {
      delete filter.phone
    }
    return filter
  }

  readonly getReportCount = (filters?: ReportSearch) => {
    const qs = filters ? pipe(this.cleanReportFilter, this.reportFilter2QueryString, cleanObject)(filters) : undefined
    return this.client.get<SimpleStat>(`${this.baseURL}/count`, {qs})
  }
  readonly getReportCountCurve = (search?: ReportSearch & CurveStatsParams) => {
    return this.client
      .get<CountByDate[]>(`${this.baseURL}/curve`, {qs: search})
      .then(res => res.map(_ => ({..._, date: new Date(_.date)})))
  }

  readonly percentage = new PublicStatsPercentageClient(this)

  readonly percentageCurve = new PublicStatsCurveClient(this)
}

class PublicStatsPercentageClient {
  constructor(private client: PublicStatsClient) {}

  private readonly delayBeforeCountingToWaitForProResponseInDays = 30

  private readonly statsAdminStartDate = new Date('2019-01-01')

  private readonly getPercentByStatus = async ({
    companyId,
    status,
    baseStatus,
    start,
    end,
  }: {
    companyId?: Id
    status: ReportStatus[]
    baseStatus?: ReportStatus[]
    start?: Date
    end?: Date
  }): Promise<SimpleStat> => {
    const [count, baseCount] = await Promise.all([
      this.client.getReportCount({start, end, status, ...(companyId ? {companyIds: [companyId]} : {})}),
      this.client.getReportCount({start, end, status: baseStatus, ...(companyId ? {companyIds: [companyId]} : {})}),
    ])
    return {value: roundValue((+count.value / +baseCount.value) * 100)}
  }
  readonly getReportForwardedToPro = (companyId?: Id): Promise<SimpleStat> => {
    return this.getPercentByStatus({
      companyId,
      status: Report.transmittedStatus,
      start: this.statsAdminStartDate,
      end: subDays(new Date(), this.delayBeforeCountingToWaitForProResponseInDays),
    })
  }

  readonly getReportReadByPro = (companyId?: Id) => {
    return this.getPercentByStatus({
      companyId,
      status: Report.readStatus,
      baseStatus: Report.transmittedStatus,
      start: this.statsAdminStartDate,
      end: subDays(new Date(), this.delayBeforeCountingToWaitForProResponseInDays),
    })
  }

  readonly getReportWithResponse = (companyId?: Id) => {
    return this.getPercentByStatus({
      companyId,
      status: Report.respondedStatus,
      baseStatus: Report.readStatus,
      start: this.statsAdminStartDate,
      end: subDays(new Date(), this.delayBeforeCountingToWaitForProResponseInDays),
    })
  }

  readonly getReportWithWebsite = async (companyId?: Id): Promise<SimpleStat> => {
    const [count, baseCount] = await Promise.all([
      this.client.getReportCount({
        hasWebsite: true,
        start: this.statsAdminStartDate,
        end: subDays(new Date(), this.delayBeforeCountingToWaitForProResponseInDays),
        ...(companyId ? {companyIds: [companyId]} : {}),
      }),
      this.client.getReportCount({
        start: this.statsAdminStartDate,
        end: subDays(new Date(), this.delayBeforeCountingToWaitForProResponseInDays),
        ...(companyId ? {companyIds: [companyId]} : {}),
      }),
    ])
    return {value: roundValue((+count.value / +baseCount.value) * 100)}
  }
}

class PublicStatsCurveClient {
  constructor(private client: PublicStatsClient) {}

  private readonly getReportPercentageCurve = async ({
    companyId,
    ticks,
    tickDuration,
    status,
    baseStatus,
  }: CurveStatsParams & {companyId?: Id; status: ReportStatus[]; baseStatus?: ReportStatus[]}): Promise<CountByDate[]> => {
    const params = {
      status,
      ticks,
      tickDuration,
      ...(companyId ? {companyIds: [companyId]} : {}),
    }
    const baseParams = {
      status: baseStatus,
      ticks,
      tickDuration,
      ...(companyId ? {companyIds: [companyId]} : {}),
    }
    const [curve, baseCurve] = await Promise.all([
      this.client.getReportCountCurve(params),
      this.client.getReportCountCurve(baseParams),
    ])
    if (curve.length !== baseCurve.length) {
      console.error(params, curve, `doesn't have the same size than `, baseParams, baseCurve)
      return Promise.reject({code: 'front-side'})
    }
    return this.getPercent(curve, baseCurve)
  }

  private getPercent = (curve: CountByDate[], baseCurve: CountByDate[]): Promise<CountByDate[]> => {
    let res: CountByDate[] = []
    for (let i = 0; i < curve.length; i++) {
      if (curve[i].date.getTime() !== baseCurve[i].date.getTime()) {
        console.error(curve[i], `have different date than`, baseCurve[i], ' values: ', curve, baseCurve)
        return Promise.reject({code: 'front-side'})
      }
      res[i] = {
        count: roundValue((curve[i].count / baseCurve[i].count) * 100),
        date: curve[i].date,
      }
    }
    return Promise.resolve(res)
  }

  readonly getReportForwardedPercentage = async (params: CurveStatsParams & {companyId?: Id}): Promise<CountByDate[]> => {
    return this.getReportPercentageCurve({
      ...params,
      status: Report.transmittedStatus,
    })
  }

  readonly getReportRespondedPercentage = (params: CurveStatsParams & {companyId?: Id}) => {
    return this.getReportPercentageCurve({
      ...params,
      status: Report.respondedStatus,
      baseStatus: Report.readStatus,
    })
  }

  readonly getReportReadPercentage = (params: CurveStatsParams & {companyId?: Id}) => {
    return this.getReportPercentageCurve({
      ...params,
      status: Report.readStatus,
      baseStatus: Report.transmittedStatus,
    })
  }
}
