import {Country} from './Country'
import {ApiClient} from '../ApiClient'

export class PublicConstantClient {
  constructor(private client: ApiClient) {}

  readonly getCountries = () => this.client.get<Country[]>(`/constants/countries`)
}
