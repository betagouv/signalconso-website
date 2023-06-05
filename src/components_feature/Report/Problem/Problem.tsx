import {EventCategories, ReportEventActions} from 'analytic/analytic'
import {useAnalyticContext} from 'analytic/AnalyticContext'
import {StepNavigation} from 'components_simple/ReportFlowStepper/ReportFlowStepper'
import {ReportFlowStepperActions} from 'components_simple/ReportFlowStepper/ReportFlowStepperActions'
import {appConfig} from 'core/appConfig'
import {useI18n} from 'i18n/I18n'
import {ConsumerWish} from 'model/ReportDraft'
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

interface Props {
  anomaly: Anomaly
  isWebView: boolean
  stepNavigation: StepNavigation
}

function adjustTags(
  tags: ReportTag[],
  draft: Partial<ReportDraft2>,
  companyKindFromSelected: CompanyKinds | undefined,
): ReportTag[] {
  let res = tags
  if (companyKindFromSelected === 'WEBSITE' || draft.companyKind === 'WEBSITE') {
    res = [...res, 'Internet']
  }
  // This tag is used in the arborescence only to offer the choice of 'getAnswer'
  // If selected, the tag will be added back just before submitting to the API
  res = res.filter(_ => _ !== 'ReponseConso')
  return res
}

function chooseIfReponseConsoDisplayed(): boolean {
  return Math.random() * 100 < appConfig.reponseConsoDisplayRate
}

export function initiateReportDraftForAnomaly(anomaly: Anomaly): Partial<ReportDraft2> {
  return {category: anomaly.category}
}

export function adjustReportDraftAfterSubcategoriesChange(
  report: Partial<ReportDraft2>,
  subcategory: Subcategory,
  subcategoryIndex: number,
) {
  const subcategoriesToKeep = (report.subcategories ?? []).slice(0, subcategoryIndex)
  const subcategories = [...subcategoriesToKeep, subcategory]
  const tags = report.tags?.filter(_ => _ !== 'Internet') ?? undefined

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
  const {m} = useI18n()
  const displayReponseConso = useMemo(chooseIfReponseConsoDisplayed, [])
  const {reportDraft, setReportDraft, resetFlow} = useReportFlowContext()

  // reset the draft when switching the root category
  useEffect(() => {
    if (anomaly.category !== reportDraft.category) {
      _analytic.trackEvent(EventCategories.report, ReportEventActions.validateCategory, anomaly.category)
      resetFlow()
      setReportDraft(_ => initiateReportDraftForAnomaly(anomaly))
    }
  }, [anomaly.category])

  const {
    tagsFromSelected,
    lastSubcategories,
    isLastSubcategory,
    companyKindFromSelected,
    responseconsoCodeFromSelected,
    ccrfCodeFromSelected,
  } = useMemo(() => {
    return computeSelectedSubcategoriesData(reportDraft.subcategories ?? [])
  }, [reportDraft.subcategories])

  function onSubmit(next: () => void): void {
    setReportDraft(draft => {
      const {subcategories, ..._anomaly} = anomaly
      // employeeConsumer and reports on social influencer don't get this choice, we automatically apply the standard option
      const consumerWish = draft.employeeConsumer || draft.companyKind === 'SOCIAL' ? 'companyImprovement' : draft.consumerWish
      //Company kind 'SOCIAL' cannot be employee consumer report
      const employeeConsumer = draft.companyKind === 'SOCIAL' ? false : draft.employeeConsumer

      const updatedDraft = {
        ...draft,
        ccrfCode: ccrfCodeFromSelected,
        reponseconsoCode: responseconsoCodeFromSelected,
        tags: adjustTags(tagsFromSelected, draft, companyKindFromSelected),
        companyKind: companyKindFromSelected ?? draft.companyKind ?? 'SIRET',
        anomaly: _anomaly,
        consumerWish,
        employeeConsumer,
      }
      return updatedDraft
    })
    next()
  }

  const handleSubcategoriesChange = (subcategory: Subcategory, index: number) => {
    setReportDraft(report => {
      const newReport = adjustReportDraftAfterSubcategoriesChange(report, subcategory, index)
      _analytic.trackEvent(
        EventCategories.report,
        ReportEventActions.validateSubcategory,
        newReport.subcategories?.map(_ => _.title) ?? [],
      )
      return newReport
    })
  }

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
          <ProblemStepper renderDone={<ReportFlowStepperActions next={onSubmit} {...{stepNavigation}} />}>
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
              {anomaly.companyKindQuestion ? (
                <ProblemSelect<CompanyKinds>
                  id="select-companyKind"
                  title={anomaly.companyKindQuestion.label}
                  value={reportDraft.companyKind}
                  onChange={companyKind => setReportDraft(_ => ({..._, companyKind}))}
                  options={anomaly.companyKindQuestion.options.map(option => {
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
                      value: tagsFromSelected.indexOf('ProduitDangereux') === -1 ? 'SIRET' : 'LOCATION',
                    },
                  ]}
                />
              )}
            </ProblemStepperStep>
            <ProblemStepperStep
              isDone={reportDraft.consumerWish !== undefined}
              hidden={reportDraft.employeeConsumer === true || reportDraft.companyKind === 'SOCIAL'}
            >
              <ProblemSelect
                id="select-contractualDispute"
                title="Que souhaitez-vous faire ?"
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
                  ...(displayReponseConso && tagsFromSelected.includes('ReponseConso')
                    ? [
                        {
                          title: m.problemContractualDisputeFormReponseConso,
                          description:
                            "Exemple : Quelle est la durée de validité du devis qu'on m'a donné ? Un magasin peut-il vendre des produits périmés ? ...",
                          value: 'getAnswer' as const,
                        },
                      ]
                    : []),
                ]}
                onChange={(consumerWish: ConsumerWish) => {
                  setReportDraft(report => {
                    const updated = {...report, consumerWish}
                    _analytic.trackEvent(
                      EventCategories.report,
                      ReportEventActions.contactualReport,
                      updated.consumerWish === 'fixContractualDispute' ? 'Oui' : 'Non',
                    )
                    return updated
                  })
                }}
              />
            </ProblemStepperStep>
            <ProblemStepperStep isDone={true} hidden={!reportDraft.consumerWish}>
              {reportDraft.consumerWish && <ProblemConsumerWishInformation consumerWish={reportDraft.consumerWish} />}
            </ProblemStepperStep>
          </ProblemStepper>
        ))}
    </>
  )
}
