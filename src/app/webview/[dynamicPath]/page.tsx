import * as categoryPathPage from '../../../reusablePages/faireUnSignalementPage'
import {Metadata} from 'next'
import {allAnomalies} from '../../../anomalies/Anomalies'
import {appConfig} from '../../../core/appConfig'
import {buildLinkLandingPageFromAnomaly} from '../../../core/pagesDefinitions'
import {undefinedIfNull} from '../../../utils/utils'
import {notFound} from 'next/navigation'

export type Props = {
  dynamicPath: string
}

function getAnomalyData(params: Props) {
  const anomaly = allAnomalies.find(_ => _.path === params.dynamicPath)

  return anomaly
}

export function generateMetadata(props: {params: Props}): Metadata {
  const anomaly = getAnomalyData(props.params)

  return anomaly
    ? {
        alternates: {canonical: appConfig.appBaseUrl + buildLinkLandingPageFromAnomaly(anomaly)},
        title: anomaly.seoTitle + ' - SignalConso',
        description: undefinedIfNull(anomaly.seoDescription ?? anomaly.description),
      }
    : {}
}

const Page = (props: {params: Props}) => {
  const anomaly = getAnomalyData(props.params)

  return anomaly ? <categoryPathPage.FaireUnSignalementPage anomaly={anomaly} isWebView={true} /> : notFound()
}

export default Page
