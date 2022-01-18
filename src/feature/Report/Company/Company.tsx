import {CompanyByWebsite} from './CompanyByWebsite'
import {CompanyKinds, CompanySearchResult} from '@signal-conso/signalconso-api-sdk-js'
import {useReportFlowContext} from '../ReportFlowContext'
import React, {useState} from 'react'
import {CompanyIdentifyBy, IdentifyBy} from './CompanyIdentifyBy'
import {CompanyByNameAndPostalCode} from './CompanyByNameAndPostalCode'
import {CompanyByIdentity} from './CompanyByIdentity'
import {useI18n} from '../../../core/i18n'
import {CompanySearchResultComponent} from './CompanySearchResult'

interface CompanyWithRequiredPropsProps {
  companyKind: CompanyKinds
}

export const Company = ({}) => {
  const _reportFlow = useReportFlowContext()
  const draft = _reportFlow.reportDraft
  if (!draft.companyKind) {
    return (
      <>{JSON.stringify(draft)}</>
    )
  }
  return (
    <>
      <CompanyWithRequiredProps companyKind={draft.companyKind}/>
    </>
  )
}

const CompanyWithRequiredProps = ({companyKind}: CompanyWithRequiredPropsProps) => {
  const [result, setResult] = useState<CompanySearchResult[] | undefined>()
  const [identifyBy, setIdentifyBy] = useState<IdentifyBy | undefined>()
  const {m} = useI18n()

  return (
    <>
      <CompanyByWebsite onSubmit={setResult}/>


      {result === undefined ? (
        <></>
      ) : result.length === 0 ? (
        <CompanyIdentifyBy onChange={setIdentifyBy}/>
      ) : (
        <>
        </>
      )}

      {(() => {
        switch (identifyBy) {
          case IdentifyBy.NAME:
            return <CompanyByNameAndPostalCode/>
          case IdentifyBy.IDENTITY:
            return <CompanyByIdentity onFound={setResult}/>
        }
      })()}

      {result && result.length > 0 && (
        <CompanySearchResultComponent companies={result} onChange={console.log}/>
      )}
    </>
  )
}
