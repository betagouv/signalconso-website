import {GetStaticPaths, GetStaticProps} from 'next'
import {apiSdk} from '../core/apiSdk'
import {useRouter} from 'next/router'
import {serialiseJsonForStupidNextJs} from '../core/helper/utils'
import {useState} from 'react'
import {Anomaly} from '@signal-conso/signalconso-api-sdk-js'
import {Stepper} from '../shared/Stepper/Stepper'
import {Details} from '../feature/Report/Details/Details'
import {Problem} from '../feature/Report/Problem/Problem'
import {Page} from 'mui-extension/lib'
import {ReportFlowProvider} from '../feature/Report/ReportFlowContext'
import {useI18n} from '../core/i18n'
import {Company} from '../feature/Report/Company/Company'

export const getStaticPaths: GetStaticPaths = async () => {
  const anomalies = await apiSdk.anomaly.getAnomalies()
  const paths = anomalies.map(_ => ({
    params: {reportpath: _.path},
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
    }),
  }
}

export default ({anomaly}: {anomaly: Anomaly}) => {
  const router = useRouter()
  const {reportpath} = router.query
  const [path, setPath] = useState([])
  const {m} = useI18n()
  return (
    <Page style={{paddingTop: 16, paddingBottom: 16}}>
      <ReportFlowProvider>
        <Stepper initialStep={2} steps={[
          {name: 'problem', label: m.step_problem, component: () => <Problem anomaly={anomaly}/>},
          {name: 'description', label: m.step_description, component: () => <Details/>},
          {name: 'company', label: m.step_company, component: () => <Company/>},
          {name: 'consumer', label: m.step_consumer, component: Details},
          {name: 'confirm', label: m.step_confirm, component: Details},
        ]}/>
      </ReportFlowProvider>
    </Page>
  )
}

