import * as categoryPathPage from '../../../../reusablePages/faireUnSignalementPage'
import {allAnomalies} from '../../../../anomalies/Anomalies'
import {appConfig} from '../../../../core/appConfig'
import {buildLinkLandingPageFromAnomaly} from '../../../../core/pagesDefinitions'
import {undefinedIfNull} from '../../../../utils/utils'
import {Metadata} from 'next'
import {notFound} from 'next/navigation'

export type Props = {
  dynamicPath: string
  lang: any
}

function getAnomalyData(params: Props) {
  return allAnomalies(params.lang).find(_ => _.path === params.dynamicPath)
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

  return anomaly ? <categoryPathPage.FaireUnSignalementPage anomaly={anomaly} isWebView={false} /> : notFound()
}

export default Page
