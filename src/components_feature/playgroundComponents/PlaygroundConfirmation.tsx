import {useTheme} from '@mui/material'
import {allAnomalies} from 'anomalies/Anomalies'
import {StepNavigation} from 'components_feature/reportFlow/reportFlowStepper/ReportFlowStepper'
import {styleUtils} from 'core/theme'
import {firstReportStep} from 'model/ReportStep'
import {useEffect, useState} from 'react'
import {Anomaly} from '../../anomalies/Anomaly'
import {ReportDraft} from '../../model/ReportDraft'
import {Fixture, SeedableRandom} from '../../test/fixture'
import {ConfirmationInner} from '../reportFlow/Confirmation/Confirmation'
import {useI18n} from '../../i18n/I18n'
import {AppLangs} from 'i18n/localization/AppLangs'

export const dummyStepNavigation: StepNavigation = {
  currentStep: firstReportStep,
  goTo: () => {},
  next: () => {},
  prev: () => {},
}

export const PlaygroundConfirmation = () => {
  const {currentLang} = useI18n()
  const [draft] = useState<ReportDraft>(Fixture.genDraftReport(currentLang, 'Confirmation', new SeedableRandom(1)) as ReportDraft)
  const [anomaly, setAnomaly] = useState<Anomaly | undefined>()
  const theme = useTheme()
  useEffect(() => {
    setAnomaly(allAnomalies(currentLang).find(_ => _.category === draft.category)!)
  }, [])
  return (
    <>
      <div>
        <b>{anomaly?.category}</b>
      </div>
      <pre style={{fontSize: styleUtils(theme).fontSize.small, lineHeight: 1.3}}>{JSON.stringify(draft, undefined, 2)}</pre>

      {anomaly && (
        <ConfirmationInner
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
