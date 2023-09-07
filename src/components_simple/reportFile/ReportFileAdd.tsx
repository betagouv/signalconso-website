import {Button} from '@codegouvfr/react-dsfr/Button'
import {useApiClients} from 'context/ApiClientsContext'
import {useToastError} from 'hooks/useToastError'
import {useI18n} from 'i18n/I18n'
import {useRef, useState} from 'react'
import {appConfig} from '../../core/appConfig'
import {FileOrigin, UploadedFile} from '../../model/UploadedFile'
import {compressFile} from '../../utils/compressFile'
import {extractFileExt} from './reportFileConfig'

interface Props {
  fileOrigin: FileOrigin
  onUploaded: (f: UploadedFile) => void
}

export const ADD_FILE_HELP_ID = 'aide-piece-jointe'

export const ReportFileAdd = ({onUploaded, fileOrigin}: Props) => {
  const {m} = useI18n()
  const {signalConsoApiClient} = useApiClients()
  const toastError = useToastError()

  const [uploading, setUploading] = useState(false)
  const fileInputEl = useRef<HTMLInputElement>(null)

  const openFileSelection = () => {
    fileInputEl.current!.click()
  }

  const heicToJpg = async (file: File): Promise<File> => {
    // heic2any needs to access the 'window' object, which is not available when importing the lib at the top of the file
    // because we are doing static rendering using next.js.
    // So we have to import it here to send it to the client side.
    const heic2any = (await import('heic2any')).default
    const newFileName = file.name.replace(/\.heic$/i, '.jpg')
    const lastModified = Date.now()
    if (typeof window !== 'undefined') {
      let jpgType = 'image/jpeg'
      const blob = await heic2any({blob: file, toType: jpgType})
      if (Array.isArray(blob)) return new File(blob, newFileName, {type: jpgType, lastModified: lastModified})
      else return new File([blob], newFileName, {type: jpgType, lastModified: lastModified})
    } else {
      throw new Error('.heic files are not supported on your device')
    }
  }

  const handleChange = async (files: FileList | null) => {
    if (files && files[0]) {
      const file: File = files[0]
      if (file.size === 0) {
        toastError(m.emptyFile)
        return
      }
      if (file.size > appConfig.upload_maxSizeMb * 1024 * 1024) {
        toastError(m.invalidSize(appConfig.upload_maxSizeMb))
        return
      }
      if (file.name.length > 255) {
        toastError(m.invalidFileNameSize(255))
        return
      }

      setUploading(true)

      const fileExt = extractFileExt(file.name)
      const fileToUpload = fileExt === 'heic' ? heicToJpg(file) : Promise.resolve(file)

      try {
        const f = await fileToUpload
        const compressedFile = await compressFile(f)
        const uploadedFile = await signalConsoApiClient.uploadDocument(compressedFile, fileOrigin)
        onUploaded(uploadedFile)
      } catch (e) {
        console.error('failed to upload file', e)
        toastError()
      } finally {
        setUploading(false)
      }
    }
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
          : {iconId: 'fr-icon-upload-line'})}
        priority="secondary"
        disabled={uploading}
        onClick={openFileSelection}
        className=""
        nativeButtonProps={{'aria-describedby': ADD_FILE_HELP_ID}}
      >
        {uploading && <div className="sc-loader w-4 h-4 mr-2"></div>}
        Ajouter une pièce jointe
      </Button>
      <input
        className="hidden"
        accept={appConfig.upload_allowedExtensions.join(',')}
        type="file"
        ref={fileInputEl}
        onChange={e => handleChange(e.target.files)}
      />
    </>
  )
}
