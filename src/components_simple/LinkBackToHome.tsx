'use client'
import {Button} from '@codegouvfr/react-dsfr/Button'
import Link from 'next/link'
import {pagesDefs} from '../core/pagesDefinitions'
import {getI18n} from '../i18n/I18nDictionnary'
import {sendMessageToReactNative} from 'utils/utils'

export const LinkBackToHome = ({isWebView}: {isWebView: boolean}) => {
  const {messages: m} = getI18n('fr')

  return (
    <div className="w-full flex items-center justify-center mt-2">
      {isWebView ? (
        <Button onClick={() => sendMessageToReactNative('success')} iconId="fr-icon-home-4-line">
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
