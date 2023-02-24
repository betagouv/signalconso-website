import {useApiClients} from 'context/ApiClientsContext'
import React, {ReactNode, useContext} from 'react'
import {SignalConsoApiClient} from '../../clients/SignalConsoApiClient'
import {useFetcher, UseFetcher} from '../../hooks/useFetcher'

interface ReportCreateContextProps {
  createReport: UseFetcher<SignalConsoApiClient['createReport']>
}

const context = React.createContext<ReportCreateContextProps>({} as ReportCreateContextProps)

export const ReportCreateProvider = ({children}: {children: ReactNode}) => {
  const {signalConsoApiClient} = useApiClients()
  const createReport = useFetcher(signalConsoApiClient.createReport)
  return (
    <context.Provider
      value={{
        createReport,
      }}
    >
      {children}
    </context.Provider>
  )
}

export const useReportCreateContext = (): ReportCreateContextProps => {
  return useContext<ReportCreateContextProps>(context)
}
