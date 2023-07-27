'use client'

import {forwardRef} from 'react'
import {usePathname, useRouter} from 'next/navigation'
import {useI18n} from '../i18n/I18n'
import {AppLangs} from '../i18n/localization/AppLangs'
import {setCookie} from 'cookies-next'
import {replaceLangInPath, switchLang} from '../i18n/I18nTools'

export const Translate = forwardRef(() => {
  const pathname = usePathname()
  const router = useRouter()

  const {m, currentLang} = useI18n()

  return (
    <button
      className="fr-translate__btn fr-btn fr-btn--tertiary"
      aria-controls="translate-1177"
      title={m.header.selectLang}
      onClick={() => {
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
