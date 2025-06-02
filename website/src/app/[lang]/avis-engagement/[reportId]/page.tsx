import {EngagementReviewPage} from '@/components_feature/ConsumerReview'
import {PageComponentProps, PathParams, buildGenerateMetadataForNoIndexPage} from '@/core/metadatas'

type LocalPathParams = PathParams<{
  reportId: string
}>

export const generateMetadata = buildGenerateMetadataForNoIndexPage('avisEngagement')

export default async function (props: PageComponentProps<LocalPathParams>) {
  return <EngagementReviewPage reportId={(await props.params).reportId} />
}
