import {useApiClients} from '@/context/ApiClientsContext'
import {UploadedFile} from '../../model/UploadedFile'
import {ReportFileDeleteButton} from './ReportFileDeleteButton'
import {FileType, extensionToType} from './reportFileConfig'
import {useImageLoaderWithRetries} from './useImageLoaderWithRetries'

export interface ReportFileProps {
  file: UploadedFile
  onRemove?: (file: UploadedFile) => void
}

export const ReportFile = ({file, onRemove}: ReportFileProps) => {
  const fileType = extensionToType(file.filename)
  const {signalConsoApiClient} = useApiClients()

  const fileUrl = signalConsoApiClient.getDocumentLink(file)

  const remove = async () => {
    onRemove?.(file)
  }

  return (
    <div className="">
      <a
        target="_blank"
        href={fileUrl}
        rel="noreferrer"
        className={
          'after:!hidden !bg-none relative flex flex-col' +
          // Matomo tracks all clicks on links
          // But these filenames are potentially sensitive
          ' matomo_ignore'
        }
        aria-label={`Télécharger ${file.filename}`}
      >
        <div className="inline-flex border border-solid border-gray-500 overflow-hidden rounded h-[100px] w-[100px] relative">
          <div className="flex items-center justify-center bg-cover h-full w-full">
            {(() => {
              switch (fileType) {
                case FileType.Image:
                  return (
                    <>
                      <Thumbnail src={fileUrl} />
                      <i className="ri-image-line text-gray-500" />
                    </>
                  )
                case FileType.Doc:
                  return <i className="ri-file-text-line text-gray-500" />
                case FileType.PDF:
                default:
                  return <i className="ri-file-3-line text-gray-500" />
              }
            })()}
          </div>
        </div>
        <span className="px-1 w-[100px] text-black text-center text-sm whitespace-nowrap overflow-hidden text-ellipsis">
          {file.filename}
        </span>
      </a>
      {onRemove && (
        <div className="w-full text-center">
          <ReportFileDeleteButton
            filename={file.filename}
            onConfirm={() => {
              remove()
            }}
          />
        </div>
      )}
    </div>
  )
}

function Thumbnail({src}: {src: string}) {
  const loaded = useImageLoaderWithRetries(src)
  return (
    <div
      className="absolute top-0 right-0 left-0 bottom-0 bg-cover rounded-sm z-10"
      {...(loaded ? {style: {backgroundImage: `url("${src}")`}} : null)}
    />
  )
}
