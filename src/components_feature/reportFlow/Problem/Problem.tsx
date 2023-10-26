import {useAnalyticContext} from 'analytic/AnalyticContext'
import {EventCategories, ReportEventActions} from 'analytic/analytic'
import {StepNavigation} from 'components_feature/reportFlow/reportFlowStepper/ReportFlowStepper'
import {ReportFlowStepperActions} from 'components_feature/reportFlow/reportFlowStepper/ReportFlowStepperActions'
import {useI18n} from 'i18n/I18n'
import {ConsumerWish, ReportDraft} from 'model/ReportDraft'
import {ReportDraft2} from 'model/ReportDraft2'
import {useEffect, useMemo} from 'react'
import {instanceOfSubcategoryWithInfoWall} from '../../../anomalies/Anomalies'
import {Anomaly, CompanyKinds, ReportTag, Subcategory} from '../../../anomalies/Anomaly'
import {useReportFlowContext} from '../ReportFlowContext'
import {ProblemConsumerWishInformation} from './ProblemConsumerWishInformation'
import {ProblemInformation} from './ProblemInformation'
import {ProblemSelect} from './ProblemSelect'
import {ProblemStepper, ProblemStepperStep} from './ProblemStepper'
import {computeSelectedSubcategoriesData} from './useSelectedSubcategoriesData'
import {AppLang} from '../../../i18n/localization/AppLangs'

interface Props {
  anomaly: Anomaly
  isWebView: boolean
  stepNavigation: StepNavigation
}

function buildTagsFromSubcategories(subcategories: Subcategory[]) {
  return computeSelectedSubcategoriesData(subcategories).tagsFromSelected
}

function adjustTagsBeforeSubmit(draft: Partial<ReportDraft2>, companyKindFromSelected: CompanyKinds | undefined): ReportTag[] {
  let res = draft.tags ?? []
  if (
    companyKindFromSelected === 'WEBSITE' ||
    draft.companyKind === 'WEBSITE' ||
    draft.companyKind === 'MERCHANT_WEBSITE' ||
    draft.companyKind === 'TRANSPORTER_WEBSITE'
  ) {
    res = [...res, 'Internet']
  }
  // This tag is used in the arborescence only to offer the choice of 'getAnswer'
  // If selected, the tag will be added back just before submitting to the API
  res = res.filter(_ => _ !== 'ReponseConso')
  return res
}

export function initiateReportDraftForAnomaly(anomaly: Anomaly, lang: AppLang): Partial<ReportDraft2> {
  return {category: anomaly.category, lang}
}

export function adjustReportDraftAfterSubcategoriesChange(
  report: Partial<ReportDraft2>,
  subcategory: Subcategory,
  subcategoryIndex: number,
) {
  const subcategoriesToKeep = (report.subcategories ?? []).slice(0, subcategoryIndex)
  const subcategories = [...subcategoriesToKeep, subcategory]
  const tags = buildTagsFromSubcategories(subcategories)
  //Recompute company kind based on current report selected subcategories
  const lastCategoryCompanyKind = subcategories
    .map(_ => _.companyKind)
    .filter(_ => _ !== undefined)
    .pop()

  const copy = {
    ...report,
    subcategories,
    tags,
    companyKind: lastCategoryCompanyKind,
    companyDraft: undefined,
    // Category has changed, user need to reconfirm consumerWish & employeeConsumer because :
    // - Some categories have "getAnswer" (that is not available for all categories so we have to clean up those properties)
    // - Some categories set default values for these properties (CompanyKind SOCIAL)
    consumerWish: undefined,
    employeeConsumer: undefined,
  }
  return copy
}

