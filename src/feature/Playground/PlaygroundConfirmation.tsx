import {useEffect, useState} from 'react'
import {Anomaly, ReportDraft} from '@signal-conso/signalconso-api-sdk-js'
import {_Confirmation} from '../Report/Confirmation/Confirmation'
import {genDraftReport} from '../../test/fixture'
import {ReportStep} from '../../core/reportStep'
import {apiSdk} from '../../core/apiSdk'

export const PlaygroundConfirmation = () => {
  const [draft, setDraft] = useState<ReportDraft>(genDraftReport(ReportStep.Confirmation) as ReportDraft)
  const [anomaly, setAnomaly] = useState<Anomaly | undefined>()
  useEffect(() => {
    apiSdk.anomaly.getAnomalies().then(_ => setAnomaly(_[0]))
  }, [])
  return (
    <>
      <pre>{JSON.stringify(draft, undefined, 2)}</pre>
      {anomaly && (
        <_Confirmation
          anomaly={anomaly}
          draft={{
            ...draft,
            // companyKind: CompanyKinds.LOCATION
          }}
        />
      )}
    </>
  )
}
