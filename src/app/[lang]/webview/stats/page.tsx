import {getMetadata, Stats} from 'reusablePages/stats'

export async function generateMetadata({params}: any) {
  return getMetadata(params.lang)
}

export default Stats
