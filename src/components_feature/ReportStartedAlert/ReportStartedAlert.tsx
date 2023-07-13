import {Button} from '@codegouvfr/react-dsfr/Button'
import {Box, Card, Slide} from '@mui/material'
import {AnomalyImage} from 'components_simple/AnomalyTile/AnomalyImage'
import {buildPathForStep} from 'components_simple/ReportFlowStepper/ReportFlowStepper'
import {ReportFlowStepperHeader} from 'components_simple/ReportFlowStepper/ReportFlowStepperHeader'
import {useI18n} from 'i18n/I18n'
import {findCurrentStepForReport} from 'model/ReportStep'
import Link from 'next/link'
import {useMemo} from 'react'
import {Txt} from '../../alexlibs/mui-extension/Txt/Txt'
import {useReportFlowContext} from '../Report/ReportFlowContext'

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
            display: 'flex',
            bottom: 20,
            right: 20,
            background: 'white',
            maxWidth: 420,
            position: 'fixed',
          }}
        >
          <AnomalyImage anomaly={_report.reportDraft.anomaly} scale={0.8} sx={{mr: 1}} />
          <Box>
            <h2 className="font-medium text-lg mb-0">{m.continueReport}</h2>
            <Txt block color="hint">
              {_report.reportDraft.anomaly.title}
            </Txt>
            <ReportFlowStepperHeader variant="report-started-alert" currentStep={currentStep} />
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
