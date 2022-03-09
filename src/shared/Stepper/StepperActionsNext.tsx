import {ScButton} from '../Button/Button'
import {BtnProps} from 'mui-extension'
import {useI18n} from '../../core/i18n'

export const StepperActionsNext = (props: BtnProps) => {
  const {m} = useI18n()
  return (
    <ScButton
      id="btn-submit"
      color="primary"
      variant="contained"
      iconAfter="keyboard_arrow_right"
      {...props}
    >
      {m.next}
    </ScButton>
  )
}
