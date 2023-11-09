'use client'

import {setCookie} from 'cookies-next'
import {usePathname, useRouter} from 'next/navigation'
import {useReportFlowContext} from '../components_feature/reportFlow/ReportFlowContext'
import {useI18n} from '../i18n/I18n'
import {replaceLangInPath, switchLang} from '../i18n/I18nTools'
import {internalPageDefs} from '../core/pagesDefinitions'
import Link from 'next/link'

export function SwitchLang() {
  const pathname = usePathname()
  const router = useRouter()
  const {m, currentLang} = useI18n()
  const path = replaceLangInPath(pathname, switchLang(currentLang))
  const home = `/${switchLang(currentLang)}`

  const newPath = () => {
    const hasAlternatePageInOtherLang = Object.values(internalPageDefs).find(_ => {
      return _.url != '/' && pathname.includes(_.url)
    })

    return hasAlternatePageInOtherLang ? path : home
  }

  return (
    <Link
      className={'fr-btn fr-btn--tertiary'}
      href={newPath()}
      onClick={e => {
        const p = newPath()
        e.preventDefault()
        setCookie('NEXT_LANG', switchLang(currentLang))
        router.push(p)
      }}
    >
      {m.header.currentLangCode}
      <span className="fr-hidden-lg"> - {m.header.currentLang}</span>
    </Link>
  )
}
