import Link from 'next/link'
import {siteMap} from '../siteMap'
import {Box, Icon, Menu, MenuItem, useScrollTrigger, useTheme} from '@mui/material'
import {styleUtils} from '../theme/theme'
import {ScButton, ScButtonProps} from 'shared/Button/Button'
import {useI18n} from '../i18n'
import {appConfig} from '../../conf/appConfig'
import {BtnAdmin} from './BtnAdmin'
import {useMemo, useState} from 'react'
import {useWindowWidth} from 'core/useWindowWidth'
import {IconBtn} from '../../alexlibs/mui-extension'

interface HeaderItemProps extends ScButtonProps {
  href?: string
}

const HeaderItem = ({href, children, style, ...props}: HeaderItemProps) => {
  const theme = useTheme()
  const button = (
    <ScButton
      {...props}
      style={{
        ...style,
        padding: theme.spacing(1),
        fontSize: styleUtils(theme).fontSize.big,
        marginLeft: theme.spacing(1),
        textTransform: 'unset',
        color: 'inherit',
        paddingTop: 0,
        paddingBottom: 0,
      }}
    >
      {children}
    </ScButton>
  )
  if (href) {
    return <Link href={href}>{button}</Link>
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
  const width = useWindowWidth()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isMobileMenuOpen = !!anchorEl
  const scrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: headerHeight.normal - headerHeight.compact,
  })
  const menuItems = useMemo(
    () => [
      ...(appConfig.showPlayground ? [{href: siteMap.playground, label: 'Playground'}] : []),
      {href: siteMap.index, label: m.menu_home},
      {href: siteMap.commentCaMarche, label: m.menu_howItWorks},
      {href: siteMap.centreAide, label: m.menu_help},
    ],
    [],
  )

  return (
    <Box
      component="header"
      sx={{
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
        ...(scrolled && {
          height: headerHeight.compact,
          position: 'fixed',
          boxShadow: t => t.shadows[4],
        }),
      }}
    >
      {scrolled || width.isMobileWidthMax ? (
        <img style={{height: 38, marginRight: theme.spacing(3)}} src="/image/gouv-mobile.svg" alt={m.logoAltGouv} />
      ) : (
        <img style={{height: 110, marginRight: theme.spacing(3)}} src="/image/gouv.new.png" alt={m.logoAltGouv} />
      )}
      <Link href={siteMap.index}>
        <a>
          <img
            style={{height: scrolled || width.isMobileWidthMax ? 40 : 60}}
            src="/image/logo-signalconso.svg"
            alt={m.logoAltSignalconso}
          />
        </a>
      </Link>

      {width.isMobileWidthMax && (
        <>
          <IconBtn
            aria-controls={isMobileMenuOpen ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={isMobileMenuOpen ? 'true' : undefined}
            sx={{marginLeft: 'auto'}}
            onClick={e => setAnchorEl(e.currentTarget)}
          >
            <Icon>menu</Icon>
          </IconBtn>
          <Menu anchorEl={anchorEl} onClose={() => setAnchorEl(null)} open={isMobileMenuOpen}>
            {menuItems.map(_ => (
              <Link key={_.href} href={_.href}>
                <MenuItem onClick={() => setAnchorEl(null)}>{_.label}</MenuItem>
              </Link>
            ))}
          </Menu>
        </>
      )}
      {!width.isMobileWidthMax && (
        <nav style={{marginLeft: 'auto', display: 'flex', alignItems: 'center'}}>
          <ul style={{listStyle: 'none', display: 'flex', alignItems: 'center', margin: 0}}>
            {menuItems.map(_ => (
              <li key={_.href}>
                <HeaderItem href={_.href}>{_.label}</HeaderItem>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <BtnAdmin sx={{ml: 1}} />
    </Box>
  )
}
