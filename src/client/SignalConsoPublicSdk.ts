import {PublicCompanyClient} from './company/PublicCompanyClient'
import {PublicReportClient} from './report/PublicReportClient'
import {NewPublicStatsClient} from './stats/NewPublicStatsClient'
import {AnomalyClient} from '../anomaly/AnomalyClient'
import {ApiClientApi} from './ApiClient'
import {PublicConsumerEmailValidationClient} from './consumer-email-validation/PublicConsumerEmailValidationClient'
import {PublicConstantClient} from './constant/PublicConstantClient'
import {FileClient} from './file/FileClient'
import {RatingClient} from './rating/RatingClient'

export class SignalConsoPublicSdk {
  private readonly client: ApiClientApi
  readonly company: PublicCompanyClient
  readonly report: PublicReportClient
  readonly stats: NewPublicStatsClient
  readonly constant: PublicConstantClient
  readonly document: FileClient
  readonly anomaly: AnomalyClient
  readonly rating: RatingClient
  readonly consumerEmail: PublicConsumerEmailValidationClient

  constructor(client: ApiClientApi) {
    this.client = client
    this.company = new PublicCompanyClient(this.client)
    this.report = new PublicReportClient(this.client)
    this.stats = new NewPublicStatsClient(this.client)
    this.constant = new PublicConstantClient(this.client)
    this.document = new FileClient(this.client)
    this.anomaly = new AnomalyClient(this.client)
    this.rating = new RatingClient(this.client)
    this.consumerEmail = new PublicConsumerEmailValidationClient(this.client)
  }
}
