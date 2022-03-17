import {GetStaticPaths, GetStaticProps} from 'next'
import {apiSdk} from 'core/apiSdk'
import {serializeJsonForStupidNextJs} from 'core/helper/utils'
import {Anomaly} from '@signal-conso/signalconso-api-sdk-js'
import {ReportFlow} from 'feature/Report/ReportFlow'
import {useReportFlowContext} from 'feature/Report/ReportFlowContext'
import {useMemo} from 'react'
import {Page} from 'shared/Page/Page'
import {ReportStepHelper} from '../core/reportStep'
import {Box, Icon} from '@mui/material'
import {styleUtils} from '../core/theme/theme'
import {IconBtn} from 'mui-extension/lib'
import Link from 'next/link'
import {siteMap} from '../core/siteMap'

export const getStaticPaths: GetStaticPaths = async () => {
  const anomalies = await apiSdk.anomaly.getAnomalies()
  const paths = anomalies.filter(_ => !_.hidden).map(_ => ({
    params: {reportpath: _.path},
  }))
  return {paths, fallback: false}
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const anomaly = await apiSdk.anomaly.getAnomalies().then(res => res
    .find(_ => _.path === params!.reportpath)
  )

  return {
    props: serializeJsonForStupidNextJs({anomaly,}),
  }
}

const AnomalyPage = ({anomaly}: {anomaly: Anomaly}) => {
  const _reportFlow = useReportFlowContext()
  const initialStep = useMemo(() => {
    if (anomaly.category === _reportFlow.reportDraft.category) {
      return ReportStepHelper.reportCurrentStep(_reportFlow.reportDraft)
    }
    return 0
  }, [])

  return (
    <Page>
      <Box sx={{display: 'flex', alignItems: 'center', mb: 2, color: t => t.palette.text.secondary}}>
        <Link href={siteMap.index}>
          <IconBtn>
            <Icon>chevron_left</Icon>
          </IconBtn>
        </Link>
        <Box sx={{
          ml: .5,
          fontSize: t => styleUtils(t).fontSize.title
        }}>{anomaly.category}</Box>
      </Box>
      <ReportFlow initialStep={initialStep} anomaly={anomaly}/>
    </Page>
  )
}

export default AnomalyPage

