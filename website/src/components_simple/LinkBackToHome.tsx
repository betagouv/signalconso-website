'use client'
import {Button} from '@codegouvfr/react-dsfr/Button'
import {pagesDefs} from '../core/pagesDefinitions'
import {getI18n} from '../i18n/I18nDictionnary'
import {AppLang} from '../i18n/localization/AppLangs'
import {sendMessageToReactNative} from '@/utils/utils'

export const LinkBackToHome = ({isWebView, lang}: {isWebView: boolean; lang: AppLang}) => {
  const {messages: m} = getI18n(lang)

  const buttonProps = {
    iconId: 'fr-icon-home-4-line',
    size: 'large',
  } as const
  return (
    <div className="w-full flex items-center justify-center mt-2">
      {isWebView ? (
        <Button onClick={() => sendMessageToReactNative('success')} {...buttonProps}>
          {m.backToHome}
        </Button>
      ) : (
        <Button linkProps={{href: pagesDefs.index.url}} {...buttonProps}>
          {m.backToHome}
        </Button>
      )}
    </div>
  )
}
