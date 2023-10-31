import {Homepage} from 'components_feature/home/Homepage'
import {pagesDefs} from 'core/pagesDefinitions'
import {Metadata} from 'next'

type Params = {
  lang: string
}

export function generateMetadata({params: {lang}}: {params: Params}): Metadata {
  return {
    alternates: {
      // We hope this will stop Google referencing the homepage with various query parameters (from FB or google ads typically)
      canonical: `/${lang}${pagesDefs.index.url}`,
    },
  }
}

const Home = () => {
  return <Homepage />
}

export default Home
