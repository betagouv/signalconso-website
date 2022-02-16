import {ScButton} from '../../shared/Button/Button'
import {ButtonProps} from '@mui/material'
import {useI18n} from '../i18n'

export const BtnAdmin = (props: ButtonProps) => {
  const {m} = useI18n()
  return (
    <ScButton color="secondary" variant="contained" iconAfter="lock_open" {...props}>
      {m.menu_authSpace}
    </ScButton>
  )
}
