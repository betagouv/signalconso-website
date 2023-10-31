import {notFound} from 'next/navigation'
import {allAnomalies} from '../../../../anomalies/Anomalies'
import * as categoryPathPage from '../../../../reusablePages/faireUnSignalementPage'

export type Props = {
  dynamicPath: string
  lang: any
}

function getAnomalyData(params: Props) {
  const anomaly = allAnomalies(params.lang).find(_ => _.path === params.dynamicPath)
  return anomaly
}

// no need for metadata, webview is not indexed

const Page = (props: {params: Props}) => {
  const anomaly = getAnomalyData(props.params)

  return anomaly ? <categoryPathPage.FaireUnSignalementPage anomaly={anomaly} isWebView={true} /> : notFound()
}

export default Page
