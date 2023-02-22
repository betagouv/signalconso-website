import {ReportDraft2} from 'model/ReportDraft2'
import React, {Dispatch, ReactNode, SetStateAction, useContext, useState} from 'react'

interface ReportFlowContextProps {
  reportDraft: Partial<ReportDraft2>
  setReportDraft: Dispatch<SetStateAction<Partial<ReportDraft2>>>
  clearReportDraft: () => void
}

const ReportFlowContext = React.createContext<ReportFlowContextProps>({} as ReportFlowContextProps)

export const ReportFlowProvider = ({children}: {children: ReactNode}) => {
  const [reportDraft, setReportDraft] = useState<Partial<ReportDraft2>>({})
  return (
    <ReportFlowContext.Provider
      value={{
        reportDraft,
        setReportDraft,
        clearReportDraft: () => {
          setReportDraft({})
        },
      }}
    >
      {children}
    </ReportFlowContext.Provider>
  )
}

export const useReportFlowContext = (): ReportFlowContextProps => {
  return useContext<ReportFlowContextProps>(ReportFlowContext)
}
