import {Button} from '@codegouvfr/react-dsfr/Button'
import Link from 'next/link'
import {siteMap} from '../core/siteMap'
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
        <Link href={siteMap.index} legacyBehavior>
          <Button iconId="fr-icon-home-4-line">{m.backToHome}</Button>
        </Link>
      )}
    </div>
  )
}
