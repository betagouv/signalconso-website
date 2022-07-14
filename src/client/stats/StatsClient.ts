import {CountByDate, CurveStatsParams, Id, ReportResponseStatsParams, ReportStatusProDistribution} from '../../model'
import {ReportResponseReviews, ReportStatusDistribution, ReportTagsDistribution} from './Stats'
import {toNumberOrDefault} from '../helper/Utils'
import {ApiClientApi} from '../ApiClient'

export class StatsClient {
  constructor(private client: ApiClientApi) {}

  readonly getTags = (companyId: Id) => {
    return this.client.get<ReportTagsDistribution>(`/stats/reports/tags`, {qs: {companyId}})
  }

  readonly getStatus = (companyId: Id) => {
    return this.client.get<ReportStatusDistribution>(`/stats/reports/status`, {qs: {companyId}})
  }

  readonly getProStatus = (companyId: Id): Promise<ReportStatusProDistribution> => {
    return this.client.get<ReportStatusDistribution>(`/stats/reports/status`, {qs: {companyId}}).then(
      _ =>
        <ReportStatusProDistribution>{
          ARepondre: toNumberOrDefault(_.Transmis, 0),
          NonConsulte: toNumberOrDefault(_.TraitementEnCours, 0),
          Cloture:
            toNumberOrDefault(_.PromesseAction, 0) +
            toNumberOrDefault(_.Infonde, 0) +
            toNumberOrDefault(_.NonConsulte, 0) +
            toNumberOrDefault(_.ConsulteIgnore, 0) +
            toNumberOrDefault(_.MalAttribue, 0),
        },
    )
  }

  readonly getResponseReviews = (companyId: Id) => {
    return this.client.get<ReportResponseReviews>(`/stats/reports/reviews`, {qs: {companyId}})
  }

  readonly getReportedInactiveProAccountRate = (search?: CurveStatsParams) => {
    return this.client
      .get<CountByDate[]>(`/stats/pro-account-rate`, {qs: search})
      .then(res => res.map(_ => ({..._, date: new Date(_.date)})))
  }

  readonly getProReportTransmittedStat = (search?: CurveStatsParams) => {
    return this.client
      .get<CountByDate[]>(`/stats/reports/pro-transmitted`, {qs: search})
      .then(res => res.map(_ => ({..._, date: new Date(_.date)})))
  }

  readonly getProReportResponseStat = (search?: ReportResponseStatsParams) => {
    return this.client
      .get<CountByDate[]>(`/stats/reports/pro-response`, {qs: search})
      .then(res => res.map(_ => ({..._, date: new Date(_.date)})))
  }

  readonly getActiveDgccrfAccountCurve = (search?: CurveStatsParams) => {
    return this.client
      .get<CountByDate[]>(`/stats/dgccrf-active-account`, {qs: search})
      .then(res => res.map(_ => ({..._, date: new Date(_.date)})))
  }

  readonly getDgccrfAccountCurve = (search?: CurveStatsParams) => {
    return this.client
      .get<CountByDate[]>(`/stats/dgccrf-account`, {qs: search})
      .then(res => res.map(_ => ({..._, date: new Date(_.date)})))
  }

  readonly getDgccrfSubscriptionsCurve = (search?: CurveStatsParams) => {
    return this.client
      .get<CountByDate[]>(`/stats/dgccrf-subscriptions`, {qs: search})
      .then(res => res.map(_ => ({..._, date: new Date(_.date)})))
  }
}
