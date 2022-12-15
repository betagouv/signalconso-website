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
import {ProblemContratualDisputeWarnPanel} from './ProblemContratualDisputeWarnPanel'
import {ProblemInformation} from './ProblemInformation'
import {ProblemSelect} from './ProblemSelect'
import {ProblemStepperStep, ProblemStepper} from './ProblemStepper'
import {computeSelectedSubcategoriesData} from './useSelectedSubcategoriesData'

interface Props {
  anomaly: Anomaly
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
  if (draft.forwardToReponseConso !== true) {
    res = res.filter(_ => _ !== 'ReponseConso')
  }
  return res
}

function chooseIfReponseConsoDisplayed(): boolean {
  return Math.random() * 100 < appConfig.reponseConsoDisplayRate
}

export const Problem = ({anomaly}: Props) => {
  const _analytic = useAnalyticContext()
  const {m} = useI18n()
  const displayReponseConso = useMemo(chooseIfReponseConsoDisplayed, [])
  const {reportDraft, setReportDraft, clearReportDraft} = useReportFlowContext()

  // reset the draft when switching the root category
  useEffect(() => {
    if (anomaly.category !== reportDraft.category) {
      _analytic.trackEvent(EventCategories.report, ReportEventActions.validateCategory, anomaly.category)
      clearReportDraft()
      setReportDraft({category: anomaly.category})
    }
  }, [anomaly.category])

  const {tagsFromSelected, lastSubcategories, isLastSubcategory, companyKindFromSelected} = useMemo(() => {
    return computeSelectedSubcategoriesData(reportDraft.subcategories ?? [])
  }, [reportDraft.subcategories])

  function onSubmit(next: () => void): void {
    setReportDraft(draft => {
      const {subcategories, ..._anomaly} = anomaly
      return {
        ...draft,
        tags: adjustTags(tagsFromSelected, draft, companyKindFromSelected),
        companyKind: companyKindFromSelected ?? draft.companyKind ?? 'SIRET',
        anomaly: _anomaly,
      }
    })
    next()
  }

  const handleSubcategoriesChange = (subcategory: Subcategory, index: number) => {
    setReportDraft(report => {
      const copy = {...report}
      copy.subcategories = report.subcategories ?? []
      copy.subcategories.length = index
      copy.subcategories[index] = subcategory
      copy.details = {}
      copy.subcategories = [...copy.subcategories]
      copy.tags = copy.tags ? copy.tags.filter(_ => _ !== 'Internet') : undefined
      copy.companyKind = undefined
      _analytic.trackEvent(
        EventCategories.report,
        ReportEventActions.validateSubcategory,
        copy.subcategories.map(_ => _.title),
      )
      return copy
    })
  }
  return (
    <>
      {[anomaly, ...(reportDraft.subcategories ?? [])].map(
        (c, i) =>
          c.subcategories && (
            <ProblemSelect
              autoScrollToPanel={i !== 0}
              key={c.id}
              title={c.subcategoriesTitle}
              value={reportDraft.subcategories?.[i]?.id}
              onChange={id => handleSubcategoriesChange(c.subcategories?.find(_ => _.id === id)!, i)}
              options={(c.subcategories ?? []).map((_, i) => ({
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
            information={(lastSubcategories as any).information}
          />
        ) : (
          <ProblemStepper renderDone={<ReportFlowStepperActions next={onSubmit} />}>
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
            <ProblemStepperStep
              isDone={reportDraft.contractualDispute !== undefined || reportDraft.forwardToReponseConso !== undefined}
              hidden={reportDraft.employeeConsumer === true}
            >
              <ProblemSelect
                id="select-contractualDispute"
                title="Que souhaitez-vous faire ?"
                value={(() => {
                  if (reportDraft.contractualDispute === true) return 1
                  if (reportDraft.contractualDispute === false) return 2
                  if (reportDraft.forwardToReponseConso === true) return 3
                })()}
                options={[
                  {
                    title: m.problemContractualDisputeFormYes,
                    description: m.problemContractualDisputeFormDesc,
                    value: 1,
                  },
                  {
                    title: m.problemContractualDisputeFormNo,
                    description: m.problemContractualDisputeFormNoDesc,
                    value: 2,
                  },
                  ...(displayReponseConso && tagsFromSelected.includes('ReponseConso')
                    ? [
                        {
                          title: m.problemContractualDisputeFormReponseConso,
                          value: 3,
                        },
                      ]
                    : []),
                ]}
                onChange={(value: number) => {
                  const updateAndTrack = (change: Partial<ReportDraft2>) => {
                    setReportDraft(old => {
                      const d = {...old, ...change}
                      _analytic.trackEvent(
                        EventCategories.report,
                        ReportEventActions.contactualReport,
                        d.contractualDispute ? 'Oui' : 'Non',
                      )
                      return d
                    })
                  }
                  switch (value) {
                    case 1: {
                      updateAndTrack({forwardToReponseConso: undefined, contractualDispute: true})
                      break
                    }
                    case 2: {
                      updateAndTrack({forwardToReponseConso: undefined, contractualDispute: false})
                      break
                    }
                    case 3: {
                      updateAndTrack({forwardToReponseConso: true, contractualDispute: undefined})
                      break
                    }
                  }
                }}
              />
            </ProblemStepperStep>
            <ProblemStepperStep isDone={true} hidden={reportDraft.contractualDispute !== true}>
              <ProblemContratualDisputeWarnPanel />
            </ProblemStepperStep>
          </ProblemStepper>
        ))}
    </>
  )
}
