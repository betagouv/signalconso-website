import {Box, Card, Slide} from '@mui/material'
import {useReportFlowContext} from '../Report/ReportFlowContext'
import {AnomalyImage} from 'shared/AnomalyCard/AnomalyImage'
import {useMemo} from 'react'
import {useI18n} from 'core/i18n'
import {Txt} from '../../alexlibs/mui-extension'
import {ScButton} from 'shared/Button/Button'
import Link from 'next/link'
import {ReportStepHelper} from 'core/reportStep'
import {StepperHeader} from 'shared/Stepper/StepperHeader'

export const ReportStartedAlert = () => {
  const _report = useReportFlowContext()
  const hasStoredReport = useMemo(() => !!_report.reportDraft.anomaly, [_report.reportDraft])
  const currentStep = useMemo(() => ReportStepHelper.reportCurrentStep(_report.reportDraft), [_report.reportDraft])
  const {m} = useI18n()
  if (hasStoredReport && _report.reportDraft.anomaly) {
    return (
      <Slide in={true} direction="up">
        <Card
          elevation={9}
          sx={{
            border: t => `2px solid ${t.palette.primary.main}`,
            p: 2,
            display: 'flex',
            bottom: 20,
            right: 20,
            background: t => t.palette.background.paper,
            maxWidth: 420,
            position: 'fixed',
          }}
        >
          <AnomalyImage anomaly={_report.reportDraft.anomaly} scale={0.8} sx={{mr: 1}} />
          <Box>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <Txt size="big" bold>
                {m.continueReport}
              </Txt>
            </Box>
            <Txt block color="hint">
              {_report.reportDraft.anomaly.category}
            </Txt>
            <StepperHeader
              sx={{my: 1.5, mx: '-22px'}}
              hideLabel
              currentStep={currentStep}
              stepSize={26}
              stepMargin={4}
              steps={[m.step_problem, m.step_description, m.step_company, m.step_consumer, m.step_confirm]}
            />
            <Box sx={{display: 'flex', justifyContent: 'flex-end', mt: 2}}>
              <ScButton size="small" color="error" sx={{mr: 1}} onClick={_report.clearReportDraft}>
                {m.delete}
              </ScButton>
              <Link href={_report.reportDraft.anomaly.path}>
                <ScButton size="small" color="primary" variant="contained">
                  {m.continue}
                </ScButton>
              </Link>
            </Box>
          </Box>
        </Card>
      </Slide>
    )
  }
  return <></>
}
