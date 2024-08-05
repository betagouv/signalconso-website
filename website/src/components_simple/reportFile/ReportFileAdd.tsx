import {Button} from '@codegouvfr/react-dsfr/Button'
import {useApiClients} from '@/context/ApiClientsContext'
import {useToastError} from '@/hooks/useToastError'
import {useI18n} from '@/i18n/I18n'
import {useRef, useState} from 'react'
import {appConfig} from '../../core/appConfig'
import {FileOrigin, UploadedFile} from '../../model/UploadedFile'
import {compressFile} from '../../utils/compressFile'
import {extractFileExt} from './reportFileConfig'
import {DragDropContext, Droppable} from '@hello-pangea/dnd'

interface Props {
  fileOrigin: FileOrigin
  isUploading: boolean
  uploadFile: (files: FileList | null) => Promise<void>
}

export const ADD_FILE_HELP_ID = 'aide-piece-jointe'

export const ReportFileAdd = ({isUploading, fileOrigin, uploadFile}: Props) => {
  const [uploading, setUploading] = useState(isUploading)
  const fileInputEl = useRef<HTMLInputElement>(null)
  const {m} = useI18n()
  const openFileSelection = () => {
    fileInputEl.current!.click()
  }

  return (
    <>
      <Button
        {...(uploading
          ? {
              style: {
                paddingLeft: '14px',
              },
            }
          : {iconId: 'ri-download-2-line'})}
        priority="secondary"
        disabled={uploading}
        onClick={openFileSelection}
        className=""
        nativeButtonProps={{'aria-describedby': ADD_FILE_HELP_ID}}
      >
        {uploading && <div className="sc-loader w-4 h-4 mr-2"></div>}
        {m.addAttachmentFile}
      </Button>
      <input
        className="hidden"
        accept={appConfig.upload_allowedExtensions.join(',')}
        type="file"
        ref={fileInputEl}
        onChange={e => uploadFile(e.target.files)}
        multiple
      />
    </>
  )
}
