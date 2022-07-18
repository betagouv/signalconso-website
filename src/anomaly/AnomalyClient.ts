import anomaliesJSON from '../anomaly/yml/anomalies.json'
import {lazy} from '../alexlibs/ts-utils'
import {ApiClientApi} from '../client/ApiClient'
import {Anomaly, Category, SubcategoryInformation, SubcategoryInput} from './Anomaly'

export class AnomalyClient {
  constructor(private client: ApiClientApi) {}

  readonly getAnomalies = lazy(() => Promise.resolve(anomaliesJSON.list as Anomaly[]))

  readonly getCategories = lazy(() =>
    Promise.resolve(this.getAnomalies().then(_ => _.filter(anomaly => !anomaly.information).map(anomaly => anomaly.category))),
  )

  static readonly instanceOfSubcategoryInput = (_?: Category): _ is SubcategoryInput => {
    return !!(_ as SubcategoryInput)?.detailInputs
  }

  static readonly instanceOfSubcategoryInformation = (_?: Category): _ is SubcategoryInformation => {
    return !!(_ as SubcategoryInformation)?.information
  }

  static readonly instanceOfAnomaly = (_?: Category): _ is Anomaly => {
    return !!(_ as Anomaly)?.category
  }
}
