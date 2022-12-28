import {useAnalyticContext} from 'analytic/AnalyticContext'
import {ReportFlowStepper} from 'components_simple/ReportFlowStepper/ReportFlowStepper'
import {getStepIndex, ReportStep, reportSteps} from 'model/ReportStep'
import React from 'react'
import {Anomaly} from '../../anomalies/Anomaly'
import {Acknowledgement} from './Acknowledgement/Acknowledgement'

interface Props {
  initialStep: ReportStep
  anomaly: Anomaly
}

export enum ReportStepPathInAnalytics {
  Problem = 'le-probleme',
  Details = 'la-description',
  Company = 'le-commerçant',
  Consumer = 'le-consommateur',
  Confirmation = 'confirmation',
  Acknowledgment = 'accuse-de-reception',
  Information = 'information',
}

export enum ReportStepTitleInAnalytics {
  Problem = `Étape 1: Le problème - SignalConso`,
  Details = `Étape 2: La description - SignalConso`,
  Company = `Étape 3: L'entreprise - SignalConso`,
  Consumer = `Étape 4: Le consommateur - SignalConso`,
  Confirmation = `Étape 5: Confirmation - SignalConso`,
  Information = `Information - SignalConso`,
}

export const ReportFlow = React.memo(({initialStep, anomaly}: Props) => {
  const _analytics = useAnalyticContext()
  return (
    <ReportFlowStepper
      initialStep={initialStep}
      anomaly={anomaly}
      onStepChange={step => {
        const index = step === 'done' ? reportSteps.length : getStepIndex(step)
        const path = Object.values(ReportStepPathInAnalytics)[index]
        const title = Object.values(ReportStepTitleInAnalytics)[index]
        _analytics.trackPage(`/${anomaly.path}/${path}`, title)
      }}
      renderDone={Acknowledgement}
    />
  )
})
