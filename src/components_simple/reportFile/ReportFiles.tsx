import {Box, Icon} from '@mui/material'
import React, {useEffect, useState} from 'react'
import {ADD_FILE_HELP_ID, ReportFileAdd} from './ReportFileAdd'
import {ReportFile} from './ReportFile'
import {Txt} from '../Txt'
import {useI18n} from 'i18n/I18n'
import {FileOrigin, UploadedFile} from '../../model/UploadedFile'
import {appConfig} from '../../core/appConfig'
import {extractFileExt} from './reportFileConfig'
import {compressFile} from '../../utils/compressFile'
import {useApiClients} from '../../context/ApiClientsContext'
import {useToastError} from '../../hooks/useToastError'

export interface ReportFilesProps {
  files: UploadedFile[]
  onNewFile: (f: UploadedFile) => void
  onRemoveFile: (f: UploadedFile) => void
  fileOrigin: FileOrigin
  disableAdd?: boolean
}

export const ReportFiles = ({
  fileOrigin,
  files,
  disableAdd,
  onRemoveFile = () => void 0,
  onNewFile = () => void 0,
}: ReportFilesProps) => {
  const [innerFiles, setInnerFiles] = useState<UploadedFile[]>([])
  const {m} = useI18n()
  const [isDraggingOver, setIsDraggingOver] = useState(false)
  useEffect(() => {
    setInnerFiles(files)
  }, [files])

  const {signalConsoApiClient} = useApiClients()
  const toastError = useToastError()
  const [uploading, setUploading] = useState(false)

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
    const fileCount = files?.length ?? 0

    for (let fileIndex = 0; fileIndex <= fileCount; fileIndex++) {
      if (files && files[fileIndex]) {
        await uploadFile(files[fileIndex])
      }
    }
  }

  const uploadFile = async (file: File) => {
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

    const fileExt = extractFileExt(file.name)

    if (!appConfig.upload_allowedExtensions.includes(`.${fileExt}`)) {
      toastError(m.invalidFileExt(fileExt))
      return
    }

    setUploading(true)

    const fileToUpload = fileExt === 'heic' ? heicToJpg(file) : Promise.resolve(file)

    try {
      const f = await fileToUpload
      const compressedFile = await compressFile(f)
      const uploadedFile = await signalConsoApiClient.uploadDocument(compressedFile, fileOrigin)
      newFile(uploadedFile)
    } catch (e) {
      console.error('failed to upload file', e)
      toastError()
    } finally {
      setUploading(false)
    }
  }

  const newFile = (f: UploadedFile) => {
    onNewFile(f)
    setInnerFiles(prev => [f, ...prev])
  }

  const removeFile = (f: UploadedFile) => {
    onRemoveFile(f)
    setInnerFiles(prev => prev.filter(_ => _.id !== f.id))
  }

  const preventDefaultHandler = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const dropzoneClasses = `fr-upload-group p-4 pt-10 border border-solid rounded ${
    isDraggingOver ? 'border-scbluefrance ' : 'border-gray-300 '
  }`

  const readOnlyBlock =
    innerFiles.length > 0 ? (
      <div className="flex flex-wrap items-center mt-4">
        {innerFiles
          .filter(_ => _.origin === fileOrigin)
          .map(_ => (
            <ReportFile key={_.id} file={_} onRemove={removeFile} />
          ))}
      </div>
    ) : (
      <Txt
        block
        color="hint"
        sx={{
          marginTop: 1,
          marginBottom: 1,
        }}
      >
        {m.noAttachment}
      </Txt>
    )

  return disableAdd ? (
    readOnlyBlock
  ) : (
    <div
      className={dropzoneClasses}
      onDragOver={e => {
        preventDefaultHandler(e)
        setIsDraggingOver(true)
      }}
      onDragEnter={e => {
        preventDefaultHandler(e)
        setIsDraggingOver(true)
      }}
      onDragLeave={e => {
        preventDefaultHandler(e)
        setIsDraggingOver(false)
      }}
      onDrop={e => {
        preventDefaultHandler(e)
        setIsDraggingOver(false)
        handleChange(e.dataTransfer.files)
      }}
    >
      <Box className="flex flex-wrap items-center justify-center mt-4 ">
        {innerFiles.length > 0 ? (
          innerFiles.filter(_ => _.origin === fileOrigin).map(_ => <ReportFile key={_.id} file={_} onRemove={removeFile} />)
        ) : (
          <div className=" mb-4">
            <div className="flex items-center justify-center mb-2">
              <Icon className="text-[#000091]" fontSize="large">
                cloud_download
              </Icon>
            </div>
            <div className="text-center text-lg">{m.dropZone}</div>
          </div>
        )}
      </Box>
      <div className="flex flex-col">
        <div className="text-center mb-3 mt-3">
          <ReportFileAdd fileOrigin={fileOrigin} isUploading={uploading} uploadFile={handleChange} />
        </div>
        <div className="divide-y"></div>
        <p
          className="mt-2 text-sm mb-1 text-center "
          id={ADD_FILE_HELP_ID}
          dangerouslySetInnerHTML={{__html: m.attachmentsDescAllowedFormat(appConfig.upload_allowedExtensions)}}
        />
        {innerFiles.length === appConfig.maxNumberOfAttachments ? (
          <span className="text-sm text-center" role="status">
            {m.maxAttachmentsZero(appConfig.maxNumberOfAttachments)}
          </span>
        ) : (
          <p className="text-sm mt-0 mb-2 text-center" role="status">
            {m.maxAttachmentsCurrent(appConfig.maxNumberOfAttachments - innerFiles.length)}
          </p>
        )}
      </div>
    </div>
  )
}
