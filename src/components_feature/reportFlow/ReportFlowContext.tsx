import {Report} from '@/model/Report'
import React, {ReactNode, useContext, useRef, useState} from 'react'
import {useAnalyticContext} from '../../analytic/AnalyticContext'
import {EventCategories, ReportEventActions} from '../../analytic/analytic'
import {ReportStepOrDone, getIndexForStepOrDone} from '../../model/ReportStep'

export type SetReport = (fn: (_: ReportWip) => ReportWip) => void
export type SendReportEvent = (_: ReportStepOrDone) => void
interface ReportFlowContextProps {
  report: ReportWip
  setReport: SetReport
  resetFlow: () => void
  sendReportEvent: SendReportEvent
}

// While the report is being built
// Some (or all) the fields may be missing, depending on the current step
// We type it like if everything could be missing all the time
export type ReportWip = Partial<Report> & {
  // Step1 gets saved partially at each sub-step
  step1?: Partial<Report['step1']>
}

const ReportFlowContext = React.createContext<ReportFlowContextProps>({} as ReportFlowContextProps)

export const ReportFlowProvider = ({
  children,
  initialReportForTests,
}: {
  children: ReactNode
  initialReportForTests?: ReportWip
}) => {
  const _analytic = useAnalyticContext()
  const [report, setReport] = useState<ReportWip>(initialReportForTests ?? {})
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

  return (
    <ReportFlowContext.Provider
      value={{
        report,
        setReport,
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
