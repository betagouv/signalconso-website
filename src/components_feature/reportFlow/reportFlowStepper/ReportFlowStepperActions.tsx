import {Button} from '@codegouvfr/react-dsfr/Button'
import {Box} from '@mui/material'
import {useI18n} from 'i18n/I18n'
import {firstReportStep} from 'model/ReportStep'
import {ScButton} from '../../../components_simple/ScButton'
import {StepNavigation} from './ReportFlowStepper'
import {iconArrowRight} from 'utils/utils'

interface Props {
  hideNext?: boolean
  hidePrev?: boolean
  loadingNext?: boolean
  loadingPrev?: boolean
  nextButtonLabel?: string
  nextIconSend?: boolean
  next?: (next: () => void) => void
  prev?: (prev: () => void) => void
  stepNavigation: StepNavigation
}

export const ReportFlowStepperActions = ({
  nextButtonLabel,
  nextIconSend,
  hidePrev,
  hideNext,
  loadingNext,
  loadingPrev,
  next,
  prev,
  stepNavigation,
}: Props) => {
  const {m} = useI18n()
  return (
    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 3}}>
      {stepNavigation.currentStep !== firstReportStep && !hidePrev && (
        <Button
          iconId={'fr-icon-arrow-left-s-line'}
          onClick={prev ? () => prev(stepNavigation.prev) : stepNavigation.prev}
          className="mr-auto"
          disabled={loadingPrev}
          priority="secondary"
        >
          {m.previous}
        </Button>
      )}
      {!hideNext && (
        <Button
          iconId={nextIconSend ? 'fr-icon-send-plane-line' : iconArrowRight}
          onClick={next ? () => next(stepNavigation.next) : stepNavigation.next}
          className="ml-auto stepper-next-button"
          disabled={loadingNext === true}
        >
          {nextButtonLabel ?? m.next}
        </Button>
      )}
    </Box>
  )
}
