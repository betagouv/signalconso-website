import {ReportDraft2} from './ReportDraft2'

const reportBuildingSteps = ['BuildingProblem', 'BuildingDetails', 'BuildingCompany', 'BuildingConsumer'] as const
export type ReportBuildingStep = typeof reportBuildingSteps[number]

export const reportSteps = [...reportBuildingSteps, 'Confirmation', 'Acknowledgment'] as const
export type ReportStep = typeof reportSteps[number]

export function getStepIndex(step: ReportStep): number {
  return reportSteps.indexOf(step)
}

function isBuildingStepDone(r: Partial<ReportDraft2>, step: ReportBuildingStep) {
  switch (step) {
    case 'BuildingProblem':
      return !!r.category && !!r.subcategories && !!r.contractualDispute !== undefined && r.employeeConsumer !== undefined
    case 'BuildingDetails':
      return !!r.details
    case 'BuildingCompany':
      return !!r.companyDraft?.siret || !!r.companyDraft?.address.postalCode
    case 'BuildingConsumer':
      return !!r.consumer?.email && !!r.consumer?.firstName && !!r.consumer?.lastName
  }
}

export function findCurrentStepForReport(report: Partial<ReportDraft2>): number {
  const index = reportBuildingSteps.findIndex(step => !isBuildingStepDone(report, step))
  const res =
    index > -1
      ? index
      : // if all building steps are done, we can go to Confirmation
        reportBuildingSteps.length
  return res
}
