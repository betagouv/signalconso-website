import {ReportDraft} from '@signal-conso/signalconso-api-sdk-js'
import React, {Dispatch, ReactNode, SetStateAction, useContext} from 'react'
import {usePersistentState} from 'react-persistent-state'

interface ReportFlowContext {
  reportDraft: Partial<ReportDraft>
  setReportDraft: Dispatch<SetStateAction<Readonly<Partial<ReportDraft>>>>
  clearReportDraft: () => void
}

const ReportFlowContext = React.createContext<ReportFlowContext>({} as ReportFlowContext)

interface ReportFlowProviderProps {
  children: ReactNode
}

export const ReportFlowProvider = ({children}: ReportFlowProviderProps) => {
  const [reportDraft, setReportDraft, clearReportDraft] = usePersistentState<Partial<ReportDraft>>({}, 'report-draft')
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

export const useReportFlowContext = (): ReportFlowContext => {
  return useContext<ReportFlowContext>(ReportFlowContext)
}
