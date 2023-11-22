import {buildPathForStep} from '@/components_feature/reportFlow/reportFlowStepper/ReportFlowStepper'
import {ReportFlowStepperHeader} from '@/components_feature/reportFlow/reportFlowStepper/ReportFlowStepperHeader'
import {Animate} from '@/components_simple/Animate'
import {useI18n} from '@/i18n/I18n'
import {findCurrentStepForReport} from '@/model/ReportStep'
import {Button} from '@codegouvfr/react-dsfr/Button'
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
      <Animate fromBottom>
        <div className="fixed bottom-5 right-5 bg-white max-w-[420px] p-4 border-scbluefrance border-solid border-2 shadow-black shadow-md">
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
        </div>
      </Animate>
    )
  }
  return <></>
}
