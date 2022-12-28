import {useAnalyticContext} from 'analytic/AnalyticContext'
import {ReportFlowStepper} from 'components_simple/ReportFlowStepper/ReportFlowStepper'
import {getAnalyticsForStep, ReportStep} from 'model/ReportStep'
import React from 'react'
import {Anomaly} from '../../anomalies/Anomaly'
import {Acknowledgement} from './Acknowledgement/Acknowledgement'

interface Props {
  initialStep: ReportStep
  anomaly: Anomaly
}

export const ReportFlow = React.memo(({initialStep, anomaly}: Props) => {
  const _analytics = useAnalyticContext()
  return (
    <ReportFlowStepper
      initialStep={initialStep}
      anomaly={anomaly}
      onStepChange={step => {
        const {path, title} = getAnalyticsForStep(step)
        _analytics.trackPage(`/${anomaly.path}/${path}`, title)
      }}
      renderDone={Acknowledgement}
    />
  )
})
