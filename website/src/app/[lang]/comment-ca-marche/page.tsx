import {PageComponentProps, buildGenerateMetadata} from '@/core/metadatas'
import {CommentCaMarche} from '@/reusablePages/comment-ca-marche'

export const generateMetadata = buildGenerateMetadata('commentCaMarche')

export default async (props: PageComponentProps) => {
  return <CommentCaMarche lang={(await props.params).lang} isWebView={false} />
}
