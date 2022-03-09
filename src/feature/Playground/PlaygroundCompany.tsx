import {_Company} from '../Report/Company/Company'
import {useState} from 'react'
import {CompanyKinds} from '@signal-conso/signalconso-api-sdk-js'
import {ReportDraft2} from '../../core/model/ReportDraft'

export const PlaygroundCompany = () => {
  const [company, setCompany] = useState<Partial<ReportDraft2>>({})
  return (
    <>
      {JSON.stringify(company)}
      <_Company
        draft={{
          companyKind: CompanyKinds.WEBSITE
        }}
        onUpdateReportDraft={setCompany}
      />
    </>
  )
}
