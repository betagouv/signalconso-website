import {appConfig} from 'conf/appConfig'
import {ApiClient} from './ApiClient'
import {WebsiteCompanySearchResult} from './company/Company'
import {Country} from './constant/Country'
import {PublicConstantClient} from './constant/PublicConstantClient'
import {PublicConsumerEmailValidationClient} from './consumer-email-validation/PublicConsumerEmailValidationClient'
import {FileClient} from './file/FileClient'
import {RatingClient} from './rating/RatingClient'
import {Report} from './report/Report'
import {ReportDraft} from './report/ReportDraft'

export class SignalConsoPublicSdk {
  private readonly client: ApiClient = new ApiClient({
    baseUrl: appConfig.apiBaseUrl + '/api',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
  readonly constant: PublicConstantClient
  readonly document: FileClient
  readonly rating: RatingClient
  readonly consumerEmail: PublicConsumerEmailValidationClient

  constructor() {
    this.constant = new PublicConstantClient(this.client)
    this.document = new FileClient(this.client)
    this.rating = new RatingClient(this.client)
    this.consumerEmail = new PublicConsumerEmailValidationClient(this.client)
  }

  searchCompaniesByUrl = (url: string) => {
    return this.client.get<WebsiteCompanySearchResult>(`/companies/hosts`, {qs: {url}})
  }

  searchForeignCompaniesByUrl = (url: string) => {
    return this.client.get<Country[]>(`/websites/search-url`, {qs: {url}})
  }

  createReport = (draft: ReportDraft) => {
    return this.client.post<Report>(`/reports`, {body: ReportDraft.toApi(draft)}).then(mapReport)
  }

  getPublicStatCount = (publicStat: PublicStat) => {
    return this.client.get<number>(`stats/reports/public/count`, {qs: {publicStat}})
  }

  getPublicStatCurve = async (publicStat: PublicStat): Promise<CountByDate[]> => {
    const res = await this.client.get<{count: number; date: string}[]>(`stats/reports/public/curve`, {qs: {publicStat}})
    return res.map(({date, ...rest}) => ({
      date: new Date(date),
      ...rest,
    }))
  }
}

const mapReport = (report: {[key in keyof Report]: any}): Report => ({
  ...report,
  companyAddress: {
    ...report.companyAddress,
    country: report.companyAddress.country?.name,
  },
  creationDate: new Date(report.creationDate),
})

type PublicStat =
  | 'PromesseAction'
  | 'Reports'
  | 'TransmittedPercentage'
  | 'ReadPercentage'
  | 'ResponsePercentage'
  | 'WebsitePercentage'

export type CountByDate = {
  date: Date
  count: number
}
