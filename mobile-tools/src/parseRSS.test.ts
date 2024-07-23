import {filterRSS} from './rss.filterting'

describe('Parse RSS', () => {
  test('should filter correctly', () => {
    const res = filterRSS([
      {
        title: 'Amende de 350 000 € prononcée à l’encontre de la société SMAC (numéro de SIRET : 68204083702057)',
        link: 'https://www.economie.gouv.fr/dgccrf/amende-de-350-000-eu-prononcee-lencontre-de-la-societe-smac-numero-de-siret-68204083702057',
        description: '',
        guid: '3228600',
        date: '2024-05-17T14:24:51+02:00',
      },
    ])
    expect(res.length).toBe(1)
  })
})
