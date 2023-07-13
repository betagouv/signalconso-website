import Arborescence from './Arborescence'
import {getI18n} from '../../../i18n/I18nDictionnary'

export async function generateMetadata({params}: any) {
  const {messages: m} = getI18n(params.lang)
  return {
    title: m.titleAndDescriptions.anomaly.title,
    description: m.titleAndDescriptions.anomaly.description,
    robots: {
      index: false,
    },
  }
}

export default Arborescence
