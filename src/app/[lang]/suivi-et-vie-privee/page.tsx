import {SuiviEtViePrivee, getMetadata} from 'reusablePages/suivi-et-vie-privee'

export async function generateMetadata({params}: any) {
  return getMetadata(params.lang)
}

export default SuiviEtViePrivee
