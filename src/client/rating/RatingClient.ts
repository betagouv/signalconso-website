import {Subcategory} from '../../anomaly/Anomaly'
import {ApiClientInterface} from '../ApiClient'

export class RatingClient {
  constructor(private client: ApiClientInterface) {}

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
