import {Litige, getMetadata} from 'reusablePages/litige'

export async function generateMetadata({params}: any) {
  return getMetadata(params.lang)
}
export default Litige
