import {useAnalyticContext} from '@/analytic/AnalyticContext'
import {EventCategories, ReportEventActions} from '@/analytic/analytic'
import {StepNavigation} from '@/components_feature/reportFlow/reportFlowStepper/ReportFlowStepper'
import {ReportFlowStepperActions} from '@/components_feature/reportFlow/reportFlowStepper/ReportFlowStepperActions'
import {OpenFfWelcomeText, useOpenFfSetupLoaded as useHandleOpenFfSetupLoaded, useOpenFfSetup} from '@/feature/openFoodFacts'
import {RappelConsoWelcome, useHandleRcSetupLoaded, useRappelConsoSetup} from '@/feature/rappelConso'
import {
  getCompanyKind,
  getSubcategories,
  getTags,
  getWipCompanyKindFromSelected,
  hasStep0,
  hasSubcategoryIndexes,
  isTransmittableToProBeforePickingConsumerWish,
} from '@/feature/reportDraftUtils'
import {useI18n} from '@/i18n/I18n'
import {initiateReportDraft} from '@/model/ReportDraft2'
import {Step2Model} from '@/model/Step2Model'
import {useEffect} from 'react'
import {Anomaly} from '../../../anomalies/Anomaly'
import {useReportFlowContext} from '../ReportFlowContext'
import {ProblemCompanyKindOverride} from './ProblemCompanyKindOverride'
import {ProblemConsumerWish} from './ProblemConsumerWish'
import {ProblemEmployeeConsumer} from './ProblemEmployeeConsumer'
import {ProblemSubcategories} from './ProblemSubcategories'
import {computeSelectedSubcategoriesData} from './useSelectedSubcategoriesData'

interface Props {
  anomaly: Anomaly
  isWebView: boolean
  stepNavigation: StepNavigation
}

export function Problem({anomaly, isWebView, stepNavigation}: Props) {
  const {reportDraft, setReportDraft, resetFlow} = useReportFlowContext()
  const {currentLang} = useI18n()
  const _analytic = useAnalyticContext()
  const isDraftInitialized = hasStep0(reportDraft) && anomaly.category === reportDraft.step0.category
  useEffect(() => {
    if (!isDraftInitialized) {
      _analytic.trackEvent(EventCategories.report, ReportEventActions.validateCategory, anomaly.category)
      resetFlow()
      setReportDraft(_ => initiateReportDraft(anomaly, currentLang))
    }
  }, [isDraftInitialized, setReportDraft, anomaly, currentLang, _analytic, resetFlow])
  if (!isDraftInitialized) {
    return null
  }
  return <ProblemInner {...{anomaly, isWebView, stepNavigation}} />
}

function ProblemInner({anomaly, isWebView, stepNavigation}: Props) {
  const {reportDraft, setReportDraft, sendReportEvent} = useReportFlowContext()
  const openFfSetup = useOpenFfSetup(anomaly)
  const rappelConsoSetup = useRappelConsoSetup(anomaly)
  useHandleOpenFfSetupLoaded(openFfSetup, setReportDraft)
  useHandleRcSetupLoaded(rappelConsoSetup, setReportDraft)
  if (!hasStep0(reportDraft)) {
    throw new Error('ReportDraft should have a lang and a category already (in Problem)')
  }
  const subcategories = hasSubcategoryIndexes(reportDraft) ? getSubcategories(reportDraft) : []
  const tags = hasSubcategoryIndexes(reportDraft) ? getTags(reportDraft) : []
  const hasTagProduitDangereux = tags.includes('ProduitDangereux')
  const hasReponseConsoTag = tags.includes('ReponseConso')
  const companyKindBeforeOverride = getWipCompanyKindFromSelected(reportDraft)
  const companyKindAfterOverride = getCompanyKind({...reportDraft, subcategoriesIndexes: reportDraft.subcategoriesIndexes ?? []})
  const predeterminedEmployeeConsumer = companyKindAfterOverride === 'SOCIAL' ? false : undefined
  const isTransmittable = isTransmittableToProBeforePickingConsumerWish(reportDraft)
  const askConsumerWish = isTransmittable && companyKindAfterOverride !== 'SOCIAL'

  const {lastSubcategories, isLastSubcategory, companyKindQuestion} = computeSelectedSubcategoriesData(subcategories)

  function onFinalSubmit(next: () => void): void {
    setReportDraft(draft => {
      // In the openFf scenario
      // Only if we got all the data, then we build the company/product from it.
      // If we only have partial data, then we will build it in step 2.
      const step2: Step2Model | undefined =
        draft.openFf && draft.openFf.product && draft.openFf.company
          ? {
              kind: 'product',
              barcodeProduct: draft.openFf.product,
              companyIdentification: {kind: 'companyFound', company: draft.openFf.company},
            }
          : draft.step2
      return {
        ...draft,
        consumerWish: askConsumerWish ? draft.consumerWish : 'companyImprovement',
        employeeConsumer: predeterminedEmployeeConsumer ?? draft.employeeConsumer,
        step2,
      }
    })
    sendReportEvent(stepNavigation.currentStep)
    next()
  }

  const specialCategoryNotLoading = openFfSetup.status !== 'loading' && rappelConsoSetup.status !== 'loading'
  return (
    <>
      <OpenFfWelcomeText setup={openFfSetup} />
      <RappelConsoWelcome setup={rappelConsoSetup} />
      {specialCategoryNotLoading && (
        <>
          <ProblemSubcategories {...{anomaly, isLastSubcategory, isWebView, lastSubcategories, subcategories}}>
            {() => (
              <ProblemEmployeeConsumer {...{predeterminedEmployeeConsumer}}>
                {() => (
                  <ProblemCompanyKindOverride {...{companyKindBeforeOverride, companyKindQuestion, hasTagProduitDangereux}}>
                    {() => (
                      <ProblemConsumerWish {...{askConsumerWish, hasReponseConsoTag}}>
                        {() => <ReportFlowStepperActions onNext={onFinalSubmit} {...{stepNavigation}} />}
                      </ProblemConsumerWish>
                    )}
                  </ProblemCompanyKindOverride>
                )}
              </ProblemEmployeeConsumer>
            )}
          </ProblemSubcategories>
        </>
      )}
    </>
  )
}
