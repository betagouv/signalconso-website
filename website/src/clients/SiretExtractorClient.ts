import {appConfig} from '@/core/appConfig'
import {BaseApiClient} from './BaseApiClient'

export class SiretExtractorClient {
  private client = new BaseApiClient({
    baseUrl: appConfig.siretExtractorUrl,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  readonly dig = (websiteUrl: string) => {
    return this.client.post<string>(`/tools/dig`, {
      body: {
        website: websiteUrl,
      },
    })
  }
}
