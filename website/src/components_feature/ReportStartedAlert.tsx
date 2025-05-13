import {buildPathForStep} from '@/components_feature/reportFlow/reportFlowStepper/ReportFlowStepper'
import {ReportFlowStepperHeader} from '@/components_feature/reportFlow/reportFlowStepper/ReportFlowStepperHeader'
import {Animate} from '@/components_simple/Animate'
import {recreateOpenFfBarcodeParam} from '@/feature/openFoodFacts'
import {getAnomaly, hasStep0} from '@/feature/reportUtils'
import {useI18n} from '@/i18n/I18n'
import {findCurrentStepForReport} from '@/model/ReportStep'
import {Button} from '@codegouvfr/react-dsfr/Button'
import Link from 'next/link'
import {useMemo} from 'react'
import {useReportFlowContext} from './reportFlow/ReportFlowContext'

export default function ReportStartedAlert() {
  const _reportFlow = useReportFlowContext()
  const {report: report} = _reportFlow
  const currentStep = useMemo(() => findCurrentStepForReport(report), [report])
  const {m, currentLang} = useI18n()
  if (hasStep0(report)) {
    const anomaly = getAnomaly(report)
    return (
      <Animate fromBottom>
        <div className="fixed bottom-0 right-0 lg:bottom-5 md:right-5 bg-white w-full md:max-w-[420px] p-4 border-scbluefrance border-solid border-0 border-t-2 md:border-2 shadow-black shadow-md z-50">
          <h1 className="fr-h6 !mb-0 !md:mb-2">{m.continueReport}</h1>
          <ReportFlowStepperHeader
            isWebView={false}
            step={currentStep}
            variant="report-started-alert"
            anomalyTitle={anomaly.title}
          />
          <div className="flex justify-end gap-4">
            <Button size="medium" priority="tertiary" onClick={_reportFlow.resetReport}>
              {m.delete}
            </Button>
            <Link
              href={buildPathForStep(anomaly, currentLang, currentStep, false, recreateOpenFfBarcodeParam(report))}
            >
              <Button size="medium">{m.continue}</Button>
            </Link>
          </div>
        </div>
      </Animate>
    )
  }
  return <></>
}
