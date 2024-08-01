import '@testing-library/jest-dom'
import {AppLangs} from '../../../i18n/localization/AppLangs'
import {ReportDefaultInputs, getReportInputs} from './draftReportInputs'

describe('getDraftReportInputs', () => {
  it('should generate default inputs', () => {
    const inputs = getReportInputs(
      {
        step0: {
          lang: 'fr',
          category: 'DemoCategory',
        },
        step1: {subcategoriesIndexes: [0]},
      },
      AppLangs.fr,
    )
    expect(inputs).toEqual([ReportDefaultInputs.date(AppLangs.fr), ReportDefaultInputs.description()])
  })

  it('should generate default inputs including reponseConso inputs', () => {
    const inputs = getReportInputs(
      {
        step0: {
          lang: 'fr',
          category: 'DemoCategory',
        },
        step1: {subcategoriesIndexes: [0], consumerWish: 'getAnswer'},
      },
      AppLangs.fr,
    )
    expect(inputs).toEqual([
      ReportDefaultInputs.date(AppLangs.fr),
      ReportDefaultInputs.description(),
      ReportDefaultInputs.reponseConso(AppLangs.fr),
    ])
  })

  it('should generate inputs with optional textarea', () => {
    const inputs = getReportInputs(
      {
        step0: {
          lang: 'fr',
          category: 'DemoCategory',
        },
        step1: {subcategoriesIndexes: [8]},
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
      ReportDefaultInputs.description(true),
    ])
  })

  it('should generate custom input with reponseconso', () => {
    const inputs = getReportInputs(
      {
        step0: {
          lang: 'fr',
          category: 'DemoCategory',
        },
        step1: {subcategoriesIndexes: [4, 0], consumerWish: 'getAnswer'},
      },
      AppLangs.fr,
    )
    expect(inputs).toEqual([
      ReportDefaultInputs.date('fr'),
      ReportDefaultInputs.description(false),
      ReportDefaultInputs.reponseConso(AppLangs.fr),
    ])
  })
})
