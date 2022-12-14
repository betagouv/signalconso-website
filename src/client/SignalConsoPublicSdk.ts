import { appConfig } from 'conf/appConfig'
import { ApiClient } from './ApiClient'
import { WebsiteCompanySearchResult } from './company/Company'
import { Country } from './constant/Country'
import { PublicConstantClient } from './constant/PublicConstantClient'
import { PublicConsumerEmailValidationClient } from './consumer-email-validation/PublicConsumerEmailValidationClient'
import { FileClient } from './file/FileClient'
import { RatingClient } from './rating/RatingClient'
import { PublicReportClient } from './report/PublicReportClient'
import { PublicStatsClient } from './stats/PublicStatsClient'

export class SignalConsoPublicSdk {
  private readonly client: ApiClient = new ApiClient({
    baseUrl: appConfig.apiBaseUrl + '/api',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
  readonly report: PublicReportClient
  readonly stats: PublicStatsClient
  readonly constant: PublicConstantClient
  readonly document: FileClient
  readonly rating: RatingClient
  readonly consumerEmail: PublicConsumerEmailValidationClient

  constructor() {
    this.report = new PublicReportClient(this.client)
    this.stats = new PublicStatsClient(this.client)
    this.constant = new PublicConstantClient(this.client)
    this.document = new FileClient(this.client)
    this.rating = new RatingClient(this.client)
    this.consumerEmail = new PublicConsumerEmailValidationClient(this.client)
  }

  readonly searchCompaniesByUrl = (url: string) => {
    return this.client.get<WebsiteCompanySearchResult>(`/companies/hosts`, {qs: {url}})
  }

  readonly searchForeignCompaniesByUrl = (url: string) => {
    return this.client.get<Country[]>(`/websites/search-url`, {qs: {url}})
  }
}
