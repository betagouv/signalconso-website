import {ScButton} from 'components_simple/Button/Button'
import Link from 'next/link'
import {siteMap} from '../core/siteMap'
import {useI18n} from '../i18n/I18n'

export const LinkBackToHome = ({isWebView}: {isWebView: boolean}) => {
  const {m} = useI18n()

  const sendMessageToReactNative = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('success')
    }
  }

  return isWebView ? (
    <ScButton onClick={sendMessageToReactNative} color="primary" variant="contained" icon="home">
      {m.backToHome}
    </ScButton>
  ) : (
    <Link href={siteMap.index}>
      <ScButton color="primary" variant="contained" icon="home">
        {m.backToHome}
      </ScButton>
    </Link>
  )
}
