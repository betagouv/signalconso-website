import {getSubcategories, hasLangAndCategory, hasSubcategoryIndexes} from '@/feature/reportDraftUtils'
import {ReportDraft2} from '@/model/ReportDraft2'
import {last} from '@/utils/lodashNamedExport'
import {instanceOfSubcategoryWithInputs} from '../../../anomalies/Anomalies'
import {DetailInput, DetailInputType} from '../../../anomalies/Anomaly'
import {AppLang, AppLangs} from '../../../i18n/localization/AppLangs'

export class DraftReportDefaultInputs {
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

  static readonly defaults = (lang: AppLang): DetailInput[] => [
    DraftReportDefaultInputs.date(lang),
    DraftReportDefaultInputs.description(),
  ]
}

export const getDraftReportInputs = (draft: Partial<ReportDraft2>, lang: AppLang): DetailInput[] => {
  if (!hasLangAndCategory(draft) || !hasSubcategoryIndexes(draft)) {
    throw new Error('Draft should already be initialized for calculating inputs')
  }
  const subcategories = getSubcategories(draft)
  const {consumerWish} = draft
  const lastSubcategories = last(subcategories)
  const res: DetailInput[] = []
  if (instanceOfSubcategoryWithInputs(lastSubcategories)) {
    res.push(...(lastSubcategories.detailInputs ?? []))
    if (!lastSubcategories.detailInputs?.some(_ => _.type === DetailInputType.TEXTAREA)) {
      res.push(DraftReportDefaultInputs.description(true))
    }
  } else {
    res.push(...DraftReportDefaultInputs.defaults(lang))
  }
  if (consumerWish === 'getAnswer') {
    const i = res.findIndex(
      _ => _.type === DetailInputType.TEXTAREA && !_.label.includes(DraftReportDefaultInputs.description().label),
    )
    if (i > -1) {
      // ReponseConso need the description keyword to parse the reports
      res[i].label = `${DraftReportDefaultInputs.description().label} (${res[i].label})`
    }
    res.push(DraftReportDefaultInputs.reponseConso(lang))
  }
  return res
}
