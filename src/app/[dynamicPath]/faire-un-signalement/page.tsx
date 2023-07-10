import * as categoryPathPage from '../../../reusablePages/faireUnSignalementPage'
import {Metadata} from 'next'
import {allAnomalies} from '../../../anomalies/Anomalies'
import {appConfig} from '../../../core/appConfig'
import {buildLinkLandingPageFromAnomaly} from '../../../core/pagesDefinitions'
import {undefinedIfNull} from '../../../utils/utils'

export type Props = {
  dynamicPath: string
}

function getAnomalyData(params: Props) {
  const anomaly = allAnomalies.find(_ => _.path === params.dynamicPath)

  if (!anomaly) {
    throw new Error(`Cannot find anomaly for params.id : ${params.dynamicPath}`)
  }
  return anomaly
}

export function generateMetadata(props: {params: Props}): Metadata {
  const anomaly = getAnomalyData(props.params)

  return {
    alternates: {canonical: appConfig.appBaseUrl + buildLinkLandingPageFromAnomaly(anomaly)},
    title: anomaly.seoTitle + ' - SignalConso',
    description: undefinedIfNull(anomaly.seoDescription ?? anomaly.description),
  }
}

const Page = (props: {params: Props}) => {
  const anomaly = getAnomalyData(props.params)

  return <categoryPathPage.FaireUnSignalementPage anomaly={anomaly} isWebView={false} />
}

export default Page
