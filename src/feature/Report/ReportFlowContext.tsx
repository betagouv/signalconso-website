import {Anomaly, ReportDraft} from '@signal-conso/signalconso-api-sdk-js'
import React, {Dispatch, ReactNode, SetStateAction, useContext} from 'react'
import {usePersistentState} from 'react-persistent-state'
import {isSpecifyInputName} from './Details/Details'
import {getDraftReportInputs} from './Details/draftReportInputs'

export type DetailInputValues2 = {[key: string]: string | string[]}

export interface ReportDraft2 extends Omit<ReportDraft, 'detailInputValues'> {
  anomaly: Omit<Anomaly, 'subcategories'>
  detailInputValues: DetailInputValues2
}

export interface ReportFlowContextProps {
  reportDraft: Partial<ReportDraft2>
  setReportDraft: Dispatch<SetStateAction<Readonly<Partial<ReportDraft2>>>>
  clearReportDraft: () => void
}

const ReportFlowContext = React.createContext<ReportFlowContextProps>({} as ReportFlowContextProps)

interface ReportFlowProviderProps {
  children: ReactNode
  initialReport?: Partial<ReportDraft2>
}

const parseReportDrapft = (d: ReportDraft2) => {
  const inputs = getDraftReportInputs({subcategories: d.subcategories, tags: d.tags})
  const parsed = Object.keys(d.detailInputValues)
    .filter(_ => !isSpecifyInputName(_))
    .map(index => {
      const label = inputs[+index].label
      // let value = d.detailInputValues[index]
      // if (value.includes(specifyKeyword)) {
      //   value = value.replace(specifyKeyword, `(${values[getSpecifyInputName(+index)]})`)
      // }
      // return {label, value}
    })
}
export const ReportFlowProvider = ({initialReport, children}: ReportFlowProviderProps) => {
  const [reportDraft, setReportDraft, clearReportDraft] = usePersistentState<Partial<ReportDraft2>>(initialReport ?? {}, 'report-draft')
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
