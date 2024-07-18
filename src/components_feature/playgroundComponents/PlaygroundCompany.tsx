import {ReportDraft2} from '@/model/ReportDraft2'
import {useState} from 'react'
import {CompanyKind} from '../../anomalies/Anomaly'
import {CompanyIdentificationDispatch} from '../reportFlow/Company/Company'

interface PlaygroundCompanyProps {
  companyKind?: CompanyKind
  partialReportDraft?: Partial<ReportDraft2>
}

export const PlaygroundCompany = ({companyKind = 'SIRET', partialReportDraft = {}}: PlaygroundCompanyProps) => {
  const [report, setReport] = useState<Partial<ReportDraft2>>(partialReportDraft)

  return (
    <>
      <CompanyIdentificationDispatch
        draft={{
          ...partialReportDraft,
          companyKind,
        }}
        updateReport={x => setReport(x as Partial<ReportDraft2>)}
      />
      <pre className="text-gray-500 text-sm">{JSON.stringify(report, undefined, 2)}</pre>
    </>
  )
}
