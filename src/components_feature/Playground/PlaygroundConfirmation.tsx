import {useTheme} from '@mui/material'
import {allAnomalies} from 'anomalies/Anomalies'
import {StepNavigation} from 'components_simple/ReportFlowStepper/ReportFlowStepper'
import {styleUtils} from 'core/theme'
import {firstReportStep} from 'model/ReportStep'
import {useEffect, useState} from 'react'
import {Anomaly} from '../../anomalies/Anomaly'
import {ReportDraft} from '../../model/ReportDraft'
import {Fixture, SeedableRandom} from '../../test/fixture'
import {_Confirmation} from '../Report/Confirmation/Confirmation'

export const dummyStepNavigation: StepNavigation = {
  currentStep: firstReportStep,
  goTo: () => {},
  next: () => {},
  prev: () => {},
}

export const PlaygroundConfirmation = () => {
  const [draft] = useState<ReportDraft>(Fixture.genDraftReport('Confirmation', new SeedableRandom(1)) as ReportDraft)
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
          }}
          isWebView={false}
          stepNavigation={dummyStepNavigation}
        />
      )}
    </>
  )
}
