import {CommentCaMarche, getMetadata} from 'reusablePages/comment-ca-marche'

export async function generateMetadata({params}: any) {
  return getMetadata(params.lang)
}

export default CommentCaMarche
