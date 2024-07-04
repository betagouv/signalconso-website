import {useI18n} from '@/i18n/I18n'
import React, {useEffect, useState} from 'react'
import {useApiClients} from '../../context/ApiClientsContext'
import {appConfig} from '../../core/appConfig'
import {useToastError} from '../../hooks/useToastError'
import {FileOrigin, UploadedFile} from '../../model/UploadedFile'
import {compressFile} from '../../utils/compressFile'
import {ReportFile} from './ReportFile'
import {ADD_FILE_HELP_ID, ReportFileAdd} from './ReportFileAdd'
import {extractFileExt} from './reportFileConfig'
import {ApiError} from '@/clients/BaseApiClient'

export interface ReportFilesProps {
  files: UploadedFile[]
  onNewFile: (f: UploadedFile) => void
  onRemoveFile: (f: UploadedFile) => void
  fileOrigin: FileOrigin
  tooManyFilesError: boolean
}

const preventDefaultHandler = (e: React.DragEvent<HTMLElement>) => {
  e.preventDefault()
  e.stopPropagation()
}

export const ReportFiles = ({fileOrigin, files, onRemoveFile, onNewFile, tooManyFilesError}: ReportFilesProps) => {
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
    } catch (e: any) {
      console.warn('failed to upload file', e)
      toastError(e)
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

  const thumbnails = (
    <ul className="flex flex-wrap items-center justify-center mt-4 list-none gap-4">
      {innerFiles
        .filter(_ => _.origin === fileOrigin)
        .map(_ => (
          <li key={_.id}>
            <ReportFile file={_} onRemove={removeFile} />
          </li>
        ))}
    </ul>
  )

  function onDrag(e: React.DragEvent<HTMLDivElement>) {
    preventDefaultHandler(e)
    if (!maxReached) {
      setIsDraggingOver(true)
    }
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    preventDefaultHandler(e)
    if (!maxReached) {
      setIsDraggingOver(false)
      handleChange(e.dataTransfer.files)
    }
  }

  const max = appConfig.maxNumberOfAttachments
  const nothingYet = innerFiles.length <= 0
  const maxReached = innerFiles.length === max
  // can happen with multiple uploads at once
  const maxExceeded = innerFiles.length > max

  const redErrorClasses = `before:block before:absolute before:top-0 before:bottom-0 before:left-[-15px] before:pointer-events-none before:right-0 before:border-l-2 before:border-0 before:border-l-scerrorred before:border-solid before:content-['']`

  return (
    <div
      className={`relative fr-upload-group p-4 pt-8 border-2  rounded ${
        isDraggingOver
          ? 'border-blue-500 border-solid'
          : nothingYet
            ? 'border-gray-500 border-dashed'
            : 'border-gray-300 border-solid'
      } ${tooManyFilesError ? redErrorClasses : ''}`}
      onDragOver={onDrag}
      onDragEnter={onDrag}
      onDragLeave={onDrag}
      onDrop={onDrop}
    >
      <div className="flex flex-col">
        {!maxReached && !maxExceeded && (
          <>
            {nothingYet && <UploadInvitation />}
            <div className={`text-center ${nothingYet ? 'mb-6' : 'mb-2'}`}>
              <ReportFileAdd fileOrigin={fileOrigin} isUploading={uploading} uploadFile={handleChange} />
            </div>
            <p
              className="mt-2 text-sm mb-1 text-center "
              id={ADD_FILE_HELP_ID}
              dangerouslySetInnerHTML={{__html: m.attachmentsDescAllowedFormat(appConfig.upload_allowedExtensions)}}
            />
          </>
        )}
        <p className={`text-sm mb-2 text-center ${tooManyFilesError ? 'text-scerrorred font-bold' : ''}`} role="status">
          {maxExceeded
            ? m.maxAttachementExceeded(max, innerFiles.length - max)
            : maxReached
              ? m.maxAttachmentsReached(max)
              : nothingYet
                ? m.maxAttachmentsZero(max)
                : m.maxAttachmentsCurrent(max - innerFiles.length)}
        </p>
        {!nothingYet && thumbnails}
      </div>
    </div>
  )
}

function UploadInvitation() {
  const {m} = useI18n()

  return (
    <div className="mb-6">
      <div className="flex items-center justify-center mb-2">
        <i className="text-gray-300 ri-download-2-line sc-icon-xxl" />
      </div>
      <div className="text-center text-lg">{m.dropZone}</div>
    </div>
  )
}
