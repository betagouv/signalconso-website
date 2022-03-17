import Link from 'next/link'
import {siteMap} from '../siteMap'
import {Box, useScrollTrigger, useTheme} from '@mui/material'
import {styleUtils} from '../theme/theme'
import {ScButton, ScButtonProps} from 'shared/Button/Button'
import {useI18n} from '../i18n'
import {appConfig} from '../../conf/appConfig'
import {BtnAdmin} from './BtnAdmin'

interface HeaderItemProps extends ScButtonProps {
  href?: string
}

const HeaderItem = ({href, children, style, ...props}: HeaderItemProps) => {
  const theme = useTheme()
  const button = (
    <ScButton {...props} style={{
      ...style,
      padding: theme.spacing(1),
      fontSize: styleUtils(theme).fontSize.big,
      marginLeft: theme.spacing(1),
      textTransform: 'unset',
      color: 'inherit',
      paddingTop: 0,
      paddingBottom: 0,
    }}>
      {children}
    </ScButton>
  )
  if (href) {
    return (
      <Link href={href}>{button}</Link>
    )
  }
  return button
}

export const headerHeight = {
  normal: 132,
  compact: 52,
}

export const Header = () => {
  const theme = useTheme()
  const {m} = useI18n()
  const scrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: headerHeight.normal - headerHeight.compact,
  })

  return (
    <Box component="header" sx={{
      overflow: 'hidden',
      background: t => t.palette.background.paper,
      top: 0,
      display: 'flex',
      alignItems: 'center',
      position: 'absolute',
      width: '100%',
      py: 1,
      px: 2,
      height: headerHeight.normal,
      ...scrolled && {
        height: headerHeight.compact,
        position: 'fixed',
        boxShadow: t => t.shadows[4],
      }
    }}>
      {scrolled ? (
        <img
          style={{height: 38, marginRight: theme.spacing(3)}}
          src="/image/gouv-mobile.svg"
          alt={m.logoAltGouv}
        />
      ) : (
        <img
          style={{height: 110, marginRight: theme.spacing(3)}}
          src="/image/gouv.svg"
          alt={m.logoAltGouv}
        />
      )}
      <Link href={siteMap.index}>
        <a>
          <img style={{height: scrolled ? 40 : 60}} src="/image/logo-signalconso.svg" alt={m.logoAltSignalconso}/>
        </a>
      </Link>

      <nav style={{marginLeft: 'auto', display: 'flex', alignItems: 'center'}}>
        <ul style={{listStyle: 'none', display: 'flex', alignItems: 'center', margin: 0}}>
          {appConfig.showPlayground && (
            <li><HeaderItem href={siteMap.playground}>Playground</HeaderItem></li>
          )}
          <li><HeaderItem onClick={() => {
            throw new Error('Sentry Frontend Error')
          }}>Throw error</HeaderItem></li>
          <li><HeaderItem href={siteMap.index}>{m.menu_home}</HeaderItem></li>
          <li><HeaderItem href={siteMap.commentCaMarche}>{m.menu_howItWorks}</HeaderItem></li>
          <li><HeaderItem href={siteMap.centreAide}>{m.menu_help}</HeaderItem></li>
          <li>
            <BtnAdmin sx={{ml: 1}}/>
          </li>
        </ul>
      </nav>
    </Box>
  )
}
