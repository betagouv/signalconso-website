import {Button} from '@codegouvfr/react-dsfr/Button'
import {Box, Card, Slide} from '@mui/material'
import {buildPathForStep} from 'components_feature/reportFlow/reportFlowStepper/ReportFlowStepper'
import {ReportFlowStepperHeader} from 'components_feature/reportFlow/reportFlowStepper/ReportFlowStepperHeader'
import {useI18n} from 'i18n/I18n'
import {findCurrentStepForReport} from 'model/ReportStep'
import Link from 'next/link'
import {useMemo} from 'react'
import {useReportFlowContext} from './reportFlow/ReportFlowContext'

export default function ReportStartedAlert() {
  const _report = useReportFlowContext()
  const hasStoredReport = useMemo(() => !!_report.reportDraft.anomaly, [_report.reportDraft])
  const currentStep = useMemo(() => findCurrentStepForReport(_report.reportDraft), [_report.reportDraft])
  const {m, currentLang} = useI18n()
  if (hasStoredReport && _report.reportDraft.anomaly) {
    return (
      <Slide in={true} direction="up" className="z-50">
        <Card
          elevation={9}
          sx={{
            border: t => `2px solid ${t.palette.primary.main}`,
            p: 2,
            bottom: 20,
            right: 20,
            background: 'white',
            maxWidth: 420,
            position: 'fixed',
          }}
        >
          <Box>
            <h1 className="fr-h5 !mb-2">{m.continueReport}</h1>
            <ReportFlowStepperHeader
              isWebView={false}
              step={currentStep}
              variant="report-started-alert"
              anomalyTitle={_report.reportDraft.anomaly.title}
            />
            <div className="flex justify-end gap-4">
              <Button size="small" priority="tertiary" onClick={_report.resetFlow}>
                {m.delete}
              </Button>
              <Link href={buildPathForStep(_report.reportDraft.anomaly, currentLang, currentStep, false)} legacyBehavior>
                <Button size="small">{m.continue}</Button>
              </Link>
            </div>
          </Box>
        </Card>
      </Slide>
    )
  }
  return <></>
}
