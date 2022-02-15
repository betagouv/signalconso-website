import {_Company} from '../Report/Company/Company'
import {useState} from 'react'
import {CompanyKinds, ReportDraft} from '@signal-conso/signalconso-api-sdk-js'

export const PlaygroundCompany = () => {
  const [company, setCompany] = useState<Partial<ReportDraft>>({})
  return (
    <>
      {JSON.stringify(company)}
      <_Company
        draft={{
          companyKind: CompanyKinds.LOCATION
        }}
        onUpdateReportDraft={setCompany}
      />
    </>
  )
}
