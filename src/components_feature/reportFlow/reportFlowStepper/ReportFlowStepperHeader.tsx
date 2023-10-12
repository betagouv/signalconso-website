import Button from '@codegouvfr/react-dsfr/Button'
import {pagesDefs} from 'core/pagesDefinitions'
import {useI18n} from 'i18n/I18n'
import {ReportStep, ReportStepOrDone, getIndexForStep, getNextStep, reportSteps} from 'model/ReportStep'
import {StepNavigation} from './ReportFlowStepper'

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
  function getLabel(step: ReportStep) {
    const stepsLabels = [m.step_problem, m.step_company, m.step_description, m.step_consumer, m.step_confirm]
    return stepsLabels[getIndexForStep(step) - 1]
  }

  if (step !== 'Done') {
    const stepIndex = getIndexForStep(step)
    const stepTitle = getLabel(step)
    const nextStep = getNextStep(step)
    const nextStepTitle = nextStep !== 'Done' ? getLabel(nextStep) : undefined
    const stepsCount = reportSteps.length
    const isPrevBackToHome = stepIndex === 1
    return (
      <div className="fr-stepper grow">
        <h2 className="fr-stepper__title">
          <span className="fr-stepper__state">
            {anomalyTitle} - {m.titleAndDescriptions.faireUnSignalement.etape} {stepIndex}{' '}
            {m.titleAndDescriptions.faireUnSignalement.sur} {stepsCount}
          </span>
          {variant === 'main' && stepTitle}
        </h2>
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
