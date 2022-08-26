import {Box, Icon} from '@mui/material'
import {undefinedIfNull} from 'client/helper/Utils'
import {ReportStepHelper} from 'core/reportStep'
import {siteMap} from 'core/siteMap'
import {styleUtils} from 'core/theme/theme'
import {useReportFlowContext} from 'feature/Report/ReportFlowContext'
import {GetStaticPaths, GetStaticProps} from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import {useMemo} from 'react'
import {Page} from 'shared/Page/Page'
import {IconBtn} from '../alexlibs/mui-extension'
import {allAnomalies} from '../anomaly/Anomalies'
import {Anomaly} from '../anomaly/Anomaly'
import {ReportFlow} from '../feature/Report/ReportFlow'

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

const NoSSR = dynamic(() =>
  Promise.resolve(({anomaly}: {anomaly: Anomaly}) => {
    const _reportFlow = useReportFlowContext()
    const initialStep = useMemo(() => {
      if (anomaly.category === _reportFlow.reportDraft.category) {
        return ReportStepHelper.reportCurrentStep(_reportFlow.reportDraft)
      }
      return 0
    }, [])
    return <ReportFlow initialStep={initialStep} anomaly={anomaly} />
  }),
)

export default AnomalyPage
