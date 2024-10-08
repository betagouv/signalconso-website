import {PartialReport} from '@/components_feature/reportFlow/ReportFlowContext'
import {I18nMessages} from '@/i18n/I18nDictionnary'

export const STEP_PARAM_NAME = 'step'

export const reportSteps = ['BuildingProblem', 'BuildingCompany', 'BuildingDetails', 'BuildingConsumer', 'Confirmation'] as const
export type ReportStep = (typeof reportSteps)[number]

export const firstReportStep = reportSteps[0]
export const lastReportStep = reportSteps[reportSteps.length - 1]

// 'Done' is like a special bonus step, not included in the original list
export type ReportStepOrDone = ReportStep | 'Done'

export const buildingReportSteps = reportSteps.filter(isNotConfirmation)
export type BuildingStep = (typeof buildingReportSteps)[number]

export function getNextStep(step: ReportStep): ReportStepOrDone {
  return indexToStepOrDone(getIndexForStep(step) + 1)
}

export function getPreviousStep(step: ReportStep): ReportStepOrDone {
  if (step === firstReportStep) return step
  return indexToStepOrDone(getIndexForStep(step) - 1)
}

export function getIndexForStep(step: ReportStep): number {
  return reportSteps.indexOf(step) + 1
}

// /!\ Step indexes start at 1, because it looks better in the URL
export function getIndexForStepOrDone(step: ReportStepOrDone): number {
  return step === 'Done' ? reportSteps.length + 1 : getIndexForStep(step)
}

export function indexToStepOrDone(index: number): ReportStepOrDone {
  if (index < 1 || index > reportSteps.length + 1) {
    throw new Error(`Invalid step index ${index}`)
  }
  return index == reportSteps.length + 1 ? 'Done' : reportSteps[index - 1]
}

export function indexToStep(index: number): ReportStep {
  const step = indexToStepOrDone(index)
  if (step === 'Done') {
    throw new Error(`index ${index} is for Done`)
  }
  return step
}

export function isStepBeforeOrEqual(a: ReportStepOrDone, b: ReportStepOrDone) {
  return getIndexForStepOrDone(a) <= getIndexForStepOrDone(b)
}

function isBuildingStepDone(r: PartialReport, step: ReportStep) {
  switch (step) {
    case 'BuildingProblem':
      return (
        !!r.step0 &&
        !!r.step1 &&
        !!r.step1.subcategoriesIndexes &&
        !!r.step1.consumerWish &&
        r.step1.employeeConsumer !== undefined
      )
    case 'BuildingCompany':
      return !!r.step2
    case 'BuildingDetails':
      return !!r.step3
    case 'BuildingConsumer':
      return !!r.step4
    case 'Confirmation':
      // if all other steps are completed, we want to go to Confirmation
      return false
  }
}

export function getStepLabel(m: I18nMessages, step: ReportStep) {
  switch (step) {
    case 'BuildingProblem':
      return m.step_problem
    case 'BuildingCompany':
      return m.step_company
    case 'BuildingDetails':
      return m.step_description
    case 'BuildingConsumer':
      return m.step_consumer
    case 'Confirmation':
      return m.step_confirm
  }
}

export function findCurrentStepForReport(report: PartialReport): ReportStep {
  return reportSteps.find(step => !isBuildingStepDone(report, step))!
}

function isNotConfirmation(step: ReportStep): step is Exclude<ReportStep, 'Confirmation'> {
  return step !== 'Confirmation'
}
