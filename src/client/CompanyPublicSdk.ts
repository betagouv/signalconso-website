import {ApiClientInterface} from './ApiClient'
import {PublicCompanyClient} from './company/PublicCompanyClient'

export class CompanyPublicSdk {
  private readonly client: ApiClientInterface
  readonly company: PublicCompanyClient

  constructor(client: ApiClientInterface) {
    this.client = client
    this.company = new PublicCompanyClient(this.client)
  }
}
