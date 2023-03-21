import {ScButton} from 'components_simple/Button/Button'
import {ButtonProps} from '@mui/material'
import {useI18n} from '../i18n/I18n'
import {siteMap} from '../core/siteMap'

export const BtnAdmin = ({sx, ...props}: ButtonProps) => {
  const {m} = useI18n()
  return (
    <ScButton
      href={siteMap.connexion}
      color="secondary"
      variant="contained"
      iconAfter="lock_open"
      {...props}
      sx={{whiteSpace: 'nowrap', ...sx}}
    >
      <span className="hidden lg:inline">{m.menu_authSpace}</span>
    </ScButton>
  )
}
