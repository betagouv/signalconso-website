import {Button} from '@codegouvfr/react-dsfr/Button'
import {alpha, Box, Icon, Tooltip} from '@mui/material'
import {useApiClients} from 'context/ApiClientsContext'
import {useI18n} from 'i18n/I18n'
import {UploadedFile} from '../../model/UploadedFile'
import {ScDialog} from '../ScDialog'
import {extensionToType, FileType, reportFileConfig} from './reportFileConfig'
import ImageLoaderWithRetry, {useImageLoaderWithRetries} from './useImageLoaderWithRetries'

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
        <Box
          component="a"
          target="_blank"
          href={fileUrl}
          rel="noreferrer"
          className="after:!hidden !bg-none"
          aria-label={`Télécharger ${file.filename}`}
          sx={{
            display: 'block',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              border: t => '1px solid ' + alpha(t.palette.divider, 0.43),
              borderRadius: 1,
              height: reportFileConfig.cardSize,
              width: reportFileConfig.cardSize,
              position: 'relative',
            }}
          >
            <div className="flex items-center justify-center bg-cover h-full w-full">
              {(() => {
                switch (fileType) {
                  case FileType.Image: {
                    return (
                      <>
                        <Thumbnail src={fileUrl} />
                        <Icon sx={{color: '#00b50f'}}>image</Icon>
                      </>
                    )
                  }
                  case FileType.PDF: {
                    return <Icon sx={{color: '#db4537'}}>picture_as_pdf</Icon>
                  }
                  case FileType.Doc: {
                    return <Icon sx={{color: '#4185f3'}}>article</Icon>
                  }
                  default: {
                    return (
                      <>
                        <Icon>insert_drive_file</Icon>
                      </>
                    )
                  }
                }
              })()}
            </div>
          </Box>
        </Box>
        {onRemove && (
          <div className="w-full text-center">
            <ScDialog
              title={m.removeAsk}
              content={<p className="mb-0" dangerouslySetInnerHTML={{__html: m.thisWillBeRemoved(file.filename)}} />}
              onConfirm={close => {
                remove()
                close()
              }}
              confirmLabel={m.delete}
            >
              <Button size="small" iconId="fr-icon-delete-line" priority="tertiary no outline" className="!p-0 ">
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
