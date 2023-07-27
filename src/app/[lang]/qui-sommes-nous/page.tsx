import {QuiSommesNous, getMetadata} from 'reusablePages/qui-sommes-nous'

export async function generateMetadata({params}: any) {
  return getMetadata(params.lang)
}

export default QuiSommesNous
