import {Stepper} from 'shared/Stepper/Stepper'
import {Problem} from './Problem/Problem'
import {Details} from './Details/Details'
import {Company} from './Company/Company'
import {useI18n} from 'core/i18n'
import {Anomaly} from '@signal-conso/signalconso-api-sdk-js'
import {Consumer} from './Consumer/Consumer'
import {Confirmation} from './Confirmation/Confirmation'
import React from 'react'
import {Acknowledgement} from './Acknowledgement/Acknowledgement'
import {ReportStep} from 'core/reportStep'

interface Props {
  initialStep: number
  anomaly: Anomaly
}

export const ReportFlow = React.memo(({initialStep, anomaly}: Props) => {
  const {m} = useI18n()
  return (
    <Stepper initialStep={initialStep} renderDone={Acknowledgement} steps={[
      {name: ReportStep.Problem, label: m.step_problem, component: () => <Problem anomaly={anomaly}/>},
      {name: ReportStep.Details, label: m.step_description, component: () => <Details/>},
      {name: ReportStep.Company, label: m.step_company, component: () => <Company/>},
      {name: ReportStep.Consumer, label: m.step_consumer, component: () => <Consumer/>},
      {name: ReportStep.Confirmation, label: m.step_confirm, component: () => <Confirmation/>},
    ]}/>
  )
})
