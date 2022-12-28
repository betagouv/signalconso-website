import {ReportDraft2} from './ReportDraft2'

export enum ReportStep {
  Problem = 'problem',
  Details = 'details',
  Company = 'company',
  Consumer = 'consumer',
  Confirmation = 'confirmation',
  Acknowledgment = 'acknowledgment',
}

const buildingSteps = [ReportStep.Problem, ReportStep.Details, ReportStep.Company, ReportStep.Consumer] as const

export const reportStepsOrdered = [...buildingSteps, ReportStep.Confirmation, ReportStep.Acknowledgment]

export function getStepIndex(step: ReportStep): number {
  return reportStepsOrdered.indexOf(step)
}

function isStepDone(
  r: Partial<ReportDraft2>,
  step: ReportStep.Problem | ReportStep.Details | ReportStep.Company | ReportStep.Consumer,
) {
  switch (step) {
    case ReportStep.Problem:
      return !!r.category && !!r.subcategories && !!r.contractualDispute !== undefined && r.employeeConsumer !== undefined
    case ReportStep.Details:
      return !!r.details
    case ReportStep.Company:
      return !!r.companyDraft?.siret || !!r.companyDraft?.address.postalCode
    case ReportStep.Consumer:
      return !!r.consumer?.email && !!r.consumer?.firstName && !!r.consumer?.lastName
  }
}

export function findCurrentStepForReport(report: Partial<ReportDraft2>): number {
  const index = buildingSteps.findIndex(step => !isStepDone(report, step))
  const res = index > -1 ? index : buildingSteps.length
  return res
}
