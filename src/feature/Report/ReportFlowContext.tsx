import {ReportDraft} from '@signal-conso/signalconso-api-sdk-js'
import React, {Dispatch, ReactNode, SetStateAction, useContext, useEffect} from 'react'
import {usePersistentState} from 'react-persistent-state'

interface ReportFlowContext {
  reportDraft: Partial<ReportDraft>
  setReportDraft: Dispatch<SetStateAction<Readonly<Partial<ReportDraft>>>>
}

const ReportFlowContext = React.createContext<ReportFlowContext>({} as ReportFlowContext)

interface ReportFlowProviderProps {
  children: ReactNode
}

export const ReportFlowProvider = ({children}: ReportFlowProviderProps) => {
  const [reportDraft, setReportDraft, clear] = usePersistentState<Partial<ReportDraft>>({}, 'report-draft')
  return (
    <ReportFlowContext.Provider value={{
      reportDraft,
      setReportDraft
    }}>
      {children}
    </ReportFlowContext.Provider>
  )
}

export const useReportFlowContext = (): ReportFlowContext => {
  return useContext<ReportFlowContext>(ReportFlowContext)
}
