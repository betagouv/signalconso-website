import { ApiClientApi } from './ApiClient'
import { PublicCompanyClient } from './company/PublicCompanyClient'

export class CompanyPublicSdk {
  private readonly client: ApiClientApi
  readonly company: PublicCompanyClient

  constructor(client: ApiClientApi) {
    this.client = client
    this.company = new PublicCompanyClient(this.client)
  }
}
