import {getDraftReportInputs} from 'feature/Report/Details/draftReportInputs'
import {isSpecifyInputName, SpecifyFormUtils} from 'feature/Report/Details/Details'
import {DeepPartial} from '../../alexlibs/ts-utils'
import {CompanyDraft, ReportDraft, ReportDraftConsumer} from '../../client/report/ReportDraft'
import {Anomaly, DetailInput} from '../../anomaly/Anomaly'
import {DetailInputValue} from '../../client/report/Report'
import {Address} from '../../model'

export type DetailInputValues2 = {[key: string]: string | string[]}

export interface ReportDraft2 extends Omit<ReportDraft, 'details'> {
  anomaly: Omit<Anomaly, 'subcategories'>
  details: DetailInputValues2
}

export class ReportDraft2 {
  static readonly toReportDraft = (d: ReportDraft2): ReportDraft => {
    const inputs = getDraftReportInputs({subcategories: d.subcategories, tags: d.tags})
    return {
      ...d,
      details: ReportDraft2.parseDetails(d.details, inputs),
    }
  }

  static readonly parseDetails = (details: DetailInputValues2, inputs: DetailInput[]): DetailInputValue[] => {
    const concatSpecifiedValued = (value: string, index: number) => {
      return value.replace(SpecifyFormUtils.keyword, details[SpecifyFormUtils.getInputName(index)] as string)
    }

    const mapLabel = (label: string): string => {
      if (label.endsWith('?')) {
        return label.replace('?', ':')
      }
      if (!label.endsWith(':')) {
        return `${label} :`
      }
      return label
    }

    return Object.keys(details)
      .filter(_ => !isSpecifyInputName(_))
      .map(index => {
        const label = mapLabel(inputs[+index].label)

        const prepareValue = (v: string | string[] | undefined): string => {
          if (v === undefined) {
            return ''
          }
          if (Array.isArray(v)) {
            return v.map(_ => (_.includes(SpecifyFormUtils.keyword) ? concatSpecifiedValued(_, +index) : _)).join(', ')
          }
          return concatSpecifiedValued(v, +index)
        }

        // I'm not sure exactly how it's possible but this can be undefined sometimes (we had sentry errors otherwise)
        // Maybe this means that DetailInputValues2 type is wrong, it can contain undefined values ?
        const rawValue: string | string[] | undefined = details[index]

        return {label, value: prepareValue(rawValue)}
      })
  }

  static readonly merge = (base: Partial<ReportDraft2>, newValue: DeepPartial<ReportDraft2>): Partial<ReportDraft2> => {
    return {
      ...base,
      ...(newValue as ReportDraft2),
      companyDraft: {
        ...base.companyDraft,
        ...(newValue.companyDraft as CompanyDraft),
        address: {
          ...base.companyDraft?.address,
          ...(newValue.companyDraft?.address as Address),
        },
      },
      consumer: {
        ...base.consumer,
        ...(newValue.consumer as ReportDraftConsumer),
      },
    }
  }
}
