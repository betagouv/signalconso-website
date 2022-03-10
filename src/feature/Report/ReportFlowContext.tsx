import React, {Dispatch, ReactNode, SetStateAction, useContext} from 'react'
import {usePersistentState} from 'react-persistent-state'
import {ReportDraft2} from '../../core/model/ReportDraft'

export interface ReportFlowContextProps {
  reportDraft: Partial<ReportDraft2>
  setReportDraft: Dispatch<SetStateAction<Partial<ReportDraft2>>>
  clearReportDraft: () => void
}

const ReportFlowContext = React.createContext<ReportFlowContextProps>({} as ReportFlowContextProps)

interface ReportFlowProviderProps {
  children: ReactNode
  initialReport?: Partial<ReportDraft2>
}

export const ReportFlowProvider = ({initialReport, children}: ReportFlowProviderProps) => {
  const [reportDraft, setReportDraft, clearReportDraft] = usePersistentState<Partial<ReportDraft2>>(initialReport ?? {}, 'report-draft')
  return (
    <ReportFlowContext.Provider value={{
      reportDraft,
      setReportDraft,
      clearReportDraft,
    }}>
      {children}
    </ReportFlowContext.Provider>
  )
}

export const useReportFlowContext = (): ReportFlowContextProps => {
  return useContext<ReportFlowContextProps>(ReportFlowContext)
}
