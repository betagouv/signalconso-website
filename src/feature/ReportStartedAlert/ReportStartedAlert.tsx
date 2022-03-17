import {Box, Card, LinearProgress, Slide} from '@mui/material'
import {useReportFlowContext} from '../Report/ReportFlowContext'
import {AnomalyImage} from 'shared/AnomalyCard/AnomalyImage'
import {useMemo} from 'react'
import {useI18n} from 'core/i18n'
import {Txt} from 'mui-extension'
import {ScButton} from 'shared/Button/Button'
import Link from 'next/link'
import {ReportStepHelper} from 'core/reportStep'

export const ReportStartedAlert = () => {
  const _report = useReportFlowContext()
  const hasStoredReport = useMemo(() => !!_report.reportDraft.anomaly, [_report.reportDraft])
  const currentStep = useMemo(() => ReportStepHelper.reportCurrentStep(_report.reportDraft), [_report.reportDraft])
  const stepsCount = useMemo(() => ReportStepHelper.count - 1, [])
  const {m} = useI18n()
  if (hasStoredReport && _report.reportDraft.anomaly) {
    return (
      <Slide in={true} direction="up">
        <Card elevation={9} sx={{
          p: 2,
          display: 'flex',
          bottom: 20,
          right: 20,
          background: t => t.palette.background.paper,
          maxWidth: 420,
          position: 'fixed',
        }}>
          <AnomalyImage anomaly={_report.reportDraft.anomaly} scale={.80} sx={{mr: 1}}/>
          <Box>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              {/*<Icon size="small" sx={{mr: 1, color: t => t.palette.info.main}}>info</Icon>*/}
              <Txt size="big" bold>
                {m.continueReport}
              </Txt>
            </Box>
            <Txt color="hint">
              {m.step} <Txt bold>{currentStep + 1}</Txt> <Txt>/ {stepsCount}</Txt>
            </Txt>
            <LinearProgress variant="determinate" value={(currentStep) / stepsCount * 100}/>
            <Box sx={{display: 'flex', justifyContent: 'flex-end', mt: 2}}>
              <ScButton size="small" color="error" sx={{mr: 1}} onClick={_report.clearReportDraft}>{m.delete}</ScButton>
              <Link href={_report.reportDraft.anomaly.path}>
                <ScButton size="small" color="primary" variant="contained">{m.continue}</ScButton>
              </Link>
            </Box>
          </Box>
        </Card>
      </Slide>
    )
  }
  return <></>
}
