import {Contact, getMetadata} from 'reusablePages/contact'

export async function generateMetadata({params}: any) {
  return getMetadata(params.lang)
}

export default Contact
