import {BaseApiClient} from '@/clients/BaseApiClient'
import {appConfig} from '@/core/appConfig'

interface StationApiResults {
  total_count: number
  results: StationApiResult[]
}

interface StationApiResult {
  nom: string
  libellecourt: string
  segment_drg: string
  codeinsee: string
}

export class StationApiClient {
  private client = new BaseApiClient({baseUrl: appConfig.stationApiUrl})

  readonly fetchStations = (q: string): Promise<StationApiResults> => {
    if (q === '')
      return Promise.resolve({
        total_count: 0,
        results: [],
      })
    return this.fetch<StationApiResults>(q)
  }

  private readonly fetch = <T>(q: string) => {
    return this.client.get<T>(`/records`, {
      qs: {
        where: `nom like '${q}*'`,
        limit: 100,
      },
    })
  }
}
