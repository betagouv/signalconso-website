import '@testing-library/jest-dom'
import {DraftReportDefaultInputs, getDraftReportInputs} from './draftReportInputs'
import {Fixture} from '../../../test/fixture'
import {DetailsFixtureInput} from '../../Playground/PlaygroundDetails'
import {ReportTag} from '../../../anomaly/Anomaly'

describe('getDraftReportInputs', () => {
  it('should generate default inputs', () => {
    const inputs = getDraftReportInputs({
      subcategories: [Fixture.genSubcategory()],
    })
    expect(inputs).toEqual([DraftReportDefaultInputs.date(), DraftReportDefaultInputs.description()])
  })

  it('should generate default inputs including reponseConso inputs', () => {
    const inputs = getDraftReportInputs({
      subcategories: [Fixture.genSubcategory()],
      tags: [ReportTag.ReponseConso],
    })
    expect(inputs).toEqual([
      DraftReportDefaultInputs.date(),
      DraftReportDefaultInputs.description(),
      DraftReportDefaultInputs.reponseConso,
    ])
  })

  it('should generate single input with optional textarea', () => {
    const inputs = getDraftReportInputs({
      subcategories: [Fixture.genSubcategory()],
    })
    expect(inputs).toEqual([DetailsFixtureInput.text, DraftReportDefaultInputs.description(true)])
  })

  it('should generate custom input with reponseconso', () => {
    const inputs = getDraftReportInputs({
      tags: [ReportTag.ReponseConso],
      subcategories: [Fixture.genSubcategory(), {id: '', title: '', detailInputs: [DetailsFixtureInput.date]}],
    })
    expect(inputs).toEqual([
      DetailsFixtureInput.date,
      DraftReportDefaultInputs.description(true),
      DraftReportDefaultInputs.reponseConso,
    ])
  })
})
