import {ReportDraft2} from './ReportDraft2'

export const reportSteps = ['BuildingProblem', 'BuildingDetails', 'BuildingCompany', 'BuildingConsumer', 'Confirmation'] as const
export type ReportStep = typeof reportSteps[number]

export function getStepIndex(step: ReportStep): number {
  return reportSteps.indexOf(step)
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
