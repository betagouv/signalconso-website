import {useAnalyticContext} from '@/analytic/AnalyticContext'
import {EventCategories, ReportEventActions} from '@/analytic/analytic'
import {StepNavigation} from '@/components_feature/reportFlow/reportFlowStepper/ReportFlowStepper'
import {ReportFlowStepperActions} from '@/components_feature/reportFlow/reportFlowStepper/ReportFlowStepperActions'
import {FriendlyHelpText} from '@/components_simple/FriendlyHelpText'
import {OpenFfWelcomeText, useOpenFfSetup} from '@/feature/openFoodFacts'
import {RappelConsoWelcome, useRappelConsoSetup} from '@/feature/rappelConso'
import {
  getSubcategories,
  getTags,
  hasStep0,
  hasSubcategoryIndexes,
  isTransmittableToProBeforePickingConsumerWish,
} from '@/feature/reportDraftUtils'
import {useI18n} from '@/i18n/I18n'
import {ConsumerWish} from '@/model/ReportDraft'
import {ReportDraft2} from '@/model/ReportDraft2'
import {Step2Model} from '@/model/Step2Model'
import {useEffect, useMemo} from 'react'
import {instanceOfSubcategoryWithInfoWall} from '../../../anomalies/Anomalies'
import {Anomaly, CompanyKind} from '../../../anomalies/Anomaly'
import {AppLang} from '../../../i18n/localization/AppLangs'
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

export function initiateReportDraftForAnomaly(anomaly: Anomaly, lang: AppLang): Partial<ReportDraft2> {
  return {
    step0: {category: anomaly.category, lang},
    subcategoriesIndexes: [],
  }
}

export function adjustReportDraftAfterSubcategoriesChange(
  report: Partial<ReportDraft2>,
  subcategoryIndex: number,
  subcategoryDepthIndex: number,
): Partial<ReportDraft2> {
  if (!hasStep0(report)) {
    throw new Error('ReportDraft should have a lang and a category already')
  }
  const newSubcategoriesIndexes = [...(report.subcategoriesIndexes ?? []).slice(0, subcategoryDepthIndex), subcategoryIndex]
  const newSubcategories = getSubcategories({
    ...report,
    subcategoriesIndexes: newSubcategoriesIndexes,
  })
  //Recompute company kind based on current report selected subcategories
  const lastCategoryCompanyKind = newSubcategories
    .map(_ => _.companyKind)
    .filter(_ => _ !== undefined)
    .pop()

  return {
    ...report,
    subcategoriesIndexes: newSubcategoriesIndexes,
    companyKind: lastCategoryCompanyKind,
    step2: undefined,
    // Category has changed, user need to reconfirm consumerWish & employeeConsumer because :
    // - Some categories have "getAnswer" (that is not available for all categories so we have to clean up those properties)
    // - Some categories set default values for these properties (CompanyKind SOCIAL)
    consumerWish: undefined,
    employeeConsumer: undefined,
  }
}

export function Problem({anomaly, isWebView, stepNavigation}: Props) {
  const {reportDraft, setReportDraft, resetFlow} = useReportFlowContext()
  const {m, currentLang} = useI18n()
  const _analytic = useAnalyticContext()
  const isReportInitializedForAnomaly = hasStep0(reportDraft) && anomaly.category === reportDraft.step0.category
  useEffect(() => {
    if (!isReportInitializedForAnomaly) {
      _analytic.trackEvent(EventCategories.report, ReportEventActions.validateCategory, anomaly.category)
      resetFlow()
      setReportDraft(_ => initiateReportDraftForAnomaly(anomaly, currentLang))
    }
  }, [isReportInitializedForAnomaly, setReportDraft, anomaly, currentLang, _analytic, resetFlow])

  if (!isReportInitializedForAnomaly) {
    return null
  }
  return <ProblemInitialized {...{anomaly, isWebView, stepNavigation}} />
}

