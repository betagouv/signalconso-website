import {GetStaticPaths, GetStaticProps} from 'next'
import {apiSdk} from '../core/apiSdk'
import {useRouter} from 'next/router'
import {serialiseJsonForStupidNextJs} from '../core/helper/utils'
import {Anomaly} from '@signal-conso/signalconso-api-sdk-js'
import {Page} from 'mui-extension/lib'
import {ReportFlow} from '../feature/Report/ReportFlow'

export const getStaticPaths: GetStaticPaths = async () => {
  const anomalies = await apiSdk.anomaly.getAnomalies()
  const paths = anomalies.map(_ => ({
    params: {reportpath: _.path, category: _.category},
  }))
  return {paths, fallback: false}
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const anomaly = await apiSdk.anomaly.getAnomalies().then(res => res
    .filter(_ => !_.hidden)
    .find(_ => _.path === params!.reportpath)
  )
  return {
    props: serialiseJsonForStupidNextJs({
      anomaly,
      category: params!.category,
    }),
  }
}

export default ({anomaly}: {anomaly: Anomaly}) => {
  const router = useRouter()
  return (
    <Page style={{paddingTop: 16, paddingBottom: 16}}>
      <ReportFlow anomaly={anomaly}/>
    </Page>
  )
}

