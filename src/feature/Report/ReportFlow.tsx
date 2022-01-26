import {Stepper} from '../../shared/Stepper/Stepper'
import {Problem} from './Problem/Problem'
import {Details} from './Details/Details'
import {Company} from './Company/Company'
import {useI18n} from '../../core/i18n'
import {Anomaly} from '@signal-conso/signalconso-api-sdk-js'
import {Consumer} from './Consumer/Consumer'
import {Confirmation} from './Confirmation/Confirmation'
import React from 'react'
import {Done} from './Done/Done'

interface Props {
  initialStep: number
  anomaly: Anomaly
  category: string
}

export const ReportFlow = React.memo(({initialStep, anomaly, category}: Props) => {
  const {m} = useI18n()
  return (
    <Stepper initialStep={initialStep} renderDone={Done} steps={[
      {name: 'problem', label: m.step_problem, component: () => <Problem anomaly={anomaly} category={category} animatePanel={true} autoScrollToPanel={true}/>},
      {name: 'description', label: m.step_description, component: () => <Details/>},
      {name: 'company', label: m.step_company, component: () => <Company animatePanel={true} autoScrollToPanel={true}/>},
      {name: 'consumer', label: m.step_consumer, component: () => <Consumer/>},
      {name: 'confirm', label: m.step_confirm, component: () => <Confirmation/>},
    ]}/>
  )
})
