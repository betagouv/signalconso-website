import {ScButton} from 'components_simple/Button/Button'
import {ButtonProps} from '@mui/material'
import {useI18n} from '../i18n/I18n'
import {siteMap} from '../core/siteMap'
import {COLOR_DARK_BLUE} from 'core/theme'

export const BtnAdmin = ({sx, ...props}: ButtonProps) => {
  const {m} = useI18n()
  return (
    <ScButton
      href={siteMap.connexion}
      color="secondary"
      variant="contained"
      iconAfter="lock_open"
      {...props}
      sx={{
        whiteSpace: 'nowrap',
        ...sx,
        // override annoying interactions with the DSFR
        background: COLOR_DARK_BLUE,
        '&:hover': {
          backgroundColor: `${COLOR_DARK_BLUE} !important`,
        },
      }}
    >
      <span className="hidden lg:inline">{m.menu_authSpace}</span>
    </ScButton>
  )
}
