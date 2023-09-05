import {Box} from '@mui/material'
import React, {useEffect, useState} from 'react'
import {ReportFileAdd} from './ReportFileAdd'
import {ReportFile} from './ReportFile'
import {Txt} from '../Txt'
import {useI18n} from 'i18n/I18n'
import {FileOrigin, UploadedFile} from '../../model/UploadedFile'

export interface ReportFilesProps {
  files?: UploadedFile[]
  onNewFile?: (f: UploadedFile) => void
  onRemoveFile?: (f: UploadedFile) => void
  fileOrigin: FileOrigin
  hideAddBtn?: boolean
  hideRemoveBtn?: boolean
}

export const ReportFiles = ({
  fileOrigin,
  files,
  hideAddBtn,
  hideRemoveBtn,
  onRemoveFile = () => void 0,
  onNewFile = () => void 0,
}: ReportFilesProps) => {
  const [innerFiles, setInnerFiles] = useState<UploadedFile[]>()
  const {m} = useI18n()

  useEffect(() => {
    setInnerFiles(files)
  }, [files])

  const newFile = (f: UploadedFile) => {
    onNewFile(f)
    setInnerFiles(prev => [f, ...(prev ?? [])])
  }

  const removeFile = (f: UploadedFile) => {
    onRemoveFile(f)
    setInnerFiles(prev => prev?.filter(_ => _.id !== f.id))
  }

  return (
    <>
      {!hideAddBtn && <ReportFileAdd fileOrigin={fileOrigin} onUploaded={newFile} />}
      <Box className="flex flex-wrap gap-2 mt-4">
        {innerFiles
          ?.filter(_ => _.origin === fileOrigin)
          .map(_ => <ReportFile key={_.id} file={_} onRemove={hideRemoveBtn ? undefined : removeFile} />)}
      </Box>
      {hideAddBtn && innerFiles?.length === 0 && (
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
      )}
    </>
  )
}
