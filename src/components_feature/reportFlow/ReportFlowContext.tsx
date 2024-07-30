import {ReportDraft2} from '@/model/ReportDraft2'
import React, {ReactNode, useContext, useRef, useState} from 'react'
import {useAnalyticContext} from '../../analytic/AnalyticContext'
import {EventCategories, ReportEventActions} from '../../analytic/analytic'
import {ReportStepOrDone, getIndexForStepOrDone} from '../../model/ReportStep'

export type SetReportDraft = (fn: (_: Partial<ReportDraft2>) => Partial<ReportDraft2>) => void
interface ReportFlowContextProps {
  reportDraft: Partial<ReportDraft2>
  setReportDraft: SetReportDraft
  resetFlow: () => void
  sendReportEvent: (_: ReportStepOrDone) => void
}

const ReportFlowContext = React.createContext<ReportFlowContextProps>({} as ReportFlowContextProps)

export const ReportFlowProvider = ({
  children,
  initialReportForTests,
}: {
  children: ReactNode
  initialReportForTests?: Partial<ReportDraft2>
}) => {
  const _analytic = useAnalyticContext()
  const [reportDraft, setReportDraft] = useState<Partial<ReportDraft2>>(initialReportForTests ?? {})
  const currentStep = useRef<ReportStepOrDone | undefined>(undefined)

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
        reportDraft,
        setReportDraft,
        resetFlow: () => {
          setReportDraft({})
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
