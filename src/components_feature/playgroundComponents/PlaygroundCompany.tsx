import {Report} from '@/model/Report'
import {useState} from 'react'
import {CompanyKind} from '../../anomalies/Anomaly'
import {CompanyIdentificationDispatch} from '../reportFlow/Company/Company'

interface PlaygroundCompanyProps {
  companyKind?: CompanyKind
  partialReport?: Pick<Report, 'openFf'>
}

export const PlaygroundCompany = ({companyKind = 'SIRET', partialReport: partialReport = {}}: PlaygroundCompanyProps) => {
  const [report, setReport] = useState<Partial<Report>>(partialReport)

  return (
    <>
      <CompanyIdentificationDispatch
        draft={{
          step0: {
            category: 'DemoCategory',
            lang: 'fr',
          },
          subcategoriesIndexes: [0],
          ...partialReport,
        }}
        companyKindForPlayground={companyKind}
        updateReport={x => setReport(x as Partial<Report>)}
      />
      <pre className="text-gray-500 text-sm">{JSON.stringify(report, undefined, 2)}</pre>
    </>
  )
}
