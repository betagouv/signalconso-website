import {Page} from '../components_simple/Page/Page'
import {useI18n} from '../i18n/I18n'
import {ScButton} from '../components_simple/Button/Button'
import {siteMap} from '../core/siteMap'
import Link from 'next/link'
import {Box} from '@mui/material'
import Head from 'next/head'
import {Fender} from 'alexlibs/mui-extension/Fender/Fender'
import {LinkBackToHome} from '../components_simple/LinkBackToHome'

const NotFound = () => {
  const {m} = useI18n()
  return (
    <Page>
      <Head>
        <title>{'SignalConso : Page non trouvée'}</title>
        <meta name="description" content={m.pageNotFoundTitle} />
      </Head>
      <Fender
        icon="pan_tool"
        title={m.pageNotFoundTitle}
        description={<Box sx={{mt: 1}} dangerouslySetInnerHTML={{__html: m.pageNotFoundDesc}} />}
      >
        <LinkBackToHome />
      </Fender>
    </Page>
  )
}

export default NotFound
