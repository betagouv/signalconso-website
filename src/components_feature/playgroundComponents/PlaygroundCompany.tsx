import {ReportDraft} from '@/model/ReportDraft'
import {useState} from 'react'
import {CompanyKind} from '../../anomalies/Anomaly'
import {CompanyIdentificationDispatch} from '../reportFlow/Company/Company'

interface PlaygroundCompanyProps {
  companyKind?: CompanyKind
  partialReportDraft?: Pick<ReportDraft, 'openFf'>
}

export const PlaygroundCompany = ({companyKind = 'SIRET', partialReportDraft = {}}: PlaygroundCompanyProps) => {
  const [report, setReport] = useState<Partial<ReportDraft>>(partialReportDraft)

  return (
    <>
      <CompanyIdentificationDispatch
        draft={{
          step0: {
            category: 'DemoCategory',
            lang: 'fr',
          },
          subcategoriesIndexes: [0],
          ...partialReportDraft,
        }}
        companyKindForPlayground={companyKind}
        updateReport={x => setReport(x as Partial<ReportDraft>)}
      />
      <pre className="text-gray-500 text-sm">{JSON.stringify(report, undefined, 2)}</pre>
    </>
  )
}
