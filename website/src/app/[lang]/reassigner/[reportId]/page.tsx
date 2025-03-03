import {buildGenerateMetadataForNoIndexPage, PageComponentProps, PathParams} from '@/core/metadatas'
import {ReassignCompany} from '@/components_feature/reportFlow/Company/ReassignCompany'
import {LimitedWidthPageContainer} from '@/components_simple/PageContainers'

type LocalPathParams = PathParams<{
  reportId: string
}>

export const generateMetadata = buildGenerateMetadataForNoIndexPage('reassigner')

export default function Page(props: PageComponentProps<LocalPathParams>) {
  return (
    <LimitedWidthPageContainer>
      <ReassignCompany reportId={props.params.reportId} isWebView={false} />
    </LimitedWidthPageContainer>
  )
}
