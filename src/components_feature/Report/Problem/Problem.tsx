import {appConfig} from 'core/appConfig'
import {EventCategories, ReportEventActions} from 'analytic/analytic'
import {useAnalyticContext} from 'analytic/AnalyticContext'
import {useI18n} from 'i18n/I18n'
import {ReportDraft2} from 'model/ReportDraft2'
import {useEffect, useMemo} from 'react'
import {ReportFlowStepperActions} from 'components_simple/ReportFlowStepper/ReportFlowStepperActions'
import {instanceOfSubcategoryInformation} from '../../../anomalies/Anomalies'
import {Anomaly, CompanyKinds, ReportTag, Subcategory} from '../../../anomalies/Anomaly'
import {useReportFlowContext} from '../ReportFlowContext'
import {ProblemConsumerWishInformation, ProblemContractualDisputeWarnPanel} from './ProblemConsumerWishInformation'
import {ProblemInformation} from './ProblemInformation'
import {ProblemSelect} from './ProblemSelect'
import {ProblemStepperStep, ProblemStepper} from './ProblemStepper'
import {computeSelectedSubcategoriesData} from './useSelectedSubcategoriesData'
import {StepNavigation} from 'components_simple/ReportFlowStepper/ReportFlowStepper'
import {ConsumerWish} from 'model/ReportDraft'

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

function adjustReportDraftAfterSubcategoriesChange(report: Partial<ReportDraft2>, subcategory: Subcategory, index: number) {
  const subcategoriesToKeep = (report.subcategories ?? []).slice(0, index)
  const subcategories = [...subcategoriesToKeep, subcategory]
  const tags = report.tags?.filter(_ => _ !== 'Internet') ?? undefined
  // L'option "getAnswer" n'est pas disponible pour toutes les catégories, on la nettoie pour être safe
  const consumerWish = report.consumerWish === 'getAnswer' ? undefined : report.consumerWish
  const copy = {...report, subcategories, tags, details: {}, companyKind: undefined, companyDraft: undefined, consumerWish}
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
      setReportDraft(_ => ({category: anomaly.category}))
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
      // employeeConsumer don't get this choice, we automatically apply the standard option
      const consumerWish = draft.employeeConsumer ? 'companyImprovement' : draft.consumerWish
      return {
        ...draft,
        ccrfCode: ccrfCodeFromSelected,
        reponseconsoCode: responseconsoCodeFromSelected,
        tags: adjustTags(tagsFromSelected, draft, companyKindFromSelected),
        companyKind: companyKindFromSelected ?? draft.companyKind ?? 'SIRET',
        anomaly: _anomaly,
        consumerWish,
      }
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
                description: _.example,
                value: _.id,
              }))}
            />
          ),
      )}
      {isLastSubcategory &&
        reportDraft.subcategories &&
        (instanceOfSubcategoryInformation(lastSubcategories) ? (
          <ProblemInformation
            anomaly={anomaly}
            subcategories={reportDraft.subcategories}
            information={lastSubcategories.information}
            {...{isWebView}}
          />
        ) : (
          <ProblemStepper renderDone={<ReportFlowStepperActions next={onSubmit} {...{stepNavigation}} />}>
            <ProblemStepperStep isDone={reportDraft.employeeConsumer !== undefined}>
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
            </ProblemStepperStep>
            <ProblemStepperStep isDone={reportDraft.consumerWish !== undefined} hidden={reportDraft.employeeConsumer === true}>
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
                onChange={(value: ConsumerWish) => {
                  const updateAndTrack = (change: Partial<ReportDraft2>) => {
                    setReportDraft(old => {
                      const d = {...old, ...change}
                      _analytic.trackEvent(
                        EventCategories.report,
                        ReportEventActions.contactualReport,
                        d.consumerWish === 'fixContractualDispute' ? 'Oui' : 'Non',
                      )
                      return d
                    })
                  }
                  updateAndTrack({consumerWish: value})
                }}
              />
            </ProblemStepperStep>
            <ProblemStepperStep isDone={true} hidden={!reportDraft.consumerWish}>
              {appConfig.enableBlueExplanations && reportDraft.consumerWish && (
                <ProblemConsumerWishInformation consumerWish={reportDraft.consumerWish} />
              )}
            </ProblemStepperStep>
            <ProblemStepperStep isDone={true} hidden={reportDraft.consumerWish !== 'fixContractualDispute'}>
              {appConfig.enableBlueExplanations || <ProblemContractualDisputeWarnPanel />}
            </ProblemStepperStep>
          </ProblemStepper>
        ))}
    </>
  )
}
