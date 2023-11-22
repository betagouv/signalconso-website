import {ReportDraft2} from '@/model/ReportDraft2'
import {useState} from 'react'
import {CompanyKinds, companyKinds} from '../../anomalies/Anomaly'
import {_Company} from '../reportFlow/Company/Company'

export const PlaygroundCompany = () => {
  const [report, setReport] = useState<Partial<ReportDraft2>>({})
  const [companyKind, setCompanyKind] = useState<CompanyKinds>('SIRET')
  return (
    <>
      <div className="border border-dashed p-4 mb-8 bg-gray-100">
        <span>CompanyKind : </span>
        <select
          value={companyKind}
          onChange={e => setCompanyKind(e.target.value as CompanyKinds)}
          className="border border-solid border-black bg-white p-2 text-base"
        >
          {companyKinds.map(_ => (
            <option value={_} key={_}>
              {_}
            </option>
          ))}
        </select>
      </div>

      <_Company
        draft={{
          companyKind,
        }}
        onUpdateReportDraft={x => setReport(x as Partial<ReportDraft2>)}
      />
      <pre className="text-gray-500 text-sm">{JSON.stringify(report, undefined, 2)}</pre>
    </>
  )
}
