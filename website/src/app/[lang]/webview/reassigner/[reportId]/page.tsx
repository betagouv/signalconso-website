import {buildGenerateMetadataForWebviews, PageComponentProps, PathParams} from '@/core/metadatas'
import {ReattributeCompany} from '@/components_feature/reportFlow/Company/ReattributeCompany'
import {WebviewEnvMarker} from '@/utils/WebviewEnvMarker'

type LocalPathParams = PathParams<{
  reportId: string
}>

export const generateMetadata = buildGenerateMetadataForWebviews()

export default async function Page(props: PageComponentProps<LocalPathParams>) {
  return (
    <div className="max-w-[624px] px-4 mx-auto pb-4">
      <WebviewEnvMarker />
      <ReattributeCompany reportId={(await props.params).reportId} isWebView={true} />
    </div>
  )
}
