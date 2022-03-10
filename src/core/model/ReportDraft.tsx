import {Anomaly, ReportDraft} from '@signal-conso/signalconso-api-sdk-js'
import {getDraftReportInputs} from '../../feature/Report/Details/draftReportInputs'
import {isSpecifyInputName, SpecifyFormUtils} from '../../feature/Report/Details/Details'
import {fromNullable} from 'fp-ts/lib/Option'
import {DeepPartial} from '@alexandreannic/ts-utils'

export type DetailInputValues2 = {[key: string]: string | string[]}

export interface ReportDraft2 extends Omit<ReportDraft, 'detailInputValues'> {
  anomaly: Omit<Anomaly, 'subcategories'>
  detailInputValues: DetailInputValues2
}

export class ReportDraft2 {
  static readonly toReportDraft = (d: ReportDraft2): ReportDraft => {
    const inputs = getDraftReportInputs({subcategories: d.subcategories, tags: d.tags})
    const map = (value: string, index: number) => {
      return value.replace(
        SpecifyFormUtils.keyword,
        d.detailInputValues[SpecifyFormUtils.getInputName(index)] as string
      )
    }

    const detailInputValues = Object.keys(d.detailInputValues)
      .filter(_ => !isSpecifyInputName(_))
      .map(index => {
        const label = inputs[+index].label
        const value = fromNullable(d.detailInputValues[index]).map(v =>
          Array.isArray(v)
            ? v.map(_ => _.includes(SpecifyFormUtils.keyword) ? map(_, +index) : _)
            : map(v, +index)
        ).getOrElse('')
        return {label, value}
      })
    return {
      ...d,
      detailInputValues,
    }
  }

  static readonly merge = (base: DeepPartial<ReportDraft2>, newValue: DeepPartial<ReportDraft2>): DeepPartial<ReportDraft2> => {
    return {
      ...base,
      ...newValue,
      companyDraft: {
        ...base.companyDraft,
        ...newValue.companyDraft,
        address: {
          ...base.companyDraft?.address,
          ...newValue.companyDraft?.address,
        }
      },
      consumer: {
        ...base.consumer,
        ...newValue.consumer,
      },
    }
  }
}