export const Problem = ({anomaly, isWebView, stepNavigation}: Props) => {
  const _analytic = useAnalyticContext()
  const {m, currentLang} = useI18n()
  const {reportDraft, setReportDraft, resetFlow, sendReportEvent} = useReportFlowContext()

  // reset the draft when switching the root category
  useEffect(() => {
    if (anomaly.category !== reportDraft.category) {
      _analytic.trackEvent(EventCategories.report, ReportEventActions.validateCategory, anomaly.category)
      resetFlow()
      setReportDraft(_ => initiateReportDraftForAnomaly(anomaly, currentLang))
    }
  }, [anomaly.category])

  const isTransmittable = ReportDraft.isTransmittableToProBeforePickingConsumerWish(reportDraft)
  const askConsumerWish = isTransmittable && reportDraft.companyKind !== 'SOCIAL'

  const {
    lastSubcategories,
    isLastSubcategory,
    companyKindFromSelected,
    companyKindQuestionFromSelected,
    responseconsoCodeFromSelected,
    ccrfCodeFromSelected,
  } = useMemo(() => {
    return computeSelectedSubcategoriesData(reportDraft.subcategories ?? [])
  }, [reportDraft.subcategories])

  function onSubmit(next: () => void): void {
    setReportDraft(draft => {
      const {subcategories, ..._anomaly} = anomaly
      const consumerWish = askConsumerWish ? draft.consumerWish : 'companyImprovement'
      //Company kind 'SOCIAL' cannot be employee consumer report
      const employeeConsumer = draft.companyKind === 'SOCIAL' ? false : draft.employeeConsumer

      const updatedDraft = {
        ...draft,
        ccrfCode: ccrfCodeFromSelected,
        reponseconsoCode: responseconsoCodeFromSelected,
        tags: adjustTagsBeforeSubmit(draft, companyKindFromSelected),
        companyKind: companyKindFromSelected ?? draft.companyKind ?? 'SIRET',
        anomaly: _anomaly,
        consumerWish,
        employeeConsumer,
      }
      return updatedDraft
    })

    sendReportEvent(stepNavigation.currentStep)
    next()
  }

  const handleSubcategoriesChange = (subcategory: Subcategory, index: number) => {
    setReportDraft(report => {
      const newReport = adjustReportDraftAfterSubcategoriesChange(report, subcategory, index)
      return newReport
    })
  }

  const tags = reportDraft.tags ?? []

  return (
    <>
      {[anomaly, ...(reportDraft.subcategories ?? [])].map(
        (category, idx) =>
          category.subcategories && (
            <ProblemSelect
              autoScrollTo={idx !== 0}
              key={category.id}
              title={category.subcategoriesTitle}
              value={reportDraft.subcategories?.[idx]?.id}
              onChange={id => handleSubcategoriesChange(category.subcategories?.find(_ => _.id === id)!, idx)}
              options={(category.subcategories ?? []).map((_, i) => ({
                title: _.title,
                description: _.desc,
                value: _.id,
              }))}
            />
          ),
      )}
      {isLastSubcategory &&
        reportDraft.subcategories &&
        (instanceOfSubcategoryWithInfoWall(lastSubcategories) ? (
          <ProblemInformation
            anomaly={anomaly}
            subcategories={reportDraft.subcategories}
            information={lastSubcategories.blockingInfo}
            {...{isWebView}}
          />
        ) : (
          <ProblemStepper renderDone={<ReportFlowStepperActions onNext={onSubmit} {...{stepNavigation}} />}>
            <ProblemStepperStep isDone={reportDraft.employeeConsumer !== undefined} hidden={reportDraft.companyKind === 'SOCIAL'}>
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
            <ProblemStepperStep isDone={reportDraft.companyKind !== undefined} hidden={!!companyKindFromSelected}>
              {companyKindQuestionFromSelected ? (
                <ProblemSelect<CompanyKinds>
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
                <ProblemSelect<CompanyKinds>
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
                      value: tags.indexOf('ProduitDangereux') === -1 ? 'SIRET' : 'LOCATION',
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
                  ...(tags.includes('ReponseConso')
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
  )
}
