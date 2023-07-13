import {DelaiDeRetractation, getMetadata} from 'reusablePages/delai-de-retractation'

export async function generateMetadata({params}: any) {
  return getMetadata(params.lang)
}

export default DelaiDeRetractation
