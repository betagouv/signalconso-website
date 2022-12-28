import {ReportStepOrDone} from 'components_simple/ReportFlowStepper/ReportFlowStepper'
import {ReportDraft2} from './ReportDraft2'

export const reportSteps = ['BuildingProblem', 'BuildingDetails', 'BuildingCompany', 'BuildingConsumer', 'Confirmation'] as const
export type ReportStep = typeof reportSteps[number]

export const firstReportStep = reportSteps[0]
export const lastReportStep = reportSteps[reportSteps.length - 1]

// TMP for retrocompat
export function getStepIndex(step: ReportStep): number {
  return reportSteps.indexOf(step)
}

// TMP for retrocompat
export function stepToIndex(step: ReportStepOrDone): number {
  return step === 'done' ? reportSteps.length : getStepIndex(step)
}

// TMP for retrocompat
export function indexToStepOrDone(index: number): ReportStepOrDone {
  return index >= reportSteps.length ? 'done' : reportSteps[index]
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
      // if all other steps are done, we want to go to Confirmation
      return false
  }
}

export function findCurrentStepForReport(report: Partial<ReportDraft2>): number {
  return reportSteps.findIndex(step => !isBuildingStepDone(report, step))
}
