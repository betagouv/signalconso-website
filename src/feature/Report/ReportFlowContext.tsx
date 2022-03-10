import React, {Dispatch, ReactNode, SetStateAction, useContext} from 'react'
import {usePersistentState} from 'react-persistent-state'
import {isSpecifyInputName} from './Details/Details'
import {getDraftReportInputs} from './Details/draftReportInputs'
import {ReportDraft2} from '../../core/model/ReportDraft'
import {DeepPartial} from '@alexandreannic/ts-utils'

export interface ReportFlowContextProps {
  reportDraft: DeepPartial<ReportDraft2>
  setReportDraft: Dispatch<SetStateAction<DeepPartial<ReportDraft2>>>
  clearReportDraft: () => void
}

const ReportFlowContext = React.createContext<ReportFlowContextProps>({} as ReportFlowContextProps)

interface ReportFlowProviderProps {
  children: ReactNode
  initialReport?: Partial<ReportDraft2>
}

export const ReportFlowProvider = ({initialReport, children}: ReportFlowProviderProps) => {
  const [reportDraft, setReportDraft, clearReportDraft] = usePersistentState<DeepPartial<ReportDraft2>>(initialReport ?? {}, 'report-draft')
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
