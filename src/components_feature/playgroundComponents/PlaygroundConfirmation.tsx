import {StepNavigation} from '@/components_feature/reportFlow/reportFlowStepper/ReportFlowStepper'
import {getAnomaly} from '@/feature/reportUtils'
import {Report} from '@/model/Report'
import {firstReportStep} from '@/model/ReportStep'
import {useI18n} from '../../i18n/I18n'
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
  const draft = Fixture.genReport2(currentLang, 'Confirmation', new SeedableRandom(1)) as Report
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
