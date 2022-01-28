import React, {useEffect, useMemo} from 'react'
import {config} from '../../../conf/config'
import {Anomaly, AnomalyClient, CompanyKinds, ReportTag, Subcategory} from '@signal-conso/signalconso-api-sdk-js'
import {ReportFlowContextProps, useReportFlowContext} from '../ReportFlowContext'
import {useSelectedSubcategoriesUtils} from './useSelectedSubcategoriesUtils'
import {Step, Stepper} from './Stepper'
import {ProblemSelect} from './ProblemSelect'
import {StepperActions} from '../../../shared/Stepper/StepperActions'
import {ProblemInformation} from './ProblemInformation'

interface Props {
  animatePanel?: boolean
  autoScrollToPanel?: boolean
  anomaly: Anomaly
  // category?: string
}

export const Problem = (props: Props) => {
  return (
    <_Problem {...props} {...useReportFlowContext()}/>
  )
}

export const _Problem = ({
  anomaly,
  animatePanel,
  autoScrollToPanel,
  reportDraft,
  setReportDraft,
  clearReportDraft,
}: Props & ReportFlowContextProps) => {
  const displayReponseConso = useMemo(() => Math.random() * 100 < config.reponseConsoDisplayRate, [])

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

  return (
    <>
      {([anomaly, ...(reportDraft.subcategories ?? [])]).map((c, i) => c.subcategories && (
        <ProblemSelect
          animatePanel={animatePanel}
          autoScrollToPanel={autoScrollToPanel}
          key={c.id}
          title={anomaly.subcategoriesTitle}
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
            information={lastSubcategories.information}
            animate={animatePanel}
            autoScrollTo={autoScrollToPanel}
          />
        ) : (
          <Stepper renderDone={
            <StepperActions next={submit}/>
          }>
            <Step isDone={reportDraft.companyKind !== undefined} hidden={!!companyKindFromSelected}>
              <ProblemSelect
                animatePanel={animatePanel}
                autoScrollToPanel={autoScrollToPanel}
                title="Est-ce que votre problème concerne une entreprise sur internet ?"
                value={reportDraft.companyKind}
                onChange={companyKind => setReportDraft(_ => ({..._, companyKind}))}
                options={[
                  {
                    title: 'Oui',
                    value: CompanyKinds.WEBSITE
                  }, {
                    title: `Non, pas sur internet`,
                    value: tagsFromSelected.indexOf(ReportTag.ProduitDangereux) === -1 ? CompanyKinds.SIRET : CompanyKinds.LOCATION
                  }
                ]}
              />
            </Step>
            <Step isDone={reportDraft.employeeConsumer !== undefined}>
              <ProblemSelect
                animatePanel={animatePanel}
                autoScrollToPanel={autoScrollToPanel}
                title="Travaillez-vous dans l'entreprise que vous souhaitez signaler ?"
                value={reportDraft.employeeConsumer}
                onChange={employeeConsumer => setReportDraft(_ => ({..._, employeeConsumer}))}
                options={[
                  {
                    title: 'Oui',
                    value: true
                  }, {
                    title: `Non, je n'y travaille pas`,
                    value: false
                  }
                ]}
              />
            </Step>
            <Step
              isDone={reportDraft.contractualDispute !== undefined || reportDraft.forwardToReponseConso !== undefined}
              hidden={reportDraft.employeeConsumer === true}
            >
              <ProblemSelect
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
                    title: `Je veux résoudre mon problème personnel avec l'entreprise`,
                    description: 'La répression des fraudes sera informée',
                    value: 1
                  },
                  {
                    title: `Je souhaite signaler un problème pour que l'entreprise s'améliore`,
                    value: 2
                  },
                  ...(displayReponseConso ? [{
                    title: `Je souhaite que la répression des fraudes m'informe sur mes droits`,
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
          </Stepper>
        ))}
    </>
  )
}
