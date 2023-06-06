import {CommentCaMarche, getMetadata} from 'reusablePages/comment-ca-marche'
import {Metadata} from 'next'

export const metadata: Metadata = getMetadata()

export default () => <CommentCaMarche isWebView />
