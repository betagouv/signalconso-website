import {getDraftReportInputs} from 'components_feature/reportFlow/Details/draftReportInputs'
import {isSpecifyInputName, SpecifyFormUtils} from 'components_feature/reportFlow/Details/Details'
import {DeepPartial} from '../utils/utils'
import {CompanyDraft, ReportDraft, ReportDraftConsumer} from './ReportDraft'
import {Anomaly, DetailInput} from '../anomalies/Anomaly'
import {DetailInputValue} from './CreatedReport'
import {Address} from './Address'
import {AppLang} from '../i18n/localization/AppLangs'

export type DetailInputValues2 = {[key: string]: string | string[]}

export interface ReportDraft2 extends Omit<ReportDraft, 'details'> {
  anomaly: Omit<Anomaly, 'subcategories'>
  details: DetailInputValues2
}

export class ReportDraft2 {
  static readonly toReportDraft = (d: ReportDraft2, lang: AppLang): ReportDraft => {
    const inputs = getDraftReportInputs(d, lang)
    return {
      ...d,
      details: ReportDraft2.parseDetails(d.details, inputs),
    }
  }

  static readonly parseDetails = (details: DetailInputValues2, inputs: DetailInput[]): DetailInputValue[] => {
    const concatSpecifiedValued = (value: string, index: number) => {
      const specifyKeyword = value.includes(SpecifyFormUtils.specifyKeywordFr)
        ? SpecifyFormUtils.specifyKeywordFr
        : SpecifyFormUtils.specifyKeywordEn
      return value.replace(specifyKeyword, details[SpecifyFormUtils.getInputName(index)] as string)
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
            return v.map(_ => (SpecifyFormUtils.hasSpecifyKeyword(_) ? concatSpecifiedValued(_, +index) : _)).join(', ')
          }
          return concatSpecifiedValued(v, +index)
        }

        // I'm not sure exactly how it's possible but this can be undefined sometimes (we had sentry errors otherwise)
        // Maybe this means that DetailInputValues2 type is wrong, it can contain undefined values ?
        const rawValue: string | string[] | undefined = details[index]

        return {label, value: prepareValue(rawValue)}
      })
  }

  static readonly mergeCompanies = (base?: CompanyDraft, newValue?: DeepPartial<CompanyDraft>): CompanyDraft | undefined => {
    if (newValue) {
      return {
        ...base,
        ...(newValue as CompanyDraft),
        address: {
          ...base?.address,
          ...(newValue.address as Address),
        },
      }
    } else {
      return base
    }
  }

  static readonly mergeConsumer = (
    base?: ReportDraftConsumer,
    newValue?: DeepPartial<ReportDraftConsumer>,
  ): ReportDraftConsumer | undefined => {
    if (newValue) {
      return {
        ...base,
        ...(newValue as ReportDraftConsumer),
      }
    } else {
      return base
    }
  }

  static readonly merge = (base: Partial<ReportDraft2>, newValue: DeepPartial<ReportDraft2>): Partial<ReportDraft2> => {
    return {
      ...base,
      ...(newValue as ReportDraft2),
      companyDraft: ReportDraft2.mergeCompanies(base.companyDraft, newValue.companyDraft),
      consumer: ReportDraft2.mergeConsumer(base.consumer, newValue.consumer),
    }
  }
}
