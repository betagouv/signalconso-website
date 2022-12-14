import {useApiClients} from 'context/ApiClientsContext'
import {ReportDraft2} from 'model/ReportDraft2'
import React, {Dispatch, ReactNode, SetStateAction, useContext, useState} from 'react'
import {useFetcher, UseFetcher} from '../../hooks/useFetcher'
import {SignalConsoApiClient} from '../../clients/SignalConsoApiClient'

interface ReportFlowContextProps {
  reportDraft: Partial<ReportDraft2>
  setReportDraft: Dispatch<SetStateAction<Partial<ReportDraft2>>>
  clearReportDraft: () => void
  createReport: UseFetcher<SignalConsoApiClient['createReport']>
}

const ReportFlowContext = React.createContext<ReportFlowContextProps>({} as ReportFlowContextProps)

interface ReportFlowProviderProps {
  children: ReactNode
}

export const ReportFlowProvider = ({children}: ReportFlowProviderProps) => {
  const {signalConsoApiClient} = useApiClients()
  const [reportDraft, setReportDraft] = useState<Partial<ReportDraft2>>({})
  const createReport = useFetcher(signalConsoApiClient.createReport)
  return (
    <ReportFlowContext.Provider
      value={{
        reportDraft,
        setReportDraft,
        clearReportDraft: () => {
          setReportDraft({})
        },
        createReport,
      }}
    >
      {children}
    </ReportFlowContext.Provider>
  )
}

export const useReportFlowContext = (): ReportFlowContextProps => {
  return useContext<ReportFlowContextProps>(ReportFlowContext)
}
