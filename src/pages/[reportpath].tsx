import {Box, Icon} from '@mui/material'
import {undefinedIfNull} from 'utils/utils'
import {findCurrentStepForReport, firstReportStep, reportSteps} from 'model/ReportStep'
import {siteMap} from 'core/siteMap'
import {styleUtils} from 'core/theme'
import {useReportFlowContext} from 'components_feature/Report/ReportFlowContext'
import {GetStaticPaths, GetStaticProps} from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import {Page} from 'components_simple/Page/Page'
import {IconBtn} from '../alexlibs/mui-extension/IconBtn/IconBtn'
import {allAnomalies} from '../anomalies/Anomalies'
import {Anomaly} from '../anomalies/Anomaly'
import {ReportFlow} from '../components_feature/Report/ReportFlow'

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

const AnomalyPage = ({reportPath}: {reportPath: string}) => {
  const anomaly = allAnomalies.find(_ => _.path === reportPath)
  if (!anomaly) {
    throw new Error(`Cannot find anomaly for reportPath : ${reportPath}`)
  }
  return (
    <Page width={624}>
      <Head>
        <title>{anomaly.title + ' - SignalConso'}</title>
        <meta name="description" content={undefinedIfNull(anomaly.seoDescription ?? anomaly.description)} />
      </Head>
      <Box sx={{display: 'flex', alignItems: 'center', mb: 2, color: t => t.palette.text.secondary}}>
        <Link href={siteMap.index}>
          <IconBtn>
            <Icon>chevron_left</Icon>
          </IconBtn>
        </Link>
        <Box
          component="h1"
          sx={{
            ml: 0.5,
            mb: 0,
            p: 0,
            fontSize: t => styleUtils(t).fontSize.title,
          }}
        >
          {anomaly.category}
        </Box>
      </Box>
      <NoSSR anomaly={anomaly} />
    </Page>
  )
}
// https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr
const NoSSR = dynamic(() => Promise.resolve(ReportFlowInitializer), {ssr: false})

function ReportFlowInitializer({anomaly}: {anomaly: Anomaly}) {
  const _reportFlow = useReportFlowContext()
  const initialStep =
    anomaly.category === _reportFlow.reportDraft.category ? findCurrentStepForReport(_reportFlow.reportDraft) : firstReportStep
  return <ReportFlow initialStep={initialStep} anomaly={anomaly} />
}

export default AnomalyPage
