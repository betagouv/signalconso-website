import {Subcategory} from '../../anomaly/Anomaly'
import {ApiClientApi} from '../ApiClient'

export class RatingClient {
  constructor(private client: ApiClientApi) {}

  readonly rate = (category: string, subcategories: Subcategory[], positive: boolean): Promise<void> => {
    return this.client.post(`/rating`, {
      body: {
        category,
        subcategories: subcategories
          ? subcategories.map(subcategory => (subcategory.title ? subcategory.title : subcategory))
          : [''],
        positive,
      },
    })
  }
}
