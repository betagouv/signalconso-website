import React, {useRef, useState} from 'react'
import {Box, Button, CircularProgress, Icon, Theme, Tooltip} from '@mui/material'
import {reportFileConfig} from './reportFileConfig'
import {useI18n} from 'i18n/I18n'
import {useApiClients} from 'context/ApiClientsContext'
import {appConfig} from '../../core/appConfig'
import {styleUtils} from 'core/theme'
import {useToast} from 'hooks/useToast'
import {SxProps} from '@mui/system'
import {FileOrigin, UploadedFile} from '../../model/UploadedFile'
import {compressFile} from '../../utils/compressFile'

const styles: {[key: string]: SxProps<Theme>} = {
  root: {
    border: t => '1px solid ' + t.palette.divider,
    margin: 1,
    borderRadius: reportFileConfig.cardBorderRadius + 'px',
    height: reportFileConfig.cardSize,
    width: reportFileConfig.cardSize,
    color: t => t.palette.text.disabled,
    overflow: 'hidden',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  icon: {
    fontSize: 32,
  },
  label: {
    fontSize: t => styleUtils(t).fontSize.small,
    textTransform: 'initial',
    fontWeight: 'normal',
    lineHeight: 1.4,
  },
}

interface Props {
  fileOrigin: FileOrigin
  onUploaded: (f: UploadedFile) => void
}

export const ReportFileAdd = ({onUploaded, fileOrigin}: Props) => {
  const {m} = useI18n()
  const {signalConsoApiClient} = useApiClients()
  const {toastError} = useToast()

  const [uploading, setUploading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const fileInputEl = useRef<HTMLInputElement>(null)

  const openFileSelection = () => {
    fileInputEl.current!.click()
  }

  const handleChange = (files: FileList | null) => {
    if (files && files[0]) {
      const file: File = files[0]
      if (file.size > appConfig.upload_maxSizeMb * 1024 * 1024) {
        toastError({message: m.invalidSize(appConfig.upload_maxSizeMb)})
        setErrorMessage(m.invalidSize(appConfig.upload_maxSizeMb))
        return
      }
      if (file.name.length > 255) {
        toastError({message: m.invalidFileNameSize(255)})
        setErrorMessage(m.invalidFileNameSize(255))
        return
      }
      setUploading(true)
      compressFile(file)
        .then(file => {
          return file
        })
        .then(file => signalConsoApiClient.uploadDocument(file, fileOrigin))
        .then(onUploaded)
        .catch(e => {
          toastError(e)
        })
        .finally(() => setUploading(false))
    }
  }

  if (uploading) {
    return (
      <Box sx={styles.root}>
        <Box sx={styles.body}>
          <CircularProgress />
        </Box>
      </Box>
    )
  } else {
    return (
      <Tooltip title={m.addAttachmentFile}>
        <Button sx={styles.root} onClick={openFileSelection}>
          <Box sx={styles.body}>
            <Icon sx={styles.icon}>add</Icon>
          </Box>
          <input style={{display: 'none'}} type="file" ref={fileInputEl} onChange={e => handleChange(e.target.files)} />
        </Button>
      </Tooltip>
    )
  }
}
