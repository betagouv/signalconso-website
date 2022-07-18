import {Id, Report} from '../../model'
import {ApiClientApi} from '../ApiClient'
import {ReportDraft} from './ReportDraft'
import {ResponseConsumerReview} from '../../model/review'

export class PublicReportClient {
  constructor(private client: ApiClientApi) {}

  readonly mapReport = (report: {[key in keyof Report]: any}): Report => ({
    ...report,
    companyAddress: {
      ...report.companyAddress,
      country: report.companyAddress.country?.name,
    },
    creationDate: new Date(report.creationDate),
  })

  readonly postReviewOnReportResponse = (reportId: Id, review: ResponseConsumerReview) => {
    return this.client.post<void>(`/reports/${reportId}/response/review`, {body: review})
  }

  readonly create = (draft: ReportDraft) => {
    return this.client.post<Report>(`/reports`, {body: ReportDraft.toApi(draft)}).then(this.mapReport)
  }
}
