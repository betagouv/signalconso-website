'use client'
import {Button} from '@codegouvfr/react-dsfr/Button'
import {pagesDefs} from '../core/pagesDefinitions'
import {getI18n} from '../i18n/I18nDictionnary'
import {AppLang} from '../i18n/localization/AppLangs'
import {sendMessageToReactNative} from 'utils/utils'

export const LinkBackToHome = ({isWebView, lang}: {isWebView: boolean; lang: AppLang}) => {
  const {messages: m} = getI18n(lang)

  return (
    <div className="w-full flex items-center justify-center mt-2">
      {isWebView ? (
        <Button onClick={() => sendMessageToReactNative('success')} iconId="fr-icon-home-4-line">
          {m.backToHome}
        </Button>
      ) : (
        <a href={pagesDefs.index.url}>
          <Button iconId="fr-icon-home-4-line">{m.backToHome}</Button>
        </a>
      )}
    </div>
  )
}
