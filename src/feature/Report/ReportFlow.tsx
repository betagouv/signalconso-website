import {ReportFlowProvider} from './ReportFlowContext'
import {Stepper} from '../../shared/Stepper/Stepper'
import {Problem} from './Problem/Problem'
import {Details} from './Details/Details'
import {Company} from './Company/Company'
import {useI18n} from '../../core/i18n'
import {Category} from '@signal-conso/signalconso-api-sdk-js'
import {Consumer} from './Consumer/Consumer'
import {Confirmation} from './Confirmation/Confirmation'

interface Props {
  anomaly: Category
}

export const ReportFlow = ({anomaly}: Props) => {
  const {m} = useI18n()
  return (
    <ReportFlowProvider>
      <Stepper initialStep={4} steps={[
        {name: 'problem', label: m.step_problem, component: () => <Problem anomaly={anomaly} animatePanel={true} autoScrollToPanel={true}/>},
        {name: 'description', label: m.step_description, component: () => <Details/>},
        {name: 'company', label: m.step_company, component: () => <Company animatePanel={true} autoScrollToPanel={true}/>},
        {name: 'consumer', label: m.step_consumer, component: () => <Consumer/>},
        {name: 'confirm', label: m.step_confirm, component: <Confirmation/>},
      ]}/>
    </ReportFlowProvider>
  )
}
