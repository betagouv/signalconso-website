import Arborescence from './Arborescence'
import {getI18n} from '../../i18n/I18nDictionnary'
import {Metadata} from 'next'

const genMetadata = () => {
  const {messages: m} = getI18n('fr')
  return {
    title: m.titleAndDescriptions.anomaly.title,
    description: m.titleAndDescriptions.anomaly.description,
    robots: {
      index: false,
    },
  }
}

export const metadata: Metadata = genMetadata()

export default Arborescence
