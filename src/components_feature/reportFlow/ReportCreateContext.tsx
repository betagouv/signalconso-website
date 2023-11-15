import {UseMutationResult, useMutation} from '@tanstack/react-query'
import {useApiClients} from '@/context/ApiClientsContext'
import {CreatedReport} from '@/model/CreatedReport'
import {ReportDraft} from '@/model/ReportDraft'
import {ApiReportDraft} from '@/model/reportsFromApi'
import React, {ReactNode, useContext} from 'react'

interface ReportCreateContextProps {
  createReportMutation: UseMutationResult<CreatedReport, unknown, ReportCreationArgs, unknown>
}

const context = React.createContext<ReportCreateContextProps>({} as ReportCreateContextProps)

type ReportCreationArgs = {draft: ReportDraft; metadata: ApiReportDraft['metadata']}

export const ReportCreateProvider = ({children}: {children: ReactNode}) => {
  const {signalConsoApiClient} = useApiClients()
  const createReportMutation = useMutation({
    mutationFn: ({draft, metadata}: ReportCreationArgs) => {
      return signalConsoApiClient.createReport(draft, metadata)
    },
  })
  return (
    <context.Provider
      value={{
        createReportMutation,
      }}
    >
      {children}
    </context.Provider>
  )
}

export const useReportCreateContext = (): ReportCreateContextProps => {
  return useContext<ReportCreateContextProps>(context)
}
