'use client'

import {forwardRef} from 'react'
import {usePathname, useRouter} from 'next/navigation'
import {useI18n} from '../i18n/I18n'
import {AppLangs} from '../i18n/localization/AppLangs'
import {setCookie} from 'cookies-next'
import {replaceLangInPath, switchLang} from '../i18n/I18nTools'
import {useReportCreateContext} from '../components_feature/reportFlow/ReportCreateContext'
import {useReportFlowContext} from '../components_feature/reportFlow/ReportFlowContext'

export const SwitchLang = forwardRef(() => {
  const pathname = usePathname()
  const router = useRouter()
  const _report = useReportFlowContext()
  const {m, currentLang} = useI18n()

  return (
    <button
      className="fr-translate__btn fr-btn fr-btn--tertiary"
      aria-controls="translate-1177"
      title={m.header.selectLang}
      onClick={() => {
        //Reset report on lang switch
        _report.resetFlow()
        const path = replaceLangInPath(pathname, switchLang(currentLang))
        setCookie('NEXT_LANG', switchLang(currentLang))
        router.push(path)
      }}
    >
      {currentLang === AppLangs.fr ? (
        <span>
          FR<span className="fr-hidden-lg"> - Français</span>
        </span>
      ) : (
        <span>
          EN <span className="fr-hidden-lg"> - English</span>
        </span>
      )}
    </button>
  )
})
