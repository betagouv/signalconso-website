import {PageComponentProps, buildGenerateMetadataForWebviews} from '@/core/metadatas'
import {Contact} from '@/reusablePages/contact'

export const generateMetadata = buildGenerateMetadataForWebviews()

export default async (props: PageComponentProps) => {
  return <Contact lang={(await props.params).lang} isWebView />
}
