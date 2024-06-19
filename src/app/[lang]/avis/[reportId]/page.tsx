import {ConsumerReview} from '@/components_feature/ConsumerReview'
import {PageComponentProps, PathParams, buildGenerateMetadataForNoIndexPage} from '@/core/metadatas'

type LocalPathParams = PathParams<{
  reportId: string
}>

export const generateMetadata = buildGenerateMetadataForNoIndexPage('avis')

export default function Page(props: PageComponentProps<LocalPathParams>) {
  return <ConsumerReview reportId={props.params.reportId} />
}
