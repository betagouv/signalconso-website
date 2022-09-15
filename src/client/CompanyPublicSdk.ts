import {PublicCompanyClient} from './company/PublicCompanyClient'
import {PublicReportClient} from './report/PublicReportClient'
import {PublicStatsClient} from './stats/PublicStatsClient'
import {ApiClientApi} from './ApiClient'
import {PublicConsumerEmailValidationClient} from './consumer-email-validation/PublicConsumerEmailValidationClient'
import {PublicConstantClient} from './constant/PublicConstantClient'
import {FileClient} from './file/FileClient'
import {RatingClient} from './rating/RatingClient'

export class CompanyPublicSdk {
  private readonly client: ApiClientApi
  readonly company: PublicCompanyClient

  constructor(client: ApiClientApi) {
    this.client = client
    this.company = new PublicCompanyClient(this.client)
  }
}
