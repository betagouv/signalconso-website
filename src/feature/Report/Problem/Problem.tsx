import React, {useEffect, useMemo} from 'react'
import {config} from '../../../conf/config'
import {Category, CompanyKinds, ReportTag, Subcategory} from '@signal-conso/signalconso-api-sdk-js'
import {useReportFlowContext} from '../ReportFlowContext'
import {useSelectedSubcategoriesUtils} from './useSelectedSubcategoriesUtils'
import {Step, Stepper} from './Stepper'
import {ProblemSelect} from './ProblemSelect'
import {StepperActions} from '../../../shared/Stepper/StepperActions'

interface Props {
  animatePanel?: boolean
  autoScrollToPanel?: boolean
  anomaly: Category
  category?: string
}

export const Problem = ({
  category,
  anomaly,
  animatePanel,
  autoScrollToPanel,
}: Props) => {
  const displayReponseConso = useMemo(() => Math.random() * 100 < config.reponseConsoDisplayRate, [])
  const _reportFlow = useReportFlowContext()
  const draft = _reportFlow.reportDraft

  useEffect(() => {
    if (category !== _reportFlow.reportDraft.category) {
      _reportFlow.clearReportDraft()
      _reportFlow.setReportDraft({category})
    }
  }, [category])

  const {
    tagsFromSelected,
    lastSubcategories,
    isLastSubcategory,
    showEmployeeConsumer,
    companyKindFromSelected,
  } = useSelectedSubcategoriesUtils(anomaly, draft.subcategories ?? [])

  const submit = (next: () => void) => {
    _reportFlow.setReportDraft(_ => ({
      ..._,
      tags: tagsFromSelected,
      companyKind: _.companyKind ?? companyKindFromSelected ?? CompanyKinds.SIRET,
    }))
    next()
  }

  const handleSubcategoriesChange = (subcategory: Subcategory, index: number) => {
    _reportFlow.setReportDraft(report => {
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
      {([anomaly, ...(draft.subcategories ?? [])]).map((c, i) => c.subcategories && (
        <ProblemSelect
          animatePanel={animatePanel}
          autoScrollToPanel={autoScrollToPanel}
          key={c.id}
          title={anomaly.subcategoriesTitle}
          value={draft.subcategories?.[i]?.id}
          onChange={id => handleSubcategoriesChange(c.subcategories?.find(_ => _.id === id)!, i)}
          options={(c.subcategories ?? []).map((_, i) => ({
            title: _.title,
            description: _.example,
            value: _.id
          }))}
        />
      ))}
      {isLastSubcategory && (
        <Stepper renderDone={
          <StepperActions next={submit}/>
        }>
          <Step isDone={draft.companyKind !== undefined} hidden={!!companyKindFromSelected}>
            <ProblemSelect
              animatePanel={animatePanel}
              autoScrollToPanel={autoScrollToPanel}
              title="Est-ce que votre problème concerne une entreprise sur internet ?"
              value={draft.companyKind}
              onChange={companyKind => _reportFlow.setReportDraft(_ => ({..._, companyKind}))}
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
          <Step isDone={draft.employeeConsumer !== undefined} hidden={!showEmployeeConsumer}>
            <ProblemSelect
              animatePanel={animatePanel}
              autoScrollToPanel={autoScrollToPanel}
              title="Travaillez-vous dans l'entreprise que vous souhaitez signaler ?"
              value={draft.employeeConsumer}
              onChange={employeeConsumer => _reportFlow.setReportDraft(_ => ({..._, employeeConsumer}))}
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
            isDone={draft.contractualDispute !== undefined || draft.forwardToReponseConso !== undefined}
            hidden={draft.employeeConsumer === true}
          >
            <ProblemSelect
              animatePanel={animatePanel}
              autoScrollToPanel={autoScrollToPanel}
              title="Que souhaitez-vous faire ?"
              value={(() => {
                if (draft.contractualDispute === true) return 1
                if (draft.contractualDispute === false) return 2
                if (draft.forwardToReponseConso === true) return 3
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
                    _reportFlow.setReportDraft(_ => ({..._, forwardToReponseConso: undefined, contractualDispute: true}))
                    break
                  }
                  case 2: {
                    _reportFlow.setReportDraft(_ => ({..._, forwardToReponseConso: undefined, contractualDispute: false}))
                    break
                  }
                  case 3: {
                    _reportFlow.setReportDraft(_ => ({..._, forwardToReponseConso: true, contractualDispute: undefined}))
                    break
                  }
                }
              }}
            />
          </Step>
        </Stepper>
      )}
    </>
  )
}
