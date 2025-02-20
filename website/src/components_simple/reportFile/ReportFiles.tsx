import {UploadingReportFile} from '@/components_simple/reportFile/UploadingReportFile'
import {useI18n} from '@/i18n/I18n'
import {UploadingFile} from '@/model/UploadingFile'
import {useMutation} from '@tanstack/react-query'
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import {useApiClients} from '../../context/ApiClientsContext'
import {appConfig} from '../../core/appConfig'
import {useToastError} from '../../hooks/useToastError'
import {FileOrigin, UploadedFile} from '../../model/UploadedFile'
import {compressFile} from '../../utils/compressFile'
import {ReportFile} from './ReportFile'
import {ADD_FILE_HELP_ID, ReportFileAdd} from './ReportFileAdd'
import {extractFileExt} from './reportFileConfig'

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
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([])
  const {m} = useI18n()
  const [isDraggingOver, setIsDraggingOver] = useState(false)
  useEffect(() => {
    setInnerFiles(files)
    setUploadingFiles(prev => prev.filter(uploadingFile => files.every(file => file.id !== uploadingFile.id)))
  }, [files])

  const {signalConsoApiClient} = useApiClients()
  const toastError = useToastError()
  const _removeFileMutation = useMutation({
    mutationFn: (file: UploadedFile) => signalConsoApiClient.removeUploadedFile(file),
  })

  const numberOfFilesUploadingOrUploaded = innerFiles.length + uploadingFiles.length

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
    const fileCountUploadAttempt = fileCount + numberOfFilesUploadingOrUploaded
    if (fileCountUploadAttempt > max) {
      toastError(m.invalidCount(max, max - numberOfFilesUploadingOrUploaded))
      return
    } else {
      const filesToUpload: UploadingFile[] = []
      for (let fileIndex = 0; fileIndex <= fileCount; fileIndex++) {
        if (files && files[fileIndex]) {
          const uuid = uuidv4()
          const controller = new AbortController()
          filesToUpload.push({
            id: uuid,
            filename: files[fileIndex].name,
            progress: 0,
            controller: controller,
          })
        }
      }
      setUploadingFiles(prev => [...prev, ...filesToUpload])
      for (let fileIndex = 0; fileIndex <= fileCount; fileIndex++) {
        if (files && files[fileIndex]) {
          await uploadFile(files[fileIndex], filesToUpload[fileIndex])
        }
      }
    }
  }

  const uploadFile = async (file: File, uploadingFile: UploadingFile) => {
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

    const fileToUpload = fileExt === 'heic' ? heicToJpg(file) : Promise.resolve(file)

    try {
      const f = await fileToUpload
      const compressedFile = await compressFile(f)
      const uploadedFile = await signalConsoApiClient.uploadFile(
        compressedFile,
        fileOrigin,
        uploadingFile.id,
        percent => {
          setUploadingFiles(prev => {
            let filesCopy = [...prev]
            let fileIndex = filesCopy.findIndex(_ => _.id === uploadingFile.id)
            if (fileIndex !== -1) {
              filesCopy[fileIndex].progress = percent
            }

            return filesCopy
          })
        },
        uploadingFile.controller.signal,
      )
      newFile(uploadedFile)
    } catch (e: any) {
      if (e.details.error && !axios.isCancel(e.details.error)) {
        console.warn('failed to upload file', e)
        toastError(e)
      }
    }
  }

  const newFile = (f: UploadedFile) => {
    onNewFile(f)
    setInnerFiles(prev => [f, ...prev])
    setUploadingFiles(prev => prev.filter(_ => _.id !== f.id))
  }

  const removeFile = async (f: UploadedFile) => {
    try {
      await _removeFileMutation.mutateAsync(f)
      onRemoveFile(f)
      setInnerFiles(prev => prev.filter(_ => _.id !== f.id))
    } catch (e) {
      console.warn('failed to delete file', e)
      toastError('Échec de la suppression du fichier')
    }
  }

  const cancelFile = (f: UploadingFile) => {
    f.controller.abort()
    setUploadingFiles(prev => prev.filter(_ => _.id !== f.id))
  }

  const thumbnails = (
    <ul className="flex flex-wrap justify-center mt-4 list-none gap-4">
      {innerFiles
        .filter(_ => _.origin === fileOrigin)
        .map(_ => (
          <li key={_.id}>
            <ReportFile file={_} onRemove={removeFile} />
          </li>
        ))}
      {uploadingFiles.map(f => (
        <li key={f.id}>
          <UploadingReportFile fileName={f.filename} percent={f.progress} onRemove={() => cancelFile(f)} />
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
  const nothingYet = numberOfFilesUploadingOrUploaded <= 0
  const maxReached = numberOfFilesUploadingOrUploaded === max
  // can happen with multiple uploads at once
  const maxExceeded = numberOfFilesUploadingOrUploaded > max

  const redErrorClasses = `before:block before:absolute before:top-0 before:bottom-0 before:left-[-15px] before:pointer-events-none before:right-0 before:border-l-2 before:border-0 before:border-l-scredinputerror before:border-solid before:content-['']`

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
              <ReportFileAdd fileOrigin={fileOrigin} uploadFile={handleChange} />
            </div>
            <p
              className="mt-2 text-sm mb-1 text-center "
              id={ADD_FILE_HELP_ID}
              dangerouslySetInnerHTML={{__html: m.attachmentsDescAllowedFormat(appConfig.upload_allowedExtensions)}}
            />
          </>
        )}
        <p className={`text-sm mb-2 text-center ${tooManyFilesError ? 'text-scredinputerror font-bold' : ''}`} role="status">
          {maxExceeded
            ? m.maxAttachementExceeded(max, numberOfFilesUploadingOrUploaded - max)
            : maxReached
              ? m.maxAttachmentsReached(max)
              : nothingYet
                ? m.maxAttachmentsZero(max)
                : m.maxAttachmentsCurrent(max - numberOfFilesUploadingOrUploaded)}
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
