import {GetStaticPaths, GetStaticProps} from 'next'
import {apiSdk} from '../core/apiSdk'
import {useRouter} from 'next/router'
import {serialiseJsonForStupidNextJs} from '../core/helper/utils'
import {useState} from 'react'
import {Anomaly} from '@signal-conso/signalconso-api-sdk-js'
import {Stepper} from '../shared/Stepper/Stepper'
import {Description} from '../feature/Report/Description'
import {Problem} from '../feature/Report/Problem/Problem'
import {Page} from 'mui-extension/lib/Page'
import {messages} from '../conf/messages'
import {ReportFlowProvider} from '../feature/Report/ReportFlowContext'

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
      m: messages
    }),
  }
}

export default ({anomaly, m}: {anomaly: Anomaly, m: typeof messages}) => {
  const router = useRouter()
  const {reportpath} = router.query
  const [path, setPath] = useState([])
  return (
    <Page>
      <ReportFlowProvider>
        <Stepper steps={[
          {name: 'problem', label: m.step_problem, component: () => <Problem m={m} anomaly={anomaly}/>},
          {name: 'description', label: m.step_description, component: Description},
          {name: 'company', label: m.step_company, component: Description},
          {name: 'consumer', label: m.step_consumer, component: Description},
          {name: 'confirm', label: m.step_confirm, component: Description},
        ]}/>
      </ReportFlowProvider>
    </Page>
  )
}

