import {CompanyKind} from '@/anomalies/Anomaly'
import {ConsumerWish, Report} from '@/model/Report'
import React, {ReactNode, useCallback, useContext, useRef, useState} from 'react'
import {useAnalyticContext} from '../../analytic/AnalyticContext'
import {EventCategories, ReportEventActions} from '../../analytic/analytic'
import {ReportStepOrDone, getIndexForStepOrDone} from '../../model/ReportStep'

export type SetReport = (fn: (_: PartialReport) => PartialReport) => void
export type SendReportEvent = (_: ReportStepOrDone) => void
interface ReportFlowContextProps {
  report: PartialReport
  setReport: SetReport
  setEmployeeConsumer: (_: boolean) => void
  setCompanyKindOverride: (_: CompanyKind) => void
  setConsumerWish: (_: ConsumerWish) => void
  resetFlow: () => void
  sendReportEvent: SendReportEvent
}

// While the report is being built,
// some (or all) the fields may be missing, depending on the current step.
// We type it like if everything could be missing all the time
export type PartialReport = Partial<Omit<Report, 'step1'>> & {
  // Step1 is different, it gets saved partially at each sub-step
  step1?: Partial<Report['step1']>
}

const ReportFlowContext = React.createContext<ReportFlowContextProps>({} as ReportFlowContextProps)

export const ReportFlowProvider = ({
  children,
  initialReportForTests,
}: {
  children: ReactNode
  initialReportForTests?: PartialReport
}) => {
  const _analytic = useAnalyticContext()
  const [report, setReport] = useState<PartialReport>(initialReportForTests ?? {})
  const currentStep = useRef<ReportStepOrDone | undefined>(undefined)
  // useEffect(() => {
  //   console.log('@@@', report)
  // }, [report])
  /**
   * Will send event at each step of the report workflow. The event must be unique, ie if a user decides to edit a previous step no step event will be triggered again
   * @param newStep
   */
  const sendReportEvent = (newStep: ReportStepOrDone) => {
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
  }
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
  return (
    <ReportFlowContext.Provider
      value={{
        report,
        setReport,
        setEmployeeConsumer,
        setCompanyKindOverride,
        setConsumerWish,
        resetFlow: () => {
          setReport({})
          currentStep.current = undefined
        },
        sendReportEvent,
      }}
    >
      {children}
    </ReportFlowContext.Provider>
  )
}

export const useReportFlowContext = (): ReportFlowContextProps => {
  return useContext<ReportFlowContextProps>(ReportFlowContext)
}
