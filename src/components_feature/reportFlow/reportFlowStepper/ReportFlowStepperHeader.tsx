import Button from '@codegouvfr/react-dsfr/Button'
import {pagesDefs} from '@/core/pagesDefinitions'
import {useI18n} from '@/i18n/I18n'
import {ReportStepOrDone, getIndexForStep, getNextStep, getStepLabel, reportSteps} from '@/model/ReportStep'
import {useEffect, useRef} from 'react'
import {StepNavigation} from './ReportFlowStepper'
import {ChildrenProps} from '@/utils/utils'

export function ReportFlowStepperHeader(
  props: {
    step: ReportStepOrDone
    anomalyTitle: string | 'main'
    isWebView: boolean
  } & (
    | {
        variant: 'main'
        stepNavigation: StepNavigation
      }
    | {
        variant: 'report-started-alert'
      }
  ),
) {
  const {m} = useI18n()
  const {step, anomalyTitle, isWebView, variant} = props
  const divRef = useRef<HTMLDivElement>(null)
  const isDone = step === 'Done'
  useEffect(() => {
    // On first render and after changing step
    // bring the focus on the stepper, it's better for accessibility
    divRef.current?.focus()
  }, [step])

  if (!isDone) {
    const stepIndex = getIndexForStep(step)
    const stepTitle = getStepLabel(m, step)
    const nextStep = getNextStep(step)
    const nextStepTitle = nextStep !== 'Done' ? getStepLabel(m, nextStep) : undefined
    const stepsCount = reportSteps.length
    const isPrevBackToHome = stepIndex === 1
    return (
      <div className="fr-stepper grow" tabIndex={-1} ref={divRef}>
        <H1OrP kind={variant === 'main' ? 'h1' : 'p'}>
          <span className="fr-stepper__state">
            {anomalyTitle} - {m.faireUnSignalement.etape} {stepIndex} {m.faireUnSignalement.sur} {stepsCount}
          </span>
          {variant === 'main' && stepTitle}
        </H1OrP>
        <div className="fr-stepper__steps" data-fr-current-step={stepIndex} data-fr-steps={stepsCount}></div>
        {variant === 'main' && (
          <div className="flex gap-2 justify-between">
            {(!isWebView || !isPrevBackToHome) && (
              <Button
                {...(isPrevBackToHome
                  ? {
                      linkProps: {
                        href: pagesDefs.index.url,
                      },
                    }
                  : {
                      onClick: props.stepNavigation.prev,
                    })}
                iconId="fr-icon-arrow-left-s-line"
                priority="tertiary no outline"
                className="mt-2"
              >
                {isPrevBackToHome ? m.menu_home : m.previous}
              </Button>
            )}
            {nextStepTitle && (
              <p className="fr-stepper__details">
                <span className="fr-text--bold">{m.nextStep}</span> {nextStepTitle}
              </p>
            )}
          </div>
        )}
      </div>
    )
  }
  return null
}

function H1OrP({kind, children}: {kind: 'h1' | 'p'} & ChildrenProps) {
  const className = 'fr-stepper__title'
  if (kind === 'h1') {
    return <h1 {...{className}}>{children}</h1>
  }
  return <p {...{className}}>{children}</p>
}
