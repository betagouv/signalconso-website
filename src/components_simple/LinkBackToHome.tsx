import {ScButton} from 'components_simple/Button/Button'
import Link from 'next/link'
import {siteMap} from '../core/siteMap'
import {useI18n} from '../i18n/I18n'

export const LinkBackToHome = ({isWebView}: {isWebView: boolean}) => {
  const {m} = useI18n()

  return isWebView ? null : (
    <Link href={siteMap.index}>
      <ScButton color="primary" variant="contained" icon="home">
        {m.backToHome}
      </ScButton>
    </Link>
  )
}
