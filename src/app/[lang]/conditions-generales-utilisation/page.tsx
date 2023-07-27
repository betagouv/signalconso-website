import {ConditionsGeneralesUtilisation, getMetadata} from 'reusablePages/conditions-generales-utilisation'

export async function generateMetadata({params}: any) {
  return getMetadata(params.lang)
}

export default ConditionsGeneralesUtilisation
