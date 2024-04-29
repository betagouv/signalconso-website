import {PageComponentProps, PathParams, buildGenerateMetadataForNoIndexPage} from '@/core/metadatas'
import {ConsumerReviewOnEngagement} from '@/components_feature/ConsumerReviewOnEngagement'

type LocalPathParams = PathParams<{
  reportId: string
}>

export const generateMetadata = buildGenerateMetadataForNoIndexPage('avisEngagement')

export default function (props: PageComponentProps<LocalPathParams>) {
  return <ConsumerReviewOnEngagement reportId={props.params.reportId} />
}
