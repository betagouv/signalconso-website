import {useTheme} from '@mui/material'
import {allAnomalies} from 'anomaly/Anomalies'
import {ReportStep} from 'core/reportStep'
import {styleUtils} from 'core/theme/theme'
import {useEffect, useState} from 'react'
import {Anomaly} from '../../anomaly/Anomaly'
import {ReportDraft} from '../../client/report/ReportDraft'
import {Fixture} from '../../test/fixture'
import {_Confirmation} from '../Report/Confirmation/Confirmation'

export const PlaygroundConfirmation = () => {
  const [draft, setDraft] = useState<ReportDraft>(Fixture.genDraftReport(ReportStep.Confirmation) as ReportDraft)
  const [anomaly, setAnomaly] = useState<Anomaly | undefined>()
  const theme = useTheme()
  useEffect(() => {
    setAnomaly(allAnomalies.find(_ => _.category === draft.category)!)
  }, [])
  return (
    <>
      <div>
        <b>{anomaly?.category}</b>
      </div>
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
