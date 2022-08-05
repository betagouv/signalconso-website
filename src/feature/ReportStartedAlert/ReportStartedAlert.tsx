import {Box, Card, Slide} from '@mui/material'
import {findAnomalyByCategory} from 'anomaly/Anomalies'
import {useI18n} from 'core/i18n'
import {ReportStepHelper} from 'core/reportStep'
import Link from 'next/link'
import {useMemo} from 'react'
import {AnomalyImage} from 'shared/AnomalyCard/AnomalyImage'
import {ScButton} from 'shared/Button/Button'
import {StepperHeader} from 'shared/Stepper/StepperHeader'
import {Txt} from '../../alexlibs/mui-extension'
import {useReportFlowContext} from '../Report/ReportFlowContext'

export const ReportStartedAlert = () => {
  const _report = useReportFlowContext()
  const currentStep = useMemo(() => ReportStepHelper.reportCurrentStep(_report.reportDraft), [_report.reportDraft])
  const {m} = useI18n()
  const draft = _report.reportDraft
  const {category} = draft
  const isAdvancedEnoughToDisplay = (draft.subcategories ?? []).length > 0
  if (category && isAdvancedEnoughToDisplay) {
    const anomaly = findAnomalyByCategory(category)
    if (!anomaly) {
      throw new Error(`Cannot find Anomaly for category ${category}`)
    }
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
          <AnomalyImage anomaly={anomaly} scale={0.8} sx={{mr: 1}} />
          <Box>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <Txt size="big" bold>
                {m.continueReport}
              </Txt>
            </Box>
            <Txt block color="hint">
              {category}
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
              <Link href={anomaly.path}>
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
