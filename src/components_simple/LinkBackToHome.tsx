'use client'
import {Button} from '@codegouvfr/react-dsfr/Button'
import Link from 'next/link'
import {pagesDefs} from '../core/pagesDefinitions'
import {getI18n} from '../i18n/I18nDictionnary'
import {useI18n} from '../i18n/I18n'
import {AppLang} from '../i18n/localization/AppLangs'

export const LinkBackToHome = ({isWebView, lang}: {isWebView: boolean; lang: AppLang}) => {
  const {messages: m} = getI18n(lang)

  const sendMessageToReactNative = () => window.ReactNativeWebView?.postMessage('success')

  return (
    <div className="w-full flex items-center justify-center mt-2">
      {isWebView ? (
        <Button onClick={sendMessageToReactNative} iconId="fr-icon-home-4-line">
          {m.backToHome}
        </Button>
      ) : (
        <Link href={pagesDefs.index.url} legacyBehavior>
          <Button iconId="fr-icon-home-4-line">{m.backToHome}</Button>
        </Link>
      )}
    </div>
  )
}
