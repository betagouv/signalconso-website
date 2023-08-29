import {alpha, Box, Icon, IconButton, Tooltip} from '@mui/material'
import {useApiClients} from 'context/ApiClientsContext'
import {useI18n} from 'i18n/I18n'
import {UploadedFile} from '../../model/UploadedFile'
import {ScDialog} from '../ScDialog'
import {extensionToType, FileType, reportFileConfig} from './reportFileConfig'

export interface ReportFileProps {
  file: UploadedFile
  dense?: boolean
  onRemove?: (file: UploadedFile) => void
}

const removeBtnSize = 30
const cardMargin = 1

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
      <Box
        component="a"
        target="_blank"
        href={fileUrl}
        rel="noreferrer"
        className="after:!hidden"
        aria-label={`Télécharger ${file.filename}`}
        sx={{
          display: 'block',
          position: 'relative',
          p: cardMargin,
          '&:hover > .remove-btn': {
            display: 'flex !important',
          },
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            border: t => '1px solid ' + alpha(t.palette.divider, 0.43),
            borderRadius: reportFileConfig.cardBorderRadius + 'px',
            height: reportFileConfig.cardSize,
            width: reportFileConfig.cardSize,
            color: t => t.palette.text.disabled,
            overflow: 'hidden',
            position: 'relative',
            transition: t => t.transitions.create('all'),
            '&:hover': {
              boxShadow: t => t.shadows[4],
            },
            '& > div': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundSize: 'cover',
              height: '100%',
              width: '100%',
            },
          }}
        >
          {(() => {
            switch (fileType) {
              case FileType.Image: {
                return (
                  <div>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                        backgroundSize: 'cover',
                        backgroundImage: `url(${fileUrl})`,
                      }}
                    />
                    <Icon sx={{color: '#00b50f'}}>image</Icon>
                  </div>
                )
              }
              case FileType.PDF: {
                return (
                  <div>
                    <Icon sx={{color: '#db4537'}}>picture_as_pdf</Icon>
                  </div>
                )
              }
              case FileType.Doc: {
                return (
                  <div>
                    <Icon sx={{color: '#4185f3'}}>article</Icon>
                  </div>
                )
              }
              default: {
                return (
                  <div>
                    <Icon>insert_drive_file</Icon>
                  </div>
                )
              }
            }
          })()}
        </Box>
        {onRemove && (
          <ScDialog
            title={m.removeAsk}
            content={<p className="mb-0" dangerouslySetInnerHTML={{__html: m.thisWillBeRemoved(file.filename)}} />}
            maxWidth="xs"
            onClick={e => {
              e.stopPropagation()
              e.preventDefault()
            }}
            onConfirm={(event, close) => {
              remove()
              close()
            }}
            confirmLabel={m.delete}
          >
            <IconButton
              size="small"
              className="remove-btn"
              sx={{
                display: 'none !important',
                position: 'absolute',
                top: (removeBtnSize - 8 * cardMargin) / -2,
                right: (removeBtnSize - 8 * cardMargin) / -2,
                width: removeBtnSize,
                height: removeBtnSize,
                borderRadius: removeBtnSize + 'px',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: t => t.shadows[4],
                background: t => t.palette.background.paper + ' !important',
              }}
            >
              <Icon>clear</Icon>
            </IconButton>
          </ScDialog>
        )}
      </Box>
    </Tooltip>
  )
}
