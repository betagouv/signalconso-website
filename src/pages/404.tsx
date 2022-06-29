import {Page} from '../shared/Page/Page'
import {Fender} from '../alexlibs/mui-extension'
import {useI18n} from '../core/i18n'
import {ScButton} from '../shared/Button/Button'
import {siteMap} from '../core/siteMap'
import Link from 'next/link'
import {Box} from '@mui/material'
import Head from 'next/head'

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
        <Link href={siteMap.index}>
          <ScButton
            icon="home"
            variant="contained"
            sx={{
              display: 'block',
              margin: 'auto',
              mt: 3,
            }}
          >
            {m.backToHome}
          </ScButton>
        </Link>
      </Fender>
    </Page>
  )
}

export default NotFound
