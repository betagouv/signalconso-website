import React, {useRef, useState} from 'react'
import {Button, CircularProgress, Icon, Theme, Tooltip} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import {reportFileConfig} from './reportFileConfig'
import {FileOrigin, Id, UploadedFile} from '@signal-conso/signalconso-api-sdk-js'
import {useI18n} from '../../core/i18n'
import {useApiSdk} from '../../core/context/ApiSdk'
import {config} from '../../conf/config'
import {styleUtils} from '../../core/theme/theme'
import {useToast} from '../../core/toast'

const useStyles = makeStyles((t: Theme) => ({
  root: {
    border: '1px solid ' + t.palette.divider,
    margin: t.spacing(1),
    borderRadius: reportFileConfig.cardBorderRadius,
    height: reportFileConfig.cardSize,
    width: reportFileConfig.cardSize,
    color: t.palette.text.disabled,
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
    fontSize: styleUtils(t).fontSize.small,
    textTransform: 'initial',
    fontWeight: 'normal',
    lineHeight: 1.4,
  },
}))

interface Props {
  fileOrigin: FileOrigin
  onUploaded: (f: UploadedFile) => void
}

export const ReportFileAdd = ({onUploaded, fileOrigin}: Props) => {
  const css = useStyles()
  const {m} = useI18n()
  const {apiSdk} = useApiSdk()
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
      if (file.size > config.upload_maxSizeMb * 1024 * 1024) {
        toastError({message: m.invalidSize(config.upload_maxSizeMb)})
        setErrorMessage(m.invalidSize(config.upload_maxSizeMb))
        return
      }
      setUploading(true)
      apiSdk.document
        .upload(file, fileOrigin)
        .then(onUploaded)
        .catch(toastError)
        .finally(() => setUploading(false))
    }
  }

  if (uploading) {
    return (
      <div className={css.root}>
        <div className={css.body}>
          <CircularProgress />
        </div>
      </div>
    )
  } else {
    return (
      <Tooltip title={m.addAttachmentFile}>
        <Button className={css.root} onClick={openFileSelection}>
          <div className={css.body}>
            <Icon className={css.icon}>add</Icon>
          </div>
          <input style={{display: 'none'}} type="file" ref={fileInputEl} onChange={e => handleChange(e.target.files)} />
        </Button>
      </Tooltip>
    )
  }
}
