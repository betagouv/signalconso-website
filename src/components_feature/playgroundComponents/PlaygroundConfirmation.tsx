import {StepNavigation} from '@/components_feature/reportFlow/reportFlowStepper/ReportFlowStepper'
import {getAnomaly} from '@/feature/reportDraftUtils'
import {firstReportStep} from '@/model/ReportStep'
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
  const draft = Fixture.genDraftReport(currentLang, 'Confirmation', new SeedableRandom(1)) as ReportDraft

  const anomaly = getAnomaly(draft)
  return (
    <>
      {anomaly && (
        <ConfirmationInner
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
