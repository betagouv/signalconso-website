import {PublicCompanyClient} from './company/PublicCompanyClient'
import {PublicUserClient} from './user/PublicUserClient'
import {PublicReportClient} from './report/PublicReportClient'
import {PublicStatsClient} from './stats/PublicStatsClient'
import {AnomalyClient} from '../anomaly/AnomalyClient'
import {AuthenticateClient} from './authenticate/AuthenticateClient'
import {ApiClientApi} from './ApiClient'
import {PublicConsumerEmailValidationClient} from './consumer-email-validation/PublicConsumerEmailValidationClient'
import {PublicConstantClient} from './constant/PublicConstantClient'
import {FileClient} from './file/FileClient'
import {RatingClient} from './rating/RatingClient'

export class SignalConsoPublicSdk {
  private readonly client: ApiClientApi
  readonly company: PublicCompanyClient
  readonly report: PublicReportClient
  readonly stats: PublicStatsClient
  readonly user: PublicUserClient
  readonly constant: PublicConstantClient
  readonly authenticate: AuthenticateClient
  readonly document: FileClient
  readonly anomaly: AnomalyClient
  readonly rating: RatingClient
  readonly consumerEmail: PublicConsumerEmailValidationClient

  constructor(client: ApiClientApi) {
    this.client = client
    this.company = new PublicCompanyClient(this.client)
    this.report = new PublicReportClient(this.client)
    this.stats = new PublicStatsClient(this.client)
    this.user = new PublicUserClient(this.client)
    this.constant = new PublicConstantClient(this.client)
    this.authenticate = new AuthenticateClient(this.client)
    this.document = new FileClient(this.client)
    this.anomaly = new AnomalyClient(this.client)
    this.rating = new RatingClient(this.client)
    this.consumerEmail = new PublicConsumerEmailValidationClient(this.client)
  }

  // readonly company = new PublicCompanyClient(this.client)
  // readonly report = new PublicReportClient(this.client)
  // readonly stats = new PublicStatsClient(this.client)
  // readonly user = new PublicUserClient(this.client)
  // readonly constant = new PublicConstantClient(this.client)
  // readonly authenticate = new AuthenticateClient(this.client)
  // readonly document = new FileClient(this.client)
  // readonly anomaly = new AnomalyClient(this.client)
  // readonly rating = new RatingClient(this.client)
  // readonly consumerEmail = new PublicConsumerEmailValidationClient(this.client)
}
