import React, {useEffect, useMemo} from 'react'
import {appConfig} from 'conf/appConfig'
import {Anomaly, AnomalyClient, CompanyKinds, ReportTag, Subcategory} from '@signal-conso/signalconso-api-sdk-js'
import {useReportFlowContext} from '../ReportFlowContext'
import {useSelectedSubcategoriesUtils} from './useSelectedSubcategoriesUtils'
import {Step, Stepper} from './Stepper'
import {ProblemSelect} from './ProblemSelect'
import {StepperActions} from 'shared/Stepper/StepperActions'
import {ProblemInformation} from './ProblemInformation'
import {useI18n} from '../../../core/i18n'
import {ProblemContratualDisputeWarnPanel} from './ProblemContratualDisputeWarnPanel'

interface Props {
  animatePanel?: boolean
  autoScrollToPanel?: boolean
  anomaly: Anomaly
}

export const Problem = ({
  anomaly,
  animatePanel,
  autoScrollToPanel,
}: Props) => {
  const {m} = useI18n()
  const displayReponseConso = useMemo(() => Math.random() * 100 < appConfig.reponseConsoDisplayRate, [])
  const {reportDraft, setReportDraft, clearReportDraft} = useReportFlowContext()
  useEffect(() => {
    if (anomaly.category !== reportDraft.category) {
      clearReportDraft()
      setReportDraft({category: anomaly.category})
    }
  }, [anomaly.category])

  const {
    tagsFromSelected,
    lastSubcategories,
    isLastSubcategory,
    showEmployeeConsumer,
    companyKindFromSelected,
  } = useSelectedSubcategoriesUtils(anomaly, reportDraft?.subcategories ?? [])

  const submit = (next: () => void) => {
    setReportDraft(_ => {
      const {subcategories, ..._anomaly} = anomaly
      return ({
        ..._,
        tags: tagsFromSelected,
        companyKind: _.companyKind ?? companyKindFromSelected ?? CompanyKinds.SIRET,
        anomaly: _anomaly
      })
    })
    next()
  }

  const handleSubcategoriesChange = (subcategory: Subcategory, index: number) => {
    setReportDraft(report => {
      const copy = {...report}
      copy.subcategories = report.subcategories ?? []
      copy.subcategories.length = index
      copy.subcategories[index] = subcategory
      copy.subcategories = [...copy.subcategories]
      return copy
    })
  }

  if (anomaly.information) {
    return (
      <ProblemInformation category={anomaly.category} subcategories={[]} information={anomaly.information}/>
    )
  }
  return (
    <>
      {([anomaly, ...(reportDraft.subcategories ?? [])]).map((c, i) => c.subcategories && (
        <ProblemSelect
          animatePanel={animatePanel}
          autoScrollToPanel={autoScrollToPanel}
          key={c.id}
          title={c.subcategoriesTitle}
          value={reportDraft.subcategories?.[i]?.id}
          onChange={id => handleSubcategoriesChange(c.subcategories?.find(_ => _.id === id)!, i)}
          options={(c.subcategories ?? []).map((_, i) => ({
            title: _.title,
            description: _.example,
            value: _.id
          }))}
        />
      ))}
      {isLastSubcategory && reportDraft.subcategories && (
        AnomalyClient.instanceOfSubcategoryInformation(lastSubcategories) ? (
          <ProblemInformation
            category={anomaly.category}
            subcategories={reportDraft.subcategories}
            information={(lastSubcategories as any).information}
            animate={animatePanel}
            autoScrollTo={autoScrollToPanel}
          />
        ) : (
          <Stepper renderDone={
            <StepperActions next={submit}/>
          }>
            <Step isDone={reportDraft.employeeConsumer !== undefined}>
              <ProblemSelect
                id="select-employeeconsumer"
                animatePanel={animatePanel}
                autoScrollToPanel={autoScrollToPanel}
                title={m.problemDoYouWorkInCompany}
                value={reportDraft.employeeConsumer}
                onChange={employeeConsumer => setReportDraft(_ => ({..._, employeeConsumer}))}
                options={[
                  {
                    title: m.yes,
                    value: true
                  }, {
                    title: m.problemDoYouWorkInCompanyNo,
                    value: false
                  }
                ]}
              />
            </Step>
            <Step isDone={reportDraft.companyKind !== undefined} hidden={!!companyKindFromSelected}>
              <ProblemSelect
                id="select-companyKind"
                animatePanel={animatePanel}
                autoScrollToPanel={autoScrollToPanel}
                title={m.problemIsInternetCompany}
                value={reportDraft.companyKind}
                onChange={companyKind => setReportDraft(_ => ({..._, companyKind}))}
                options={[
                  {
                    title: m.yes,
                    value: CompanyKinds.WEBSITE
                  }, {
                    title: m.problemIsInternetCompanyNo,
                    value: tagsFromSelected.indexOf(ReportTag.ProduitDangereux) === -1 ? CompanyKinds.SIRET : CompanyKinds.LOCATION
                  }
                ]}
              />
            </Step>
            <Step
              isDone={reportDraft.contractualDispute !== undefined || reportDraft.forwardToReponseConso !== undefined}
              hidden={reportDraft.employeeConsumer === true}
            >
              <ProblemSelect
                id="select-contractualDispute"
                animatePanel={animatePanel}
                autoScrollToPanel={autoScrollToPanel}
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
                    value: 1
                  },
                  {
                    title: m.problemContractualDisputeFormNo,
                    value: 2
                  },
                  ...(displayReponseConso ? [{
                    title: m.problemContractualDisputeFormReponseConso,
                    value: 3
                  }] : [])
                ]}
                onChange={(value: number) => {
                  switch (value) {
                    case 1: {
                      setReportDraft(_ => ({..._, forwardToReponseConso: undefined, contractualDispute: true}))
                      break
                    }
                    case 2: {
                      setReportDraft(_ => ({..._, forwardToReponseConso: undefined, contractualDispute: false}))
                      break
                    }
                    case 3: {
                      setReportDraft(_ => ({..._, forwardToReponseConso: true, contractualDispute: undefined}))
                      break
                    }
                  }
                }}
              />
            </Step>
            <Step isDone={true} hidden={reportDraft.contractualDispute !== true}>
              <ProblemContratualDisputeWarnPanel
                animatePanel={animatePanel}
                autoScrollToPanel={autoScrollToPanel}
              />
            </Step>
          </Stepper>
        ))}
    </>
  )
}
