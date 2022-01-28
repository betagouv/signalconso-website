import {Anomaly, ReportDraft} from '@signal-conso/signalconso-api-sdk-js'
import React, {Dispatch, ReactNode, SetStateAction, useContext} from 'react'
import {usePersistentState} from 'react-persistent-state'

export interface ReportDraft2 extends ReportDraft {
  anomaly: Omit<Anomaly, 'subcategories'>
}

export interface ReportFlowContextProps {
  reportDraft: Partial<ReportDraft2>
  setReportDraft: Dispatch<SetStateAction<Readonly<Partial<ReportDraft2>>>>
  clearReportDraft: () => void
}

const ReportFlowContext = React.createContext<ReportFlowContextProps>({} as ReportFlowContextProps)

interface ReportFlowProviderProps {
  children: ReactNode
}

export const ReportFlowProvider = ({children}: ReportFlowProviderProps) => {
  const [reportDraft, setReportDraft, clearReportDraft] = usePersistentState<Partial<ReportDraft2>>({}, 'report-draft')
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
