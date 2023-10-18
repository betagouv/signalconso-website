'use client'

import {setCookie} from 'cookies-next'
import {usePathname, useRouter} from 'next/navigation'
import {useReportFlowContext} from '../components_feature/reportFlow/ReportFlowContext'
import {useI18n} from '../i18n/I18n'
import {replaceLangInPath, switchLang} from '../i18n/I18nTools'
import Button from '@codegouvfr/react-dsfr/Button'

export function SwitchLang() {
  const pathname = usePathname()
  const router = useRouter()
  const _report = useReportFlowContext()
  const {m, currentLang} = useI18n()
  const path = replaceLangInPath(pathname, switchLang(currentLang))
  return (
    <Button
      linkProps={{
        href: path,
        onClick: e => {
          e.preventDefault()
          //Reset report on lang switch
          _report.resetFlow()
          setCookie('NEXT_LANG', switchLang(currentLang))
          router.push(path)
        },
        title: m.header.selectLang,
      }}
      priority="tertiary"
    >
      {m.header.currentLangCode}
      <span className="fr-hidden-lg"> - {m.header.currentLang}</span>
    </Button>
  )
}
