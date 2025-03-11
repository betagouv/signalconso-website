import {ButtonWithLoader} from '@/components_simple/buttons/Buttons'
import {useI18n} from '@/i18n/I18n'
import {iconArrowRight} from '@/utils/utils'
import {StepNavigation} from './ReportFlowStepper'

interface Props {
  loadingNext?: boolean
  nextButtonLabel?: string
  nextIconSend?: boolean
  onNext: (next: () => void) => void
  stepNavigation: StepNavigation
}

export const NextStepButton = ({nextButtonLabel, nextIconSend, loadingNext, onNext, stepNavigation}: Props) => {
  const {m} = useI18n()
  return (
    <div className="flex justify-end mt-6">
      <ButtonWithLoader
        iconId={nextIconSend ? 'fr-icon-send-plane-line' : iconArrowRight}
        onClick={() => onNext(stepNavigation.next)}
        className="stepper-next-button"
        disabled={loadingNext === true}
        loading={loadingNext === true}
        size={stepNavigation.currentStep === 'Confirmation' ? 'large' : 'medium'}
      >
        {nextButtonLabel ?? m.next}
      </ButtonWithLoader>
    </div>
  )
}
