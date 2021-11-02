import {ReactNode} from 'react'
import Link from 'next/link'
import {siteMap} from '../siteMap'
import {useI18n} from '../i18n'
import {Icon, useTheme} from '@mui/material'
import {styled} from '@mui/material/styles'
import {styleUtils} from '../theme/theme'
import {ScButton} from '../../shared/Button/Button'

interface HeaderItemProps {
  href: string
  children: ReactNode
}

const HeaderItem = ({href, children}: HeaderItemProps) => {
  const theme = useTheme()
  return (
    <Link href={href}>
      <a style={{
        padding: theme.spacing(1),
        fontSize: styleUtils(theme).fontSize.big,
        marginLeft: theme.spacing(1),
      }}>
        {children}
      </a>
    </Link>
  )
}

const Root = styled('header')(({theme}) => ({
  background: theme.palette.background.paper,
  top: 0,
  display: 'flex',
  alignItems: 'center',
  position: 'sticky',
  width: '100%',
  padding: theme.spacing(1, 2),
}))

export const Header = () => {
  const theme = useTheme()
  const {m} = useI18n()
  return (
    <Root role="banner">
      <img
        style={{height: 120, marginRight: theme.spacing(3)}}
        src="/image/gouv.svg"
        alt={m.logoAltGouv}
      />
      <Link href={siteMap.index}>
        <a>
          <img style={{height: 70}} src="/image/logo-signalconso.svg" alt={m.logoAltSignalconso}/>
        </a>
      </Link>

      <nav style={{marginLeft: 'auto'}}>
        <ul style={{listStyle: 'none', display: 'flex', alignItems: 'center'}}>
          <li><HeaderItem href={siteMap.index}>{m.menu_home}</HeaderItem></li>
          <li><HeaderItem href={siteMap.howItWorks}>{m.menu_howItWorks}</HeaderItem></li>
          <li><HeaderItem href={siteMap.help}>{m.menu_help}</HeaderItem></li>
          <li>
            <ScButton color="secondary" variant="contained" iconAfter="lock_open">
              {m.menu_authSpace}
            </ScButton>
          </li>
        </ul>
      </nav>
    </Root>
  )
}
