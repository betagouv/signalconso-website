'use client'

import {setCookie} from 'cookies-next'
import {usePathname, useRouter} from 'next/navigation'
import {useReportFlowContext} from '../components_feature/reportFlow/ReportFlowContext'
import {useI18n} from '../i18n/I18n'
import {replaceLangInPath, switchLang} from '../i18n/I18nTools'

export function SwitchLang() {
  const pathname = usePathname()
  const router = useRouter()
  const _report = useReportFlowContext()
  const {m, currentLang} = useI18n()
  return (
    <a
      href="#"
      className="fr-btn fr-btn--tertiary"
      onClick={e => {
        e.preventDefault()
        //Reset report on lang switch
        _report.resetFlow()
        const path = replaceLangInPath(pathname, switchLang(currentLang))
        setCookie('NEXT_LANG', switchLang(currentLang))
        router.push(path)
      }}
      title={m.header.selectLang}
    >
      {m.header.currentLangCode}
      <span className="fr-hidden-lg"> - {m.header.currentLang}</span>
    </a>
  )
}
