import {ScButton} from '../Button/Button'
import {BtnProps} from '../../alexlibs/mui-extension'
import {useI18n} from 'core/i18n'

interface Props extends BtnProps {}

export const StepperActionsNext = ({children, icon, ...props}: Props) => {
  const {m} = useI18n()
  return (
    <ScButton id="btn-submit" color="primary" variant="contained" iconAfter={icon ?? 'keyboard_arrow_right'} {...props}>
      {children ?? m.next}
    </ScButton>
  )
}
