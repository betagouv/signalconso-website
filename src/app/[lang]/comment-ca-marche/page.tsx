import {PageComponentProps, buildGenerateMetadata} from '@/core/metadatas'
import {CommentCaMarche} from '@/reusablePages/comment-ca-marche'

export const generateMetadata = buildGenerateMetadata('commentCaMarche')

export default (props: PageComponentProps) => {
  return <CommentCaMarche lang={props.params.lang} isWebView={false} />
}
