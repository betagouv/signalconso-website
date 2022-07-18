import {Stepper} from 'shared/Stepper/Stepper'
import {Problem} from './Problem/Problem'
import {Details} from './Details/Details'
import {Company} from './Company/Company'
import {useI18n} from 'core/i18n'
import {Consumer} from './Consumer/Consumer'
import {Confirmation} from './Confirmation/Confirmation'
import React from 'react'
import {Acknowledgement} from './Acknowledgement/Acknowledgement'
import {ReportStep} from 'core/reportStep'
import {useAnalyticContext} from 'core/analytic/AnalyticContext'
import {Anomaly} from '../../anomaly/Anomaly'

interface Props {
  initialStep: number
  anomaly: Anomaly
}

export enum ReportStepperPath {
  Problem = 'le-probleme',
  Details = 'la-description',
  Company = 'le-commerçant',
  Consumer = 'le-consommateur',
  Confirmation = 'confirmation',
  Acknowledgment = 'accuse-de-reception',
  Information = 'information',
}

export enum ReportStepperTitle {
  Problem = `Étape 1: Le problème - SignalConso`,
  Details = `Étape 2: La description - SignalConso`,
  Company = `Étape 3: L'entreprise - SignalConso`,
  Consumer = `Étape 4: Le consommateur - SignalConso`,
  Confirmation = `Étape 5: Confirmation - SignalConso`,
  Information = `Information - SignalConso`,
}

export const ReportFlow = React.memo(({initialStep, anomaly}: Props) => {
  const _analytics = useAnalyticContext()
  const {m} = useI18n()
  return (
    <Stepper
      initialStep={initialStep}
      renderDone={Acknowledgement}
      onStepChange={(props, index) => {
        const path = Object.values(ReportStepperPath)[index]
        const title = Object.values(ReportStepperTitle)[index]
        _analytics.trackPage(`/${anomaly.path}/${path}`, title)
      }}
      steps={[
        {
          name: ReportStep.Problem,
          label: m.step_problem,
          component: () => <Problem anomaly={anomaly} />,
        },
        {
          name: ReportStep.Details,
          label: m.step_description,
          component: () => <Details />,
        },
        {
          name: ReportStep.Company,
          label: m.step_company,
          component: () => <Company />,
        },
        {
          name: ReportStep.Consumer,
          label: m.step_consumer,
          component: () => <Consumer />,
        },
        {
          name: ReportStep.Confirmation,
          label: m.step_confirm,
          component: () => <Confirmation />,
        },
      ]}
    />
  )
})
