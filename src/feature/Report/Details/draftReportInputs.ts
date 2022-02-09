import {AnomalyClient, DetailInput, DetailInputType, ReportTag, Subcategory} from '@signal-conso/signalconso-api-sdk-js'
import {last} from '../../../core/lodashNamedExport'

export class DraftReportDefaultInputs {

  static readonly reponseConso: DetailInput = {
    label: 'Votre question',
    type: DetailInputType.TEXTAREA,
  }

  static readonly description = (optional?: boolean): DetailInput => ({
    label: 'Description',
    type: DetailInputType.TEXTAREA,
    ...optional && {optionnal: true}
  })

  static readonly date: DetailInput = {
    label: 'Date du constat',
    type: DetailInputType.DATE,
    defaultValue: 'SYSDATE'
  }

  static readonly defaults: DetailInput[] = [
    DraftReportDefaultInputs.description(),
    DraftReportDefaultInputs.date,
  ]
}

export const getDraftReportInputs = ({subcategories, tags}: {subcategories: Subcategory[], tags?: ReportTag[]}): DetailInput[] => {
  const lastSubcategories = last(subcategories)
  const res: DetailInput[] = []
  if (AnomalyClient.instanceOfSubcategoryInput(lastSubcategories)) {
    res.push(...(lastSubcategories.detailInputs) ?? [])
    if (!lastSubcategories.detailInputs?.some(_ => _.type === DetailInputType.TEXTAREA)) {
      res.push(DraftReportDefaultInputs.description(true))
    }
  } else {
    res.push(...DraftReportDefaultInputs.defaults)
  }
  if (tags?.includes(ReportTag.ReponseConso)) {
    res.push(DraftReportDefaultInputs.reponseConso)
  }
  return res
}
