import {ApiClient} from './ApiClient'
import {PublicCompanyClient} from './company/PublicCompanyClient'

export class CompanyPublicSdk {
  private readonly client: ApiClient
  readonly company: PublicCompanyClient

  constructor(client: ApiClient) {
    this.client = client
    this.company = new PublicCompanyClient(this.client)
  }
}
