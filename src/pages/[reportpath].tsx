import {GetStaticPaths, GetStaticProps} from 'next'
import {apiSdk} from '../core/apiSdk'
import {useRouter} from 'next/router'
import {serialiseJsonForStupidNextJs} from '../core/helper/utils'
import {Anomaly, ReportDraft} from '@signal-conso/signalconso-api-sdk-js'
import {Page} from 'mui-extension/lib'
import {ReportFlow} from '../feature/Report/ReportFlow'
import {useReportFlowContext} from '../feature/Report/ReportFlowContext'
import {useMemo} from 'react'

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
    props: serialiseJsonForStupidNextJs({
      anomaly,
      category: anomaly!.category,
    }),
  }
}

const stepDone = (r: Partial<ReportDraft>) => ({
  problem: !!r.category && !!r.subcategories && !!r.contractualDispute !== undefined && r.employeeConsumer !== undefined,
  description: !!r.detailInputValues,
  company: !!r.companyDraft?.siret || !!r.companyDraft?.address.postalCode,
  consumer: !!r.consumer?.email && !!r.consumer?.firstName && !!r.consumer?.lastName,
})

export default ({anomaly, category}: {anomaly: Anomaly, category: string}) => {
  const router = useRouter()
  const _reportFlow = useReportFlowContext()
  const initialStep = useMemo(() => {
    console.log('stepDone', stepDone(_reportFlow.reportDraft))
    if (category === _reportFlow.reportDraft.category) {
      const values = Object.values(stepDone(_reportFlow.reportDraft))
      const index = values.findIndex(_ => !_)
      return index > -1 ? index : values.length - 1
    }
    return 0
  }, [])

  return (
    <Page style={{paddingTop: 16, paddingBottom: 16}}>
      <ReportFlow initialStep={initialStep} anomaly={anomaly} category={category}/>
    </Page>
  )
}

