import {Report} from '@/model/Report'
import React, {ReactNode, useContext, useRef, useState} from 'react'
import {useAnalyticContext} from '../../analytic/AnalyticContext'
import {EventCategories, ReportEventActions} from '../../analytic/analytic'
import {ReportStepOrDone, getIndexForStepOrDone} from '../../model/ReportStep'

export type SetReport = (fn: (_: Partial<Report>) => Partial<Report>) => void
export type SendReportEvent = (_: ReportStepOrDone) => void
interface ReportFlowContextProps {
  report: Partial<Report>
  setReport: SetReport
  resetFlow: () => void
  sendReportEvent: SendReportEvent
}

const ReportFlowContext = React.createContext<ReportFlowContextProps>({} as ReportFlowContextProps)

export const ReportFlowProvider = ({
  children,
  initialReportForTests,
}: {
  children: ReactNode
  initialReportForTests?: Partial<Report>
}) => {
  const _analytic = useAnalyticContext()
  const [report, setReport] = useState<Partial<Report>>(initialReportForTests ?? {})
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
