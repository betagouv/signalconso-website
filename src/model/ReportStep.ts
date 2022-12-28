import {ReportDraft2} from './ReportDraft2'

export enum ReportStep {
  Problem = 'problem',
  Details = 'details',
  Company = 'company',
  Consumer = 'consumer',
  Confirmation = 'confirmation',
  Acknowledgment = 'acknowledgment',
}

export const reportStepsOrdered = [
  ReportStep.Problem,
  ReportStep.Details,
  ReportStep.Company,
  ReportStep.Consumer,
  ReportStep.Confirmation,
  ReportStep.Acknowledgment,
]

export function getStepIndex(step: ReportStep): number {
  return reportStepsOrdered.indexOf(step)
}
function getWhichStepsAreDone(r: Partial<ReportDraft2>) {
  return {
    problem: !!r.category && !!r.subcategories && !!r.contractualDispute !== undefined && r.employeeConsumer !== undefined,
    description: !!r.details,
    company: !!r.companyDraft?.siret || !!r.companyDraft?.address.postalCode,
    consumer: !!r.consumer?.email && !!r.consumer?.firstName && !!r.consumer?.lastName,
  }
}

export function findCurrentStepForReport(report: Partial<ReportDraft2>): number {
  const values = Object.values(getWhichStepsAreDone(report))
  const index = values.findIndex(_ => !_)
  return index > -1 ? index : values.length
}
