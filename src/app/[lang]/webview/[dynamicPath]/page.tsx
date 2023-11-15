import {notFound} from 'next/navigation'
import {allAnomalies} from '../../../../anomalies/Anomalies'
import * as categoryPathPage from '../../../../reusablePages/faireUnSignalementPage'
import {PageComponentProps, PathParams, buildGenerateMetadataForWebviews} from '@/core/metadatas'

type LocalPathParams = PathParams<{
  dynamicPath: string
}>

function getAnomalyData(params: LocalPathParams) {
  const anomaly = allAnomalies(params.lang).find(_ => _.path === params.dynamicPath)
  return anomaly
}

export const generateMetadata = buildGenerateMetadataForWebviews()

const Page = (props: PageComponentProps<LocalPathParams>) => {
  const anomaly = getAnomalyData(props.params)

  return anomaly ? <categoryPathPage.FaireUnSignalementPage anomaly={anomaly} isWebView={true} /> : notFound()
}

export default Page
