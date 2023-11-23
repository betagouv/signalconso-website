'use client'

import {setCookie} from 'cookies-next'
import {usePathname, useRouter} from 'next/navigation'
import {useReportFlowContext} from '../components_feature/reportFlow/ReportFlowContext'
import {useI18n} from '../i18n/I18n'
import {replaceLangInPath, switchLang} from '../i18n/I18nTools'
import {internalPageDefs} from '../core/pagesDefinitions'
import Link from 'next/link'
import {ScDialog} from './ScDialog'
import {Button} from '@codegouvfr/react-dsfr/Button'

export function SwitchLang() {
  const pathname = usePathname()
  const router = useRouter()
  const _report = useReportFlowContext()
  const {m, currentLang} = useI18n()
  const path = replaceLangInPath(pathname, switchLang(currentLang))
  const home = `/${switchLang(currentLang)}`

  const newPath = () => {
    const hasAlternatePageInOtherLang = Object.values(internalPageDefs).find(_ => {
      return _.url != '/' && pathname.includes(_.url)
    })

    return hasAlternatePageInOtherLang ? path : home
  }

  return _report.reportDraft.category ? (
    <Button className={'fr-btn fr-btn--tertiary'}>
      <ScDialog
        title={m.switchLang}
        content={<p className="mb-0" dangerouslySetInnerHTML={{__html: m.pendingReport}} />}
        onConfirm={close => {
          const p = newPath()
          setCookie('NEXT_LANG', switchLang(currentLang))
          close()
          router.push(p)
        }}
        confirmLabel={m.confirm}
      >
        <span>
          {m.header.currentLangCode}
          <span className="fr-hidden-lg"> - {m.header.currentLang}</span>
        </span>
      </ScDialog>
    </Button>
  ) : (
    <Button
      className={'fr-btn fr-btn--tertiary'}
      linkProps={{
        prefetch: false,
        href: newPath(),
        title: m.header.selectLang,
      }}
    >
      {m.header.currentLangCode}
      <span className="fr-hidden-lg"> - {m.header.currentLang}</span>
    </Button>
  )
}
