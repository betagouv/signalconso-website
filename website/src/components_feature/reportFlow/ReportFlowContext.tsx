import {appConfig} from '@/core/appConfig'
import {ConsumerWish, Report} from '@/model/Report'
import {Step2Model} from '@/model/Step2Model'
import React, {ReactNode, useCallback, useContext, useEffect, useRef, useState} from 'react'
import {CompanyKind} from 'shared/anomalies/Anomaly'
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
  // This one is just a wrapper for sendReportEvent
  sendStep2ValidationEvent: (_: Step2Model) => void
}
export type SetReport = (fn: (_: PartialReport) => PartialReport) => void
export type SendReportEvent = (_: ReportStepOrDone) => void
// While the report is being built,
// some (or all) the fields may be missing, depending on the current step.
// We type it like if everything could be missing all the time
export type PartialReport = Partial<Omit<Report, 'step1'| 'step4'>> & {
  // Step 1 and 4 are different, they get saved partially at each sub-step
  step1?: Partial<Report['step1']>
  step4?: Partial<Report['step4']>
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
  const {resetReportEvents, sendReportEvent, sendStep2ValidationEvent} = useReportEvents()
  const convenientSetters = useConvenientSetters(setReport, resetReportEvents)
  useLogOfReportChanges(report)
  return (
    <reportFlowContext.Provider
      value={{
        report,
        setReport,
        ...convenientSetters,
        sendReportEvent,
        sendStep2ValidationEvent,
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
    (newStep: ReportStepOrDone, step2?: Step2Model) => {
      if (currentStep.current == undefined || getIndexForStepOrDone(newStep) > getIndexForStepOrDone(currentStep.current)) {
        switch (newStep) {
          case 'BuildingProblem':
            _analytic.trackEvent(EventCategories.report, ReportEventActions.validateProblem)
            break
          case 'BuildingCompany': {
            if (!step2) {
              throw new Error('Cannot track BuildingCompany without step2')
            }
            _analytic.trackEvent(EventCategories.report, ReportEventActions.validateCompany, qualifyStep2ForTracking(step2))
            break
          }
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
  const sendStep2ValidationEvent = useCallback(
    (step2: Step2Model) => {
      sendReportEvent('BuildingCompany', step2)
    },
    [sendReportEvent],
  )
  const resetReportEvents = useCallback(() => {
    currentStep.current = undefined
  }, [])
  return {sendReportEvent, resetReportEvents, sendStep2ValidationEvent}
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

function qualifyStep2ForTracking(
  step2: Step2Model,
): 'Etablissement identifié' | 'Etablissement non identifié' | 'Etablissement étranger' {
  switch (step2.kind) {
    case 'basic':
    case 'phone':
    case 'product':
    case 'website': {
      switch (step2.companyIdentification.kind) {
        case 'companyFound':
        case 'marketplaceCompanyFound':
          return 'Etablissement identifié'
        case 'consumerLocation':
          return 'Etablissement non identifié'
        case 'foreignCompany':
        case 'foreignWebsiteWithJustCountry':
          return 'Etablissement étranger'
      }
    }
    case 'influencerOtherSocialNetwork':
      return 'Etablissement non identifié'
    case 'influencer':
    case 'station':
    case 'train':
      return 'Etablissement identifié'
  }
}
