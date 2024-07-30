import {useAnalyticContext} from '@/analytic/AnalyticContext'
import {EventCategories, ReportEventActions} from '@/analytic/analytic'
import {StepNavigation} from '@/components_feature/reportFlow/reportFlowStepper/ReportFlowStepper'
import {ReportFlowStepperActions} from '@/components_feature/reportFlow/reportFlowStepper/ReportFlowStepperActions'
import {FriendlyHelpText} from '@/components_simple/FriendlyHelpText'
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
import {ConsumerWish} from '@/model/ReportDraft'
import {initiateReportDraft, ReportDraft2} from '@/model/ReportDraft2'
import {Step2Model} from '@/model/Step2Model'
import {useEffect} from 'react'
import {instanceOfSubcategoryWithInfoWall} from '../../../anomalies/Anomalies'
import {Anomaly, CompanyKind} from '../../../anomalies/Anomaly'
import {useReportFlowContext} from '../ReportFlowContext'
import {ProblemConsumerWishInformation} from './ProblemConsumerWishInformation'
import {ProblemInformation} from './ProblemInformation'
import {ProblemSelect} from './ProblemSelect'
import {ProblemStepper, ProblemStepperStep} from './ProblemStepper'
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
  const _analytic = useAnalyticContext()
  const {m} = useI18n()
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
  const hasReponseConsoSubcategories = tags.includes('ReponseConso')
  const companyKindOverride = reportDraft.companyKindOverride
  const companyKindBeforeOverride = getWipCompanyKindFromSelected(reportDraft)
  const companyKindAfterOverride = getCompanyKind({...reportDraft, subcategoriesIndexes: reportDraft.subcategoriesIndexes ?? []})
  const predeterminedEmployeeConsumer = companyKindAfterOverride === 'SOCIAL' ? false : undefined
  const isTransmittable = isTransmittableToProBeforePickingConsumerWish(reportDraft)
  const askConsumerWish = isTransmittable && companyKindAfterOverride !== 'SOCIAL'

  const {lastSubcategories, isLastSubcategory, companyKindQuestion} = computeSelectedSubcategoriesData(anomaly, subcategories)

  function onFinalSubmit(next: () => void): void {
    setReportDraft(draft => {
      const {reponseconsoCode, ccrfCode, categoryOverride} = computeSelectedSubcategoriesData(anomaly, subcategories)
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
        ccrfCode,
        reponseconsoCode,
        categoryOverride,
        consumerWish: askConsumerWish ? draft.consumerWish : 'companyImprovement',
        employeeConsumer: predeterminedEmployeeConsumer ?? draft.employeeConsumer,
        step2,
      }
    })
    sendReportEvent(stepNavigation.currentStep)
    next()
  }

  const handleSubcategoriesChange = (subcategoryIndex: number, subcategoryDepthIndex: number) => {
    setReportDraft(report => {
      return applySubcategoriesChange(report, subcategoryIndex, subcategoryDepthIndex)
    })
  }

  const specialCategoryNotLoading = openFfSetup.status !== 'loading' && rappelConsoSetup.status !== 'loading'
  return (
    <>
      <OpenFfWelcomeText setup={openFfSetup} />
      <RappelConsoWelcome setup={rappelConsoSetup} />
      {specialCategoryNotLoading && (
        <>
          {[anomaly, ...subcategories].map(
            (category, subcategoryDepthIdx) =>
              category.subcategories && (
                <ProblemSelect
                  autoScrollTo={subcategoryDepthIdx !== 0}
                  key={category.id}
                  title={category.subcategoriesTitle}
                  value={subcategories[subcategoryDepthIdx]?.id}
                  onChange={id =>
                    handleSubcategoriesChange(category.subcategories?.findIndex(_ => _.id === id)!, subcategoryDepthIdx)
                  }
                  options={(category.subcategories ?? []).map((_, i) => ({
                    title: _.title,
                    description: _.desc,
                    value: _.id,
                  }))}
                />
              ),
          )}
          {isLastSubcategory &&
            (instanceOfSubcategoryWithInfoWall(lastSubcategories) ? (
              <ProblemInformation
                anomaly={anomaly}
                subcategories={subcategories}
                information={lastSubcategories.blockingInfo}
                {...{isWebView}}
              />
            ) : (
              <ProblemStepper renderDone={<ReportFlowStepperActions onNext={onFinalSubmit} {...{stepNavigation}} />}>
                <ProblemStepperStep
                  isDone={reportDraft.employeeConsumer !== undefined}
                  hidden={predeterminedEmployeeConsumer !== undefined}
                >
                  <ProblemSelect
                    id="select-employeeconsumer"
                    title={m.problemDoYouWorkInCompany}
                    value={reportDraft.employeeConsumer}
                    onChange={employeeConsumer => setReportDraft(_ => ({..._, employeeConsumer}))}
                    options={[
                      {
                        title: m.problemDoYouWorkInCompanyNo,
                        value: false,
                      },
                      {
                        title: m.yes,
                        value: true,
                      },
                    ]}
                  />
                </ProblemStepperStep>
                <ProblemStepperStep isDone={true} hidden={!reportDraft.employeeConsumer}>
                  <FriendlyHelpText>
                    <p className="mb-0" dangerouslySetInnerHTML={{__html: m.employeeConsumerInformation}} />
                  </FriendlyHelpText>
                </ProblemStepperStep>
                <ProblemStepperStep isDone={!!companyKindOverride} hidden={!!companyKindBeforeOverride}>
                  {companyKindQuestion ? (
                    <ProblemSelect<CompanyKind>
                      id="select-companyKind"
                      title={companyKindQuestion.label}
                      value={companyKindOverride}
                      onChange={value => setReportDraft(_ => ({..._, companyKindOverride: value}))}
                      options={companyKindQuestion.options.map(option => {
                        return {
                          title: option.label,
                          value: option.companyKind,
                        }
                      })}
                    />
                  ) : (
                    <ProblemSelect<CompanyKind>
                      id="select-companyKind"
                      title={m.problemIsInternetCompany}
                      value={companyKindOverride}
                      onChange={value => {
                        setReportDraft(_ => ({..._, companyKindOverride: value}))
                      }}
                      options={[
                        {
                          title: m.yes,
                          value: 'WEBSITE',
                        },
                        {
                          title: m.problemIsInternetCompanyNo,
                          value: hasTagProduitDangereux ? 'LOCATION' : 'SIRET',
                        },
                      ]}
                    />
                  )}
                </ProblemStepperStep>

                <ProblemStepperStep isDone={reportDraft.consumerWish !== undefined} hidden={!askConsumerWish}>
                  <ProblemSelect
                    id="select-contractualDispute"
                    title={m.whatsYourIntent}
                    value={reportDraft.consumerWish}
                    options={[
                      {
                        title: m.problemContractualDisputeFormYes,
                        description: m.problemContractualDisputeFormDesc,
                        value: 'fixContractualDispute',
                      },
                      {
                        title: m.problemContractualDisputeFormNo,
                        description: m.problemContractualDisputeFormNoDesc,
                        value: 'companyImprovement',
                      },
                      ...(hasReponseConsoSubcategories
                        ? [
                            {
                              title: m.problemContractualDisputeFormReponseConso,
                              description: m.problemContractualDisputeFormReponseConsoExample,
                              value: 'getAnswer' as const,
                            },
                          ]
                        : []),
                    ]}
                    onChange={(consumerWish: ConsumerWish) => {
                      setReportDraft(report => {
                        const updated = {...report, consumerWish}
                        _analytic.trackEvent(EventCategories.report, ReportEventActions.consumerWish, updated.consumerWish)
                        return updated
                      })
                    }}
                  />
                </ProblemStepperStep>
                <ProblemStepperStep isDone={true} hidden={!(askConsumerWish && reportDraft.consumerWish)}>
                  {reportDraft.consumerWish && <ProblemConsumerWishInformation consumerWish={reportDraft.consumerWish} />}
                </ProblemStepperStep>
              </ProblemStepper>
            ))}
        </>
      )}
    </>
  )
}

function applySubcategoriesChange(
  report: Partial<ReportDraft2>,
  subcategoryIndex: number,
  subcategoryDepthIndex: number,
): Partial<ReportDraft2> {
  if (!hasStep0(report)) {
    throw new Error('ReportDraft should have a lang and a category already')
  }
  const newSubcategoriesIndexes = [...(report.subcategoriesIndexes ?? []).slice(0, subcategoryDepthIndex), subcategoryIndex]
  return {
    ...report,
    subcategoriesIndexes: newSubcategoriesIndexes,
    step2: undefined,
    // Subcategory has changed, we clear consumerWish & employeeConsumer because :
    // - Some subcats have "getAnswer" (that is not available for all subcats so we have to clean up those properties)
    // - Some subcats set default values for these properties (CompanyKind SOCIAL)
    consumerWish: undefined,
    employeeConsumer: undefined,
    companyKindOverride: undefined,
  }
}
