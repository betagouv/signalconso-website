import {GetStaticPaths, GetStaticProps} from 'next'
import {apiSdk} from 'core/apiSdk'
import {serializeJsonForStupidNextJs} from 'core/helper/utils'
import {useReportFlowContext} from 'feature/Report/ReportFlowContext'
import React, {useMemo} from 'react'
import {Page} from 'shared/Page/Page'
import {ReportStepHelper} from 'core/reportStep'
import {Box, Icon} from '@mui/material'
import {styleUtils} from 'core/theme/theme'
import {IconBtn} from '../alexlibs/mui-extension'
import Link from 'next/link'
import {siteMap} from 'core/siteMap'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import {ReportFlow} from '../feature/Report/ReportFlow'
import {Anomaly} from '../anomaly/Anomaly'
import {undefinedIfNull} from 'client/helper/Utils'

export const getStaticPaths: GetStaticPaths = async () => {
  const anomalies = await apiSdk.anomaly.getAnomalies()
  const paths = anomalies.map(_ => ({
    params: {reportpath: _.path},
  }))
  return {paths, fallback: false}
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const anomaly = await apiSdk.anomaly.getAnomalies().then(res => res.find(_ => _.path === params!.reportpath))

  return {
    props: serializeJsonForStupidNextJs({anomaly}),
  }
}

const AnomalyPage = ({anomaly}: {anomaly: Anomaly}) => {
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
      {/* Type mixup between types of react 17 and react 18 because of some indirect dependency
        @ts-ignore */}
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
