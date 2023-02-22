import {useAnalyticContext} from 'analytic/AnalyticContext'
import {ReportFlowStepper} from 'components_simple/ReportFlowStepper/ReportFlowStepper'
import {getAnalyticsForStep, ReportStep} from 'model/ReportStep'
import React from 'react'
import {Anomaly} from '../../anomalies/Anomaly'

interface Props {
  initialStep: ReportStep
  anomaly: Anomaly
  isWebView: boolean
}

export const ReportFlow = ({initialStep, anomaly, isWebView}: Props) => {
  const _analytics = useAnalyticContext()
  return (
    <ReportFlowStepper
      {...{initialStep, anomaly, isWebView}}
      onStepChange={step => {
        const {path, title} = getAnalyticsForStep(step)
        _analytics.trackPage(`/${anomaly.path}/${path}`, title)
      }}
    />
  )
}
