import '@testing-library/jest-dom'
import {DraftReportDefaultInputs, getDraftReportInputs} from './draftReportInputs'
import {Fixture} from '../../../test/fixture'
import {DetailsFixtureInput} from '../../Playground/PlaygroundDetails'
import {DetailInputType, ReportTag} from '../../../anomalies/Anomaly'
import {AppLangs} from '../../../i18n/localization/AppLangs'

describe('getDraftReportInputs', () => {
  it('should generate default inputs', () => {
    const inputs = getDraftReportInputs(
      {
        subcategories: [Fixture.genSubcategory()],
      },
      AppLangs.fr,
    )
    expect(inputs).toEqual([DraftReportDefaultInputs.date(AppLangs.fr), DraftReportDefaultInputs.description()])
  })

  it('should generate default inputs including reponseConso inputs', () => {
    const inputs = getDraftReportInputs(
      {
        subcategories: [Fixture.genSubcategory()],
        consumerWish: 'getAnswer',
      },
      AppLangs.fr,
    )
    expect(inputs).toEqual([
      DraftReportDefaultInputs.date(AppLangs.fr),
      DraftReportDefaultInputs.description(),
      DraftReportDefaultInputs.reponseConso(AppLangs.fr),
    ])
  })

  it('should generate single input with optional textarea', () => {
    const inputs = getDraftReportInputs(
      {
        subcategories: [
          Fixture.genSubcategory({
            detailInputs: [DetailsFixtureInput.text],
          }),
        ],
      },
      AppLangs.fr,
    )
    expect(inputs).toEqual([DetailsFixtureInput.text, DraftReportDefaultInputs.description(true)])
  })

  it('should generate custom input with reponseconso', () => {
    const inputs = getDraftReportInputs(
      {
        consumerWish: 'getAnswer',
        subcategories: [Fixture.genSubcategory(), {id: '', title: '', detailInputs: [DetailsFixtureInput.date]}],
      },
      AppLangs.fr,
    )
    expect(inputs).toEqual([
      DetailsFixtureInput.date,
      DraftReportDefaultInputs.description(true),
      DraftReportDefaultInputs.reponseConso(AppLangs.fr),
    ])
  })
})
