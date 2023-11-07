import {buildGenerateMetadata} from 'core/metadatas'
import NewsHome from '../../../components_feature/actualites/NewsHome'

export const generateMetadata = buildGenerateMetadata('actualites')

const Page = () => {
  return <NewsHome />
}

export default Page
