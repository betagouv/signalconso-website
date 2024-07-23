import {CompanyKind} from 'shared/anomalies/Anomaly'
import {appConfig} from '@/core/appConfig'
import {ConsumerWish, Report} from '@/model/Report'
import React, {ReactNode, useCallback, useContext, useEffect, useRef, useState} from 'react'
import {useAnalyticContext} from '../../analytic/AnalyticContext'
import {EventCategories, ReportEventActions} from '../../analytic/analytic'
import {ReportStepOrDone, getIndexForStepOrDone} from '../../model/ReportStep'

interface ReportFlowContextShape {
  report: PartialReport
  setReport: SetReport
  setEmployeeConsumer: (_: boolean) => void
  setCompanyKindOverride: (_: CompanyKind) => void
  setConsumerWish: (_: ConsumerWish) => void
  resetReport: () => void
  sendReportEvent: SendReportEvent
}
export type SetReport = (fn: (_: PartialReport) => PartialReport) => void
export type SendReportEvent = (_: ReportStepOrDone) => void
// While the report is being built,
// some (or all) the fields may be missing, depending on the current step.
// We type it like if everything could be missing all the time
export type PartialReport = Partial<Omit<Report, 'step1'>> & {
  // Step1 is different, it gets saved partially at each sub-step
  step1?: Partial<Report['step1']>
}

const reportFlowContext = React.createContext<ReportFlowContextShape>(null as any)

export const ReportFlowProvider = ({
  children,
  initialReportForTests,
}: {
  children: ReactNode
  initialReportForTests?: PartialReport
}) => {
  const [report, setReport] = useState<PartialReport>(initialReportForTests ?? {})
  const {resetReportEvents, sendReportEvent} = useReportEvents()
  const convenientSetters = useConvenientSetters(setReport, resetReportEvents)
  useLogOfReportChanges(report)
  return (
    <reportFlowContext.Provider
      value={{
        report,
        setReport,
        ...convenientSetters,
        sendReportEvent,
      }}
    >
      {children}
    </reportFlowContext.Provider>
  )
}

export function useReportFlowContext() {
  return useContext(reportFlowContext)
}

function useReportEvents() {
  const _analytic = useAnalyticContext()
  const currentStep = useRef<ReportStepOrDone | undefined>(undefined)
  /**
   * Will send event at each step of the report workflow. The event must be unique, ie if a user decides to edit a previous step no step event will be triggered again
   */
  const sendReportEvent = useCallback(
    (newStep: ReportStepOrDone) => {
      if (currentStep.current == undefined || getIndexForStepOrDone(newStep) > getIndexForStepOrDone(currentStep.current)) {
        switch (newStep) {
          case 'BuildingProblem':
            _analytic.trackEvent(EventCategories.report, ReportEventActions.validateProblem)
            break
          case 'BuildingCompany':
            _analytic.trackEvent(EventCategories.report, ReportEventActions.validateCompany)
            break
          case 'BuildingDetails':
            _analytic.trackEvent(EventCategories.report, ReportEventActions.validateDetails)
            break
          case 'BuildingConsumer':
            _analytic.trackEvent(EventCategories.report, ReportEventActions.validateConsumer)
            break
          case 'Confirmation':
            _analytic.trackEvent(EventCategories.report, ReportEventActions.validateConfirmation)
            break
          case 'Done':
            _analytic.trackEvent(EventCategories.report, ReportEventActions.reportSendSuccess)
            break
          default:
            break
        }
        currentStep.current = newStep
      }
    },
    [_analytic],
  )
  const resetReportEvents = useCallback(() => {
    currentStep.current = undefined
  }, [])
  return {sendReportEvent, resetReportEvents}
}

function useConvenientSetters(setReport: SetReport, resetReportEvents: () => void) {
  const setEmployeeConsumer = useCallback(
    (value: boolean) => {
      setReport(_ => ({
        ..._,
        step1: {
          ..._.step1,
          employeeConsumer: value,
        },
      }))
    },
    [setReport],
  )
  const setCompanyKindOverride = useCallback(
    (value: CompanyKind) => {
      setReport(_ => ({
        ..._,
        step1: {
          ..._.step1,
          companyKindOverride: value,
        },
      }))
    },
    [setReport],
  )
  const setConsumerWish = useCallback(
    (value: ConsumerWish) => {
      setReport(_ => ({
        ..._,
        step1: {
          ..._.step1,
          consumerWish: value,
        },
      }))
    },
    [setReport],
  )
  const resetReport = useCallback(() => {
    setReport(_ => ({}))
    resetReportEvents()
  }, [setReport, resetReportEvents])

  return {resetReport, setCompanyKindOverride, setConsumerWish, setEmployeeConsumer}
}

function useLogOfReportChanges(report: PartialReport) {
  useEffect(() => {
    if (appConfig.isDev) {
      console.debug('Report changed', report)
    }
  }, [report])
}
