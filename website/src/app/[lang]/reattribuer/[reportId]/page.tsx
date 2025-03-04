import {buildGenerateMetadataForNoIndexPage, PageComponentProps, PathParams} from '@/core/metadatas'
import {ReattributeCompany} from '@/components_feature/reportFlow/Company/ReattributeCompany'
import {LimitedWidthPageContainer} from '@/components_simple/PageContainers'

type LocalPathParams = PathParams<{
  reportId: string
}>

export const generateMetadata = buildGenerateMetadataForNoIndexPage('reattribuer')

export default function Page(props: PageComponentProps<LocalPathParams>) {
  return (
    <LimitedWidthPageContainer>
      <ReattributeCompany reportId={props.params.reportId} isWebView={false} />
    </LimitedWidthPageContainer>
  )
}
