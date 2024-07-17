import {isDateInput} from '@/components_feature/reportFlow/Details/DetailInputsUtils'
import {isSpecifyInputName, SpecifyFormUtils} from '@/components_feature/reportFlow/Details/Details'
import {getDraftReportInputs} from '@/components_feature/reportFlow/Details/draftReportInputs'
import {DetailInput, DetailInputType} from '../anomalies/Anomaly'
import {AppLang} from '../i18n/localization/AppLangs'
import {DeepPartial, isoToFrenchFormat, notNull} from '../utils/utils'
import {Address} from './Address'
import {CompanyDraft} from './Company'
import {DetailInputValue} from './CreatedReport'
import {ReportDraft} from './ReportDraft'

export type DetailInputValues2 = {[key: string]: string | string[]}

export interface ReportDraft2 extends Omit<ReportDraft, 'details'> {
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
    function injectSpecifiedValue(input: DetailInput, value: string, index: number): string {
      if (input.type === DetailInputType.CHECKBOX || input.type === DetailInputType.RADIO) {
        const specifyKeywordFound = value.includes(SpecifyFormUtils.specifyKeywordFr)
          ? SpecifyFormUtils.specifyKeywordFr
          : value.includes(SpecifyFormUtils.specifyKeywordEn)
            ? SpecifyFormUtils.specifyKeywordEn
            : null
        if (specifyKeywordFound) {
          const optionIndex = input.options.findIndex(_ => _ === value)
          const specifyInputName = SpecifyFormUtils.getInputName(index, optionIndex)
          const specifiedValue = details[specifyInputName] as string
          const res = value.replace(specifyKeywordFound, specifiedValue)
          return res
        }
      }
      return value
    }

    function mapLabel(label: string): string {
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
        const indexNb = parseInt(index, 10)
        const input = inputs[indexNb]
        if (!input) {
          // we can sometimes have values for inputs that don't exist
          // for example, if you pick the ReponseConso consumerWish, fill the "Votre question" field
          // then go back and pick a different consumerWish.
          // You will still have the value for "Votre question" stored, with no corresponding input
          return null
        }
        const label = mapLabel(input.label)

        const prepareValue = (v: string | string[] | undefined): string => {
          if (v === undefined) {
            return ''
          }
          if (Array.isArray(v)) {
            return v.map(_ => (SpecifyFormUtils.hasSpecifyKeyword(_) ? injectSpecifiedValue(input, _, indexNb) : _)).join(', ')
          }
          if (isDateInput(input)) {
            return isoToFrenchFormat(v)
          }
          return injectSpecifiedValue(input, v, indexNb)
        }

        // I'm not sure exactly how it's possible but this can be undefined sometimes (we had sentry errors otherwise)
        // Maybe this means that DetailInputValues2 type is wrong, it can contain undefined values ?
        const rawValue: string | string[] | undefined = details[index]

        return {label, value: prepareValue(rawValue)}
      })
      .filter(notNull)
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

  static readonly merge = (base: Partial<ReportDraft2>, newValue: DeepPartial<ReportDraft2>): Partial<ReportDraft2> => {
    return {
      ...base,
      ...(newValue as ReportDraft2),
      companyDraft: ReportDraft2.mergeCompanies(base.companyDraft, newValue.companyDraft),
    }
  }
}