const ProblemInitialized = ({anomaly, isWebView, stepNavigation}: Props) => {
  const _analytic = useAnalyticContext()
  const {m} = useI18n()
  const {reportDraft, setReportDraft, sendReportEvent} = useReportFlowContext()
  if (!hasStep0(reportDraft)) {
    throw new Error('ReportDraft should have a lang and a category already (in Problem)')
  }
  const subcategories = hasSubcategoryIndexes(reportDraft) ? getSubcategories(reportDraft) : []
  const tags = hasSubcategoryIndexes(reportDraft) ? getTags(reportDraft) : []
  const hasTagProduitDangereux = tags.includes('ProduitDangereux')
  const hasReponseConsoSubcategories = tags.includes('ReponseConso')
  const openFfSetup = useOpenFfSetup(anomaly)
  const rappelConsoSetup = useRappelConsoSetup(anomaly)

  useEffect(() => {
    // when we come from openFf and we get the async data
    if (openFfSetup.status === 'loaded') {
      // Store the data into the reportFlow
      setReportDraft(_ => ({
        ..._,
        openFf: openFfSetup.result,
      }))
    }

    if (rappelConsoSetup.status === 'loaded') {
      // Store the data into the reportFlow
      setReportDraft(_ => ({
        ..._,
        rappelConso: rappelConsoSetup.result,
      }))
    }
  }, [openFfSetup, rappelConsoSetup, setReportDraft])

  const isTransmittable = isTransmittableToProBeforePickingConsumerWish(reportDraft)
  const askConsumerWish = isTransmittable && reportDraft.companyKind !== 'SOCIAL'

  const {
    lastSubcategories,
    isLastSubcategory,
    companyKindFromSelected,
    companyKindQuestionFromSelected,
    responseconsoCodeFromSelected,
    ccrfCodeFromSelected,
    categoryOverrideFromSelected,
  } = useMemo(() => {
    return computeSelectedSubcategoriesData(anomaly, subcategories)
  }, [subcategories])

  function onSubmit(next: () => void): void {
    setReportDraft(draft => {
      const consumerWish = askConsumerWish ? draft.consumerWish : 'companyImprovement'
      // Company kind 'SOCIAL' cannot be employee consumer report
      const employeeConsumer = draft.companyKind === 'SOCIAL' ? false : draft.employeeConsumer
      const companyKind = companyKindFromSelected ?? draft.companyKind ?? 'SIRET'

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

      const updatedDraft: Partial<ReportDraft2> = {
        ...draft,
        ccrfCode: ccrfCodeFromSelected,
        reponseconsoCode: responseconsoCodeFromSelected,
        companyKind,
        consumerWish,
        employeeConsumer,
        categoryOverride: categoryOverrideFromSelected,
        step2,
      }
      return updatedDraft
    })

    sendReportEvent(stepNavigation.currentStep)
    next()
  }

  const handleSubcategoriesChange = (subcategoryIndex: number, subcategoryDepthIndex: number) => {
    setReportDraft(report => {
      return adjustReportDraftAfterSubcategoriesChange(report, subcategoryIndex, subcategoryDepthIndex)
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
              <ProblemStepper renderDone={<ReportFlowStepperActions onNext={onSubmit} {...{stepNavigation}} />}>
                <ProblemStepperStep
                  isDone={reportDraft.employeeConsumer !== undefined}
                  hidden={reportDraft.companyKind === 'SOCIAL'}
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
                <ProblemStepperStep isDone={reportDraft.companyKind !== undefined} hidden={!!companyKindFromSelected}>
                  {companyKindQuestionFromSelected ? (
                    <ProblemSelect<CompanyKind>
                      id="select-companyKind"
                      title={companyKindQuestionFromSelected.label}
                      value={reportDraft.companyKind}
                      onChange={companyKind => setReportDraft(_ => ({..._, companyKind}))}
                      options={companyKindQuestionFromSelected.options.map(option => {
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
                      value={reportDraft.companyKind}
                      onChange={companyKind => setReportDraft(_ => ({..._, companyKind}))}
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
