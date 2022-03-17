import {ScButton} from 'shared/Button/Button'
import {ButtonProps} from '@mui/material'
import {useI18n} from '../i18n'

export const BtnAdmin = ({sx, ...props}: ButtonProps) => {
  const {m} = useI18n()
  return (
    <ScButton color="secondary" variant="contained" iconAfter="lock_open" {...props} sx={{whiteSpace: 'nowrap', ...sx}}>
      {m.menu_authSpace}
    </ScButton>
  )
}
