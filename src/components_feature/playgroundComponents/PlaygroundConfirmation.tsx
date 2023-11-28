import {allAnomalies} from '@/anomalies/Anomalies'
import {StepNavigation} from '@/components_feature/reportFlow/reportFlowStepper/ReportFlowStepper'
import {firstReportStep} from '@/model/ReportStep'
import {useEffect, useState} from 'react'
import {Anomaly} from '../../anomalies/Anomaly'
import {useI18n} from '../../i18n/I18n'
import {ReportDraft} from '../../model/ReportDraft'
import {Fixture, SeedableRandom} from '../../test/fixture'
import {ConfirmationInner} from '../reportFlow/Confirmation/Confirmation'

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
  useEffect(() => {
    setAnomaly(allAnomalies(currentLang).find(_ => _.category === draft.category)!)
  }, [])
  return (
    <>
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
