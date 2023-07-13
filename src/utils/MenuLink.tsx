import {AppLang} from '../i18n/localization/AppLangs'
import {HTMLAttributeAnchorTarget} from 'react'

export default function buildMenuLink(
  currentLang: AppLang,
  pathname: string,
  url: string,
  text: string,
  target?: HTMLAttributeAnchorTarget,
) {
  return {
    isActive: pathname === url,
    linkProps: {
      href: `/${currentLang}${url}`,
      target,
    },
    text,
  }
}
