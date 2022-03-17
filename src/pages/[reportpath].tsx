import {GetStaticPaths, GetStaticProps} from 'next'
import {apiSdk} from 'core/apiSdk'
import {serializeJsonForStupidNextJs} from 'core/helper/utils'
import {Anomaly} from '@signal-conso/signalconso-api-sdk-js'
import {ReportFlow} from 'feature/Report/ReportFlow'
import {useReportFlowContext} from 'feature/Report/ReportFlowContext'
import {useMemo} from 'react'
import {Page} from 'shared/Page/Page'
import {ReportDraft2} from 'core/model/ReportDraft'
import {ReportStepHelper} from '../core/reportStep'

export const getStaticPaths: GetStaticPaths = async () => {
  const anomalies = await apiSdk.anomaly.getAnomalies()
  const paths = anomalies.filter(_ => !_.hidden).map(_ => ({
    params: {reportpath: _.path},
  }))
  return {paths, fallback: false}
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const anomaly = await apiSdk.anomaly.getAnomalies().then(res => res
    .find(_ => _.path === params!.reportpath)
  )

  return {
    props: serializeJsonForStupidNextJs({anomaly,}),
  }
}

const AnomalyPage = ({anomaly}: {anomaly: Anomaly}) => {
  const _reportFlow = useReportFlowContext()
  const initialStep = useMemo(() => {
    if (anomaly.category === _reportFlow.reportDraft.category) {
      return ReportStepHelper.reportCurrentStep(_reportFlow.reportDraft)
    }
    return 0
  }, [])

  return (
    <Page>
      <ReportFlow initialStep={initialStep} anomaly={anomaly}/>
    </Page>
  )
}

export default AnomalyPage

