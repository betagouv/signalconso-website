'use client'
import {Button} from '@codegouvfr/react-dsfr/Button'
import Link from 'next/link'
import {pagesDefs} from '../core/pagesDefinitions'
import {getI18n} from '../i18n/I18nDictionnary'
import {useI18n} from '../i18n/I18n'

export const LinkBackToHome = ({isWebView}: {isWebView: boolean}) => {
  const {m} = useI18n()

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
