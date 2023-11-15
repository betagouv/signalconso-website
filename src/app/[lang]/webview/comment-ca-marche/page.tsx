import {PageComponentProps, buildGenerateMetadataForWebviews} from '@/core/metadatas'
import {CommentCaMarche} from '@/reusablePages/comment-ca-marche'

export const generateMetadata = buildGenerateMetadataForWebviews()

export default (props: PageComponentProps) => {
  return <CommentCaMarche lang={props.params.lang} isWebView />
}
