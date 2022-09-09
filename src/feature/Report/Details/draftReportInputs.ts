import {last} from 'core/lodashNamedExport'
import {instanceOfSubcategoryInput} from '../../../anomaly/Anomalies'
import {DetailInput, DetailInputType, ReportTag, Subcategory} from '../../../anomaly/Anomaly'

export class DraftReportDefaultInputs {
  static readonly reponseConso = (): DetailInput => ({
    label: 'Votre question',
    type: DetailInputType.TEXTAREA,
  })

  static readonly description = (optional?: boolean): DetailInput => ({
    label: 'Description',
    type: DetailInputType.TEXTAREA,
    ...(optional && {optional: true}),
  })

  static readonly date = (): DetailInput => ({
    label: 'Date du constat',
    type: DetailInputType.DATE_NOT_IN_FUTURE,
    defaultValue: 'SYSDATE',
  })

  static readonly defaults = (): DetailInput[] => [DraftReportDefaultInputs.date(), DraftReportDefaultInputs.description()]
}

export const getDraftReportInputs = ({
  subcategories,
  tags,
}: {
  subcategories: Subcategory[]
  tags?: ReportTag[]
}): DetailInput[] => {
  const lastSubcategories = last(subcategories)
  const res: DetailInput[] = []
  if (instanceOfSubcategoryInput(lastSubcategories)) {
    res.push(...(lastSubcategories.detailInputs ?? []))
    if (!lastSubcategories.detailInputs?.some(_ => _.type === DetailInputType.TEXTAREA)) {
      res.push(DraftReportDefaultInputs.description(true))
    }
  } else {
    res.push(...DraftReportDefaultInputs.defaults())
  }
  if (tags?.includes(ReportTag.ReponseConso)) {
    const i = res.findIndex(
      _ => _.type === DetailInputType.TEXTAREA && !_.label.includes(DraftReportDefaultInputs.description().label),
    )
    if (i > -1) {
      // ReponseConso need the description keyword to parse the reports
      res[i].label = `${DraftReportDefaultInputs.description().label} (${res[i].label})`
    }
    res.push(DraftReportDefaultInputs.reponseConso())
  }
  return res
}
