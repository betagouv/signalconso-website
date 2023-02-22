import {Box} from '@mui/material'
import {useI18n} from 'i18n/I18n'
import {firstReportStep} from 'model/ReportStep'
import {ScButton} from '../Button/Button'
import {StepNavigation} from './ReportFlowStepper'
import {StepperActionsNext} from './StepperActionsNext'

interface Props {
  hideNext?: boolean
  hidePrev?: boolean
  loadingNext?: boolean
  loadingPrev?: boolean
  nextButtonLabel?: string
  nextIcon?: string
  next?: (next: () => void) => void
  prev?: (prev: () => void) => void
  stepNavigation: StepNavigation
}

export const ReportFlowStepperActions = ({
  nextButtonLabel,
  nextIcon,
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
        <ScButton
          loading={loadingPrev}
          sx={{marginRight: 'auto'}}
          onClick={prev ? () => prev(stepNavigation.prev) : stepNavigation.prev}
          color="primary"
          icon="keyboard_arrow_left"
        >
          {m.previous}
        </ScButton>
      )}
      {!hideNext && (
        <StepperActionsNext
          icon={nextIcon}
          loading={loadingNext}
          sx={{marginLeft: 'auto'}}
          onClick={next ? () => next(stepNavigation.next) : stepNavigation.next}
          children={nextButtonLabel}
        />
      )}
    </Box>
  )
}
