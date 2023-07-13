import {Cookies, getMetadata} from 'reusablePages/cookies'

export async function generateMetadata({params}: any) {
  return getMetadata(params.lang)
}

export default Cookies
