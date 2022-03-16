import {GetStaticPaths, GetStaticProps} from 'next'
import {apiSdk} from '../core/apiSdk'
import {serialiseJsonForStupidNextJs} from '../core/helper/utils'
import {Anomaly, ReportDraft} from '@signal-conso/signalconso-api-sdk-js'
import {ReportFlow} from '../feature/Report/ReportFlow'
import {useReportFlowContext} from '../feature/Report/ReportFlowContext'
import {useMemo} from 'react'
import {Page} from '../shared/Page/Page'
import {ReportDraft2} from '../core/model/ReportDraft'

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
    props: serialiseJsonForStupidNextJs({anomaly,}),
  }
}

export const reportStepDone = (r: Partial<ReportDraft2>) => ({
  problem: !!r.category && !!r.subcategories && !!r.contractualDispute !== undefined && r.employeeConsumer !== undefined,
  description: !!r.details,
  company: !!r.companyDraft?.siret || !!r.companyDraft?.address.postalCode,
  consumer: !!r.consumer?.email && !!r.consumer?.firstName && !!r.consumer?.lastName,
})

export const reportCurrentStep = (r: Partial<ReportDraft2>): number => {
  const values = Object.values(reportStepDone(r))
  const index = values.findIndex(_ => !_)
  return index > -1 ? index : values.length - 1
}

const AnomalyPage = ({anomaly}: {anomaly: Anomaly}) => {
  const _reportFlow = useReportFlowContext()
  const initialStep = useMemo(() => {
    if (anomaly.category === _reportFlow.reportDraft.category) {
      return reportCurrentStep(_reportFlow.reportDraft)
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

