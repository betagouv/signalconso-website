import {getSubcategories, hasStep0, hasSubcategoryIndexes} from '@/feature/reportUtils'
import {last} from '@/utils/lodashNamedExport'
import {instanceOfSubcategoryWithInputs} from '../../../anomalies/Anomalies'
import {DetailInput, DetailInputType} from 'shared/anomalies/Anomaly'
import {AppLang, AppLangs} from '../../../i18n/localization/AppLangs'
import {PartialReport} from '../ReportFlowContext'

export class ReportDefaultInputs {
  static readonly reponseConso = (lang: AppLang): DetailInput => ({
    label: lang === AppLangs.en ? 'Your question' : 'Votre question',
    type: DetailInputType.TEXTAREA,
  })

  static readonly description = (optional?: boolean): DetailInput => ({
    label: 'Description',
    type: DetailInputType.TEXTAREA,
    ...(optional && {optional: true}),
  })

  static readonly date = (lang: AppLang): DetailInput => ({
    label: lang === AppLangs.en ? 'Date of discovery of the incident' : 'Date du constat',
    type: DetailInputType.DATE_NOT_IN_FUTURE,
    defaultValue: 'SYSDATE',
  })

  static readonly defaults = (lang: AppLang): DetailInput[] => [ReportDefaultInputs.date(lang), ReportDefaultInputs.description()]
}

export const getReportInputs = (draft: PartialReport, lang: AppLang): DetailInput[] => {
  if (!hasStep0(draft) || !hasSubcategoryIndexes(draft)) {
    throw new Error('Draft should already be initialized for calculating inputs')
  }
  const subcategories = getSubcategories(draft)
  const {consumerWish} = draft.step1
  const lastSubcategories = last(subcategories)
  const res: DetailInput[] = []
  if (instanceOfSubcategoryWithInputs(lastSubcategories)) {
    res.push(...(lastSubcategories.detailInputs ?? []))
    if (!lastSubcategories.detailInputs?.some(_ => _.type === DetailInputType.TEXTAREA)) {
      res.push(ReportDefaultInputs.description(false))
    }
  } else {
    res.push(...ReportDefaultInputs.defaults(lang))
  }
  if (consumerWish === 'getAnswer') {
    const i = res.findIndex(
      _ => _.type === DetailInputType.TEXTAREA && !_.label.includes(ReportDefaultInputs.description().label),
    )
    if (i > -1) {
      // ReponseConso need the description keyword to parse the reports
      res[i].label = `${ReportDefaultInputs.description().label} (${res[i].label})`
    }
    res.push(ReportDefaultInputs.reponseConso(lang))
  }
  return res
}
