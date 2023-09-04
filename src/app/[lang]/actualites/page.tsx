import {Metadata} from 'next'
import NewsHome from '../../../components_feature/actualites/NewsHome'
import {getI18n} from '../../../i18n/I18nDictionnary'

export function generateMetadata({params}: any): Metadata {
  const {messages} = getI18n(params.lang)

  return {
    title: messages.titleAndDescriptions.actualites.title,
    description: messages.titleAndDescriptions.actualites.description,
  }
}

const Page = ({params}: any) => {
  return <NewsHome />
}

export default Page
