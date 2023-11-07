import {PageComponentProps, buildGenerateMetadataForWebviews} from 'core/metadatas'
import {Contact} from 'reusablePages/contact'

export const generateMetadata = buildGenerateMetadataForWebviews()

export default (props: PageComponentProps) => {
  return <Contact lang={props.params.lang} isWebView />
}
