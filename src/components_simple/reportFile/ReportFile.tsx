import {useApiClients} from '@/context/ApiClientsContext'
import {useI18n} from '@/i18n/I18n'
import {Button} from '@codegouvfr/react-dsfr/Button'
import {Tooltip} from '@mui/material'
import {UploadedFile} from '../../model/UploadedFile'
import {ScDialog} from '../ScDialog'
import {FileType, extensionToType} from './reportFileConfig'
import {useImageLoaderWithRetries} from './useImageLoaderWithRetries'

export interface ReportFileProps {
  file: UploadedFile
  onRemove?: (file: UploadedFile) => void
}

export const ReportFile = ({file, onRemove}: ReportFileProps) => {
  const fileType = extensionToType(file.filename)
  const {signalConsoApiClient} = useApiClients()
  const {m} = useI18n()

  const fileUrl = signalConsoApiClient.getDocumentLink(file)

  const remove = async () => {
    onRemove?.(file)
  }

  return (
    <Tooltip title={file.filename}>
      <div className="mb-4 ml-4">
        <a
          target="_blank"
          href={fileUrl}
          rel="noreferrer"
          className="after:!hidden !bg-none block relative"
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
        </a>
        {onRemove && (
          <div className="w-full text-center">
            <ScDialog
              title={m.removeAsk}
              iconId={'fr-icon-delete-line'}
              content={<p className="mb-0" dangerouslySetInnerHTML={{__html: m.thisWillBeRemoved(file.filename)}} />}
              onConfirm={close => {
                remove()
                close()
              }}
              confirmLabel={m.delete}
            >
              <Button
                size="small"
                iconId="fr-icon-delete-line"
                priority="tertiary no outline"
                className="!p-0"
                nativeButtonProps={{'aria-label': `${m.delete} ${file.filename}`}}
              >
                {m.delete.toLowerCase()}
              </Button>
            </ScDialog>
          </div>
        )}
      </div>
    </Tooltip>
  )
}

function Thumbnail({src}: {src: string}) {
  const loaded = useImageLoaderWithRetries(src)
  return (
    <div
      className="absolute top-0 right-0 left-0 bottom-0 bg-cover rounded-sm"
      {...(loaded ? {style: {backgroundImage: `url("${src}")`}} : null)}
    />
  )
}
