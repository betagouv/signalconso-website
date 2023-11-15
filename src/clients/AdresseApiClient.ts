import {appConfig} from '@/core/appConfig'
import {BaseApiClient} from './BaseApiClient'

export type AdresseType = 'locality' | 'municipality' | 'street' | 'housenumber'

export interface City {
  label: string
  score: number
  id: string
  type: string
  name: string
  postcode: string
  citycode: string
  x: number
  y: number
  population: number
  city: string
  context: string
  importance: number
}

interface ApiAdresseFeature {
  geometry: {type: 'Point'; coordinates: [number, number]}
  properties: City
  type: 'Feature'
}

interface ApiAdresseResult {
  attribution: string
  features: ApiAdresseFeature[]
  filters: {type: AdresseType}
  licence: string
  limit: number
  query: string
  type: string
  version: string
}

//Excluding city with district to force the user to choose the right district
//, otherwise when city name is provided with no district the api is returning the firs district by default ( for 'Paris' only,  postalCode will be 75001) .
const excludedCityWithDistrict = ['Paris', 'Marseille', 'Lyon']

// SEE for documentation : https://adresse.data.gouv.fr/api-doc/adresse/
export class AdresseApiClient {
  private client = new BaseApiClient({baseUrl: appConfig.apiAdresseUrl})

  readonly fetchCity = (q: string): Promise<City[]> => {
    if (q === '') return Promise.resolve([])
    const query = q
    return this.fetch<ApiAdresseResult>(query, 'municipality')
      .then(_ => _.features.map(_ => _.properties))
      .then(_ => _.filter(_ => !excludedCityWithDistrict.includes(_.label)))
      .catch(_ => {
        console.error(_)
        return []
      })
  }

  private readonly fetch = <T>(q: string, type: AdresseType) => {
    return this.client.get<T>(`/search`, {
      qs: {
        q,
        type,
        //Some PostalCode does not appear when we have more than one city linkend to same postal code

        limit: 100,
        // autocomplete: 1
      },
    })
  }
}
