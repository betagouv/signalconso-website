import {Subcategory} from '../../anomaly/Anomaly'
import {ApiClient} from '../ApiClient'

export class RatingClient {
  constructor(private client: ApiClient) {}

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
