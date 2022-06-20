import {ScButton} from 'shared/Button/Button'
import {ButtonProps} from '@mui/material'
import {useI18n} from '../i18n'
import {siteMap} from '../siteMap'
import {useWindowWidth} from '../useWindowWidth'

export const BtnAdmin = ({sx, ...props}: ButtonProps) => {
  const {m} = useI18n()
  const width = useWindowWidth()
  return (
    <ScButton
      href={siteMap.connexion}
      color="secondary"
      variant="contained"
      iconAfter="lock_open"
      {...props}
      sx={{whiteSpace: 'nowrap', ...sx}}
    >
      {width.isMobileWidthMax ? '' : m.menu_authSpace}
    </ScButton>
  )
}
