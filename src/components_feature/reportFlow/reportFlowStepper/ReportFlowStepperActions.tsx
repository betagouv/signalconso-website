import {Button} from '@codegouvfr/react-dsfr/Button'
import {Box} from '@mui/material'
import {useI18n} from 'i18n/I18n'
import {iconArrowRight} from 'utils/utils'
import {StepNavigation} from './ReportFlowStepper'

interface Props {
  loadingNext?: boolean
  nextButtonLabel?: string
  nextIconSend?: boolean
  next?: (next: () => void) => void
  stepNavigation: StepNavigation
}

export const ReportFlowStepperActions = ({nextButtonLabel, nextIconSend, loadingNext, next, stepNavigation}: Props) => {
  const {m} = useI18n()
  return (
    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 3}}>
      <Button
        iconId={nextIconSend ? 'fr-icon-send-plane-line' : iconArrowRight}
        onClick={next ? () => next(stepNavigation.next) : stepNavigation.next}
        className="ml-auto stepper-next-button"
        disabled={loadingNext === true}
      >
        {nextButtonLabel ?? m.next}
      </Button>
    </Box>
  )
}
