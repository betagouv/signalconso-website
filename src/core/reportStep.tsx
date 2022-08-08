import {ReportDraft2} from './model/ReportDraft'

export enum ReportStep {
  Problem = 'problem',
  Details = 'details',
  Company = 'company',
  Consumer = 'consumer',
  Confirmation = 'confirmation',
  Acknowledgment = 'acknowledgment',
}

export class ReportStepHelper {
  static readonly reportStepOrdered = [
    ReportStep.Problem,
    ReportStep.Details,
    ReportStep.Company,
    ReportStep.Consumer,
    ReportStep.Confirmation,
    ReportStep.Acknowledgment,
  ]

  static readonly count = ReportStepHelper.reportStepOrdered.length

  static readonly getByIndex = (i: number): ReportStepHelper => ReportStepHelper.reportStepOrdered[i]

  static readonly getIndexByStep = (step: ReportStep): number => ReportStepHelper.reportStepOrdered.indexOf(step)

  static readonly reportStepDone = (r: Partial<ReportDraft2>) => ({
    problem: !!r.category && !!r.subcategories && !!r.contractualDispute !== undefined && r.employeeConsumer !== undefined,
    description: !!r.details,
    company: !!r.companyDraft?.siret || !!r.companyDraft?.address.postalCode,
    consumer: !!r.consumer?.email && !!r.consumer?.firstName && !!r.consumer?.lastName,
  })

  static readonly reportCurrentStep = (r: Partial<ReportDraft2>): number => {
    const values = Object.values(ReportStepHelper.reportStepDone(r))
    const index = values.findIndex(_ => !_)
    return index > -1 ? index : values.length
  }
}
