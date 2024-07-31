import {Report} from '@/model/Report'
import {useState} from 'react'
import {CompanyKind} from '../../anomalies/Anomaly'
import {CompanyIdentificationDispatch} from '../reportFlow/Company/Company'
import {PartialReport} from '../reportFlow/ReportFlowContext'

interface PlaygroundCompanyProps {
  companyKind?: CompanyKind
  reportOpenFf?: Report['step1']['openFf']
}

export const PlaygroundCompany = ({companyKind = 'SIRET', reportOpenFf: openFf}: PlaygroundCompanyProps) => {
  const [report, setReport] = useState<PartialReport>({
    step1: openFf ? {openFf} : undefined,
  })

  return (
    <>
      <CompanyIdentificationDispatch
        draft={{
          step0: {
            category: 'DemoCategory',
            lang: 'fr',
          },
          step1: {
            ...(openFf ? {openFf} : undefined),
            subcategoriesIndexes: [0],
            employeeConsumer: false,
            consumerWish: 'companyImprovement',
          },
        }}
        companyKindForPlayground={companyKind}
        updateReport={x => setReport(x as PartialReport)}
      />
      <pre className="text-gray-500 text-sm">{JSON.stringify(report, undefined, 2)}</pre>
    </>
  )
}
