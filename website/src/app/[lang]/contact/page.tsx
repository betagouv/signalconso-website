import {PageComponentProps, buildGenerateMetadata} from '@/core/metadatas'
import {Contact} from '@/reusablePages/contact'

export const generateMetadata = buildGenerateMetadata('contact')

export default async (props: PageComponentProps) => {
  return <Contact lang={(await props.params).lang} isWebView={false} />
}
