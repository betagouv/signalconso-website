import {BaseApiClient} from '@/clients/BaseApiClient'
import {appConfig} from '@/core/appConfig'

export interface RappelConsoApiResults {
  total_count: number
  results: RappelConsoApiResult[]
}

export interface RappelConsoApiResult {
  libelle: string
  id: number
  identification_des_produits: string
  lien_vers_la_fiche_rappel: string
}

export class RappelConsoClient {
  private client = new BaseApiClient({baseUrl: appConfig.rappelConsoUrl})

  readonly fetchRappelConso = (q: number): Promise<RappelConsoApiResults> => this.fetch<RappelConsoApiResults>(q)

  private readonly fetch = <T>(q: number) => {
    return this.client.get<T>(`/records`, {
      qs: {
        where: `id=${q}`,
        limit: 1,
      },
    })
  }
}
