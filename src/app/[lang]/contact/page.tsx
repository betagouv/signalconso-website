import {PageComponentProps, buildGenerateMetadata} from '@/core/metadatas'
import {Contact} from '@/reusablePages/contact'

export const generateMetadata = buildGenerateMetadata('contact')

export default (props: PageComponentProps) => {
  return <Contact lang={props.params.lang} isWebView={false} />
}
