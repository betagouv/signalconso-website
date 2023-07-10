import {fr} from './localization/fr'

export const getI18n = (locale: string) => {
  switch (locale) {
    case 'fr':
      return fr
    default:
      return fr
  }
}
