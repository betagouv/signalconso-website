import {buildGenerateMetadataForWebviews, PageComponentProps, PathParams} from '@/core/metadatas'
import {ReassignCompany} from '@/components_feature/reportFlow/Company/ReassignCompany'
import {WebviewEnvMarker} from '@/utils/WebviewEnvMarker'

type LocalPathParams = PathParams<{
  reportId: string
}>

export const generateMetadata = buildGenerateMetadataForWebviews()

export default function Page(props: PageComponentProps<LocalPathParams>) {
  return (
    <div className="max-w-[624px] px-4 mx-auto pb-4">
      <WebviewEnvMarker />
      <ReassignCompany reportId={props.params.reportId} isWebView={true} />
    </div>
  )
}
