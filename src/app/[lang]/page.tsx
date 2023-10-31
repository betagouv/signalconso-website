import {Homepage} from 'components_feature/home/Homepage'
import {Metadata} from 'next'

type Params = {
  lang: string
}

export function generateMetadata({params: {lang}}: {params: Params}): Metadata {
  return {
    alternates: {
      // We hope this will stop Google referencing the homepage with various query parameters (from FB or google ads typically)
      canonical: `/${lang}`,
    },
  }
}

const Home = () => {
  return <Homepage />
}

export default Home
