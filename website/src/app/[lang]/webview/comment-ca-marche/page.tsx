import {PageComponentProps, buildGenerateMetadataForWebviews} from '@/core/metadatas'
import {CommentCaMarche} from '@/reusablePages/comment-ca-marche'

export const generateMetadata = buildGenerateMetadataForWebviews()

export default async (props: PageComponentProps) => {
  return <CommentCaMarche lang={(await props.params).lang} isWebView />
}
