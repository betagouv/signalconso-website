import {CentreAide, getMetadata} from 'reusablePages/centre-aide'
import {Metadata} from 'next'

export async function generateMetadata({params}: any) {
  return getMetadata(params.lang)
}

export default CentreAide
