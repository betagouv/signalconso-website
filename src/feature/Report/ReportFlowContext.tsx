import {useApiSdk} from 'core/context/ApiSdk'
import {ReportDraft2} from 'core/model/ReportDraft'
import React, {Dispatch, ReactNode, SetStateAction, useContext, useState} from 'react'
import {useFetcher, UseFetcher} from '../../alexlibs/react-hooks-lib/UseFetcher'
import {SignalConsoPublicSdk} from '../../client/SignalConsoPublicSdk'

interface ReportFlowContextProps {
  reportDraft: Partial<ReportDraft2>
  setReportDraft: Dispatch<SetStateAction<Partial<ReportDraft2>>>
  clearReportDraft: () => void
  createReport: UseFetcher<SignalConsoPublicSdk['createReport']>
}

const ReportFlowContext = React.createContext<ReportFlowContextProps>({} as ReportFlowContextProps)

interface ReportFlowProviderProps {
  children: ReactNode
}

export const ReportFlowProvider = ({children}: ReportFlowProviderProps) => {
  const {apiSdk} = useApiSdk()
  const [reportDraft, setReportDraft] = useState<Partial<ReportDraft2>>({})
  const createReport = useFetcher(apiSdk.createReport)
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
