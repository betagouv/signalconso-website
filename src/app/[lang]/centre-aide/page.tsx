import {CentreAide, getMetadata} from 'reusablePages/centre-aide'

export async function generateMetadata({params}: any) {
  return getMetadata(params.lang)
}

export default CentreAide
