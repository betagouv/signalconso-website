import {appConfig} from 'conf/appConfig'
import {EventCategories, ReportEventActions} from 'core/analytic/analytic'
import {useAnalyticContext} from 'core/analytic/AnalyticContext'
import {useI18n} from 'core/i18n'
import {ReportDraft2} from 'core/model/ReportDraft'
import {useEffect, useMemo} from 'react'
import {StepperActions} from 'shared/Stepper/StepperActions'
import {instanceOfSubcategoryInformation} from '../../../anomaly/Anomalies'
import {Anomaly, CompanyKinds, ReportTag, Subcategory} from '../../../anomaly/Anomaly'
import {useReportFlowContext} from '../ReportFlowContext'
import {ProblemContratualDisputeWarnPanel} from './ProblemContratualDisputeWarnPanel'
import {ProblemInformation} from './ProblemInformation'
import {ProblemSelect} from './ProblemSelect'
import {Step, Stepper} from './Stepper'
import {useSelectedSubcategoriesUtils} from './useSelectedSubcategoriesUtils'

interface Props {
  anomaly: Anomaly
}

export const Problem = ({anomaly}: Props) => {
  const _analytic = useAnalyticContext()
  const {m} = useI18n()
  const displayReponseConso = useMemo(() => Math.random() * 100 < appConfig.reponseConsoDisplayRate, [])
  const {reportDraft, setReportDraft, clearReportDraft} = useReportFlowContext()

  useEffect(() => {
    if (anomaly.category !== reportDraft.category) {
      _analytic.trackEvent(EventCategories.report, ReportEventActions.validateCategory, anomaly.category)
      clearReportDraft()
      setReportDraft({category: anomaly.category})
    }
  }, [anomaly.category])

  const {tagsFromSelected, lastSubcategories, isLastSubcategory, showEmployeeConsumer, companyKindFromSelected} =
    useSelectedSubcategoriesUtils(anomaly, reportDraft?.subcategories ?? [])

  const filterTags = (tagsFromSelected: ReportTag[], draft: Partial<ReportDraft2>): ReportTag[] => {
    if (companyKindFromSelected === CompanyKinds.WEBSITE || draft.companyKind === CompanyKinds.WEBSITE) {
      tagsFromSelected.push(ReportTag.Internet)
    }
    if (!(draft.forwardToReponseConso ?? false)) {
      return tagsFromSelected.filter(_ => _ !== ReportTag.ReponseConso)
    }
    return tagsFromSelected
  }

  const submit = (next: () => void) => {
    setReportDraft(draft => {
      const {subcategories, ..._anomaly} = anomaly
      return {
        ...draft,
        tags: filterTags(tagsFromSelected, draft),
        companyKind: companyKindFromSelected ?? draft.companyKind ?? CompanyKinds.SIRET,
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
      copy.tags = copy.tags ? copy.tags.filter(_ => _ !== ReportTag.Internet) : undefined
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
          <Stepper renderDone={<StepperActions next={submit} />}>
            <Step isDone={reportDraft.employeeConsumer !== undefined}>
              <ProblemSelect
                id="select-employeeconsumer"
                title={m.problemDoYouWorkInCompany}
                value={reportDraft.employeeConsumer}
                onChange={employeeConsumer => setReportDraft(_ => ({..._, employeeConsumer}))}
                options={[
                  {
                    title: m.yes,
                    value: true,
                  },
                  {
                    title: m.problemDoYouWorkInCompanyNo,
                    value: false,
                  },
                ]}
              />
            </Step>
            <Step isDone={reportDraft.companyKind !== undefined} hidden={!!companyKindFromSelected}>
              <ProblemSelect
                id="select-companyKind"
                title={m.problemIsInternetCompany}
                value={reportDraft.companyKind}
                onChange={companyKind => setReportDraft(_ => ({..._, companyKind}))}
                options={[
                  {
                    title: m.yes,
                    value: CompanyKinds.WEBSITE,
                  },
                  {
                    title: m.problemIsInternetCompanyNo,
                    value:
                      tagsFromSelected.indexOf(ReportTag.ProduitDangereux) === -1 ? CompanyKinds.SIRET : CompanyKinds.LOCATION,
                  },
                ]}
              />
            </Step>
            <Step
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
                  ...(displayReponseConso && tagsFromSelected.includes(ReportTag.ReponseConso)
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
            </Step>
            <Step isDone={true} hidden={reportDraft.contractualDispute !== true}>
              <ProblemContratualDisputeWarnPanel />
            </Step>
          </Stepper>
        ))}
    </>
  )
}
