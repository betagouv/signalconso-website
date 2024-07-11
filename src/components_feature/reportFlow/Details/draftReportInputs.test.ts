import '@testing-library/jest-dom'
import {AppLangs} from '../../../i18n/localization/AppLangs'
import {DraftReportDefaultInputs, getDraftReportInputs} from './draftReportInputs'

describe('getDraftReportInputs', () => {
  it('should generate default inputs', () => {
    const inputs = getDraftReportInputs(
      {
        category: 'DemoCategory',
        lang: 'fr',
        subcategoriesIndexes: [0],
      },
      AppLangs.fr,
    )
    expect(inputs).toEqual([DraftReportDefaultInputs.date(AppLangs.fr), DraftReportDefaultInputs.description()])
  })

  it('should generate default inputs including reponseConso inputs', () => {
    const inputs = getDraftReportInputs(
      {
        category: 'DemoCategory',
        lang: 'fr',
        subcategoriesIndexes: [0],
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

  it('should generate inputs with optional textarea', () => {
    const inputs = getDraftReportInputs(
      {
        category: 'DemoCategory',
        lang: 'fr',
        subcategoriesIndexes: [8],
      },
      AppLangs.fr,
    )
    expect(inputs).toEqual([
      {
        label: 'simple input texte (le type TEXT)',
        type: 'TEXT',
      },
      {
        label: 'input radio',
        options: [
          'première option',
          'seconde option',
          "troisième option qu'il faut préciser (à préciser)",
          "quatrième option qu'il faut préciser (à préciser)",
        ],
        type: 'RADIO',
      },
      {
        label: 'input radio optionnel',
        optional: true,
        options: ['première option', 'seconde option', "troisième option qu'il faut préciser (à préciser)"],
        type: 'RADIO',
      },
      {
        label: 'input checkbox',
        options: [
          'première option',
          'seconde option',
          "troisième option qu'il faut préciser (à préciser)",
          'quatrième option',
          "cinquième option qu'il faut aussi préciser (à préciser)",
        ],
        type: 'CHECKBOX',
      },
      DraftReportDefaultInputs.description(true),
    ])
  })

  it('should generate custom input with reponseconso', () => {
    const inputs = getDraftReportInputs(
      {
        category: 'DemoCategory',
        lang: 'fr',
        subcategoriesIndexes: [4, 0],
        consumerWish: 'getAnswer',
      },
      AppLangs.fr,
    )
    expect(inputs).toEqual([
      DraftReportDefaultInputs.date('fr'),
      DraftReportDefaultInputs.description(false),
      DraftReportDefaultInputs.reponseConso(AppLangs.fr),
    ])
  })
})
