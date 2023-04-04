import {Box, Icon} from '@mui/material'
import {Page} from 'components_simple/Page/Page'
import {ReportFlowStepper} from 'components_simple/ReportFlowStepper/ReportFlowStepper'
import {siteMap} from 'core/siteMap'
import {styleUtils} from 'core/theme'
import {GetStaticPaths, GetStaticProps} from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import {undefinedIfNull} from 'utils/utils'
import {IconBtn} from '../alexlibs/mui-extension/IconBtn/IconBtn'
import {allAnomalies} from '../anomalies/Anomalies'

export const getStaticPaths: GetStaticPaths = () => {
  const paths = allAnomalies.map(_ => ({
    params: {reportpath: _.path},
  }))
  return {paths, fallback: false}
}

export const getStaticProps: GetStaticProps = ({params = {}}) => {
  const reportPath = params.reportpath
  if (typeof reportPath !== 'string') {
    throw new Error(`Unexpected type of reportPath : ${typeof reportPath}`)
  }
  return {
    props: {reportPath},
  }
}

export const ReportPathPage = ({reportPath, isWebView = false}: {reportPath: string; isWebView?: boolean}) => {
  const anomaly = allAnomalies.find(_ => _.path === reportPath)
  if (!anomaly) {
    throw new Error(`Cannot find anomaly for reportPath : ${reportPath}`)
  }
  return (
    <Page maxWidth={624}>
      <Head>
        <title>{anomaly.seoTitle + ' - SignalConso'}</title>
        <meta name="description" content={undefinedIfNull(anomaly.seoDescription ?? anomaly.description)} />
      </Head>
      <Box sx={{display: 'flex', alignItems: 'center', mb: 2, color: t => t.palette.text.secondary}}>
        {!isWebView && (
          <Link href={siteMap.index} legacyBehavior>
            <IconBtn>
              <Icon>chevron_left</Icon>
            </IconBtn>
          </Link>
        )}
        <Box
          component="h1"
          sx={{
            ml: 0.5,
            mb: 0,
            p: 0,
            fontSize: t => styleUtils(t).fontSize.title,
          }}
        >
          {anomaly.title}
        </Box>
      </Box>
      <ReportFlowStepperWithoutSsr {...{anomaly, isWebView}} />
    </Page>
  )
}
// https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr
const ReportFlowStepperWithoutSsr = dynamic(() => Promise.resolve(ReportFlowStepper), {ssr: false})
