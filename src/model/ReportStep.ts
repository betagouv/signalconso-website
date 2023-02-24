import {ReportDraft2} from './ReportDraft2'

export const reportSteps = ['BuildingProblem', 'BuildingDetails', 'BuildingCompany', 'BuildingConsumer', 'Confirmation'] as const
export type ReportStep = typeof reportSteps[number]

export const firstReportStep = reportSteps[0]
export const lastReportStep = reportSteps[reportSteps.length - 1]

// 'Done' is like a special bonus step, not included in the original list
export type ReportStepOrDone = ReportStep | 'Done'

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

export function getAnalyticsForStep(step: ReportStepOrDone) {
  switch (step) {
    case 'BuildingProblem':
      return {path: 'le-probleme', title: `Étape 1: Le problème - SignalConso`}
    case 'BuildingDetails':
      return {path: 'la-description', title: `Étape 2: La description - SignalConso`}
    case 'BuildingCompany':
      return {path: 'le-commerçant', title: `Étape 3: L'entreprise - SignalConso`}
    case 'BuildingConsumer':
      return {path: 'le-consommateur', title: `Étape 4: Le consommateur - SignalConso`}
    case 'Confirmation':
      return {path: 'confirmation', title: `Étape 5: Confirmation - SignalConso`}
    case 'Done':
      return {path: 'accuse-de-reception', title: `Information - SignalConso`}
  }
}

function isBuildingStepDone(r: Partial<ReportDraft2>, step: ReportStep) {
  switch (step) {
    case 'BuildingProblem':
      return !!r.category && !!r.subcategories && !!r.contractualDispute !== undefined && r.employeeConsumer !== undefined
    case 'BuildingDetails':
      return !!r.details
    case 'BuildingCompany':
      return !!r.companyDraft?.siret || !!r.companyDraft?.address.postalCode
    case 'BuildingConsumer':
      return !!r.consumer?.email && !!r.consumer?.firstName && !!r.consumer?.lastName
    case 'Confirmation':
      // if all other steps are completed, we want to go to Confirmation
      return false
  }
}

export function findCurrentStepForReport(report: Partial<ReportDraft2>): ReportStep {
  return reportSteps.find(step => !isBuildingStepDone(report, step))!
}
