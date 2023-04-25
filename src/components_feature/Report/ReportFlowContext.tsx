import {ReportDraft2} from 'model/ReportDraft2'
import React, {ReactNode, useContext, useEffect, useState} from 'react'

interface ReportFlowContextProps {
  reportDraft: Partial<ReportDraft2>
  setReportDraft: (fn: (_: Partial<ReportDraft2>) => Partial<ReportDraft2>) => void
  resetFlow: () => void
}

const ReportFlowContext = React.createContext<ReportFlowContextProps>({} as ReportFlowContextProps)

export const ReportFlowProvider = ({children}: {children: ReactNode}) => {
  const [reportDraft, setReportDraft] = useState<Partial<ReportDraft2>>({})

  useEffect(() => {
    console.log('@@@report draft', reportDraft)
  }, [reportDraft])

  return (
    <ReportFlowContext.Provider
      value={{
        reportDraft,
        setReportDraft,
        resetFlow: () => {
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
