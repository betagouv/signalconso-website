import {useEffect, useState} from 'react'
import {Anomaly, ReportDraft} from '@signal-conso/signalconso-api-sdk-js'
import {_Confirmation} from '../Report/Confirmation/Confirmation'
import {ReportStep} from '../../core/reportStep'
import {apiSdk} from '../../core/apiSdk'
import {useTheme} from '@mui/material'
import {styleUtils} from '../../core/theme/theme'
import {Fixture} from '../../test/fixture'

export const PlaygroundConfirmation = () => {
  const [draft, setDraft] = useState<ReportDraft>(Fixture.genDraftReport(ReportStep.Confirmation) as ReportDraft)
  const [anomaly, setAnomaly] = useState<Anomaly | undefined>()
  const theme = useTheme()
  useEffect(() => {
    apiSdk.anomaly.getAnomalies()
      .then(anomalies => anomalies.find(_ => _.category === draft.category)!)
      .then(setAnomaly)
  }, [])
  return (
    <>
      <div><b>{anomaly?.category}</b></div>
      <pre style={{fontSize: styleUtils(theme).fontSize.small, lineHeight: 1.3}}>{JSON.stringify(draft, undefined, 2)}</pre>
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
