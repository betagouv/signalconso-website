import {Report} from '@/model/Report'
import {useState} from 'react'
import {CompanyKind} from 'shared/anomalies/Anomaly'
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

  function pickSubcategoriesIndexes() {
    switch (companyKind) {
      case 'SIRET':
        return [5, 0]
      case 'WEBSITE':
        return [5, 1]
      case 'MERCHANT_WEBSITE':
        return [5, 2]
      case 'TRANSPORTER_WEBSITE':
        return [5, 3]
      case 'PHONE':
        return [5, 4]
      case 'LOCATION':
        return [5, 5]
      case 'SOCIAL':
        return [5, 6]
      case 'PRODUCT':
        return [5, 7]
      case 'TRAIN':
        return [5, 8]
      case 'STATION':
        return [5, 9]
      default:
        throw new Error(`Unsupported companyKind here, no demo subcategory for it : ${companyKind}`)
    }
  }

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
            subcategoriesIndexes: pickSubcategoriesIndexes(),
            employeeConsumer: false,
            consumerWish: 'companyImprovement',
          },
        }}
        updateReport={x => setReport(x as PartialReport)}
      />
      <pre className="text-gray-500 text-sm">{JSON.stringify(report, undefined, 2)}</pre>
    </>
  )
}
