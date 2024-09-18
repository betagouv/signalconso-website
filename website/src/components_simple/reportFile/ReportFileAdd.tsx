import {Button} from '@codegouvfr/react-dsfr/Button'
import {useI18n} from '@/i18n/I18n'
import {useRef} from 'react'
import {appConfig} from '../../core/appConfig'
import {FileOrigin} from '../../model/UploadedFile'

interface Props {
  fileOrigin: FileOrigin
  uploadFile: (files: FileList | null) => Promise<void>
}

export const ADD_FILE_HELP_ID = 'aide-piece-jointe'

export const ReportFileAdd = ({fileOrigin, uploadFile}: Props) => {
  const fileInputEl = useRef<HTMLInputElement>(null)
  const {m} = useI18n()
  const openFileSelection = () => {
    fileInputEl.current!.click()
  }

  return (
    <>
      <Button
        iconId="ri-download-2-line"
        priority="secondary"
        onClick={openFileSelection}
        className=""
        nativeButtonProps={{'aria-describedby': ADD_FILE_HELP_ID}}
      >
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
