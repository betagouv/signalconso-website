import {Enum} from '@alexandreannic/ts-utils'

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
}
