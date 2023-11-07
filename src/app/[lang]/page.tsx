import {Homepage} from 'components_feature/home/Homepage'
import {buildGenerateMetadata} from 'core/metadatas'

export const generateMetadata = buildGenerateMetadata('index')

const Home = () => {
  return <Homepage />
}

export default Home
