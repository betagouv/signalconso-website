import * as React from 'react'
import {EventHandler, ReactElement, ReactNode, SyntheticEvent, useState} from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, LinearProgress, PaperProps} from '@mui/material'
import {useI18n} from 'i18n/I18n'

interface Props extends Omit<DialogProps, 'children' | 'onClick' | 'open' | 'content'> {
  disabled?: boolean
  title?: string
  confirmLabel?: string
  content?: ReactNode
  children: ReactElement<any>
  onConfirm?: (event: SyntheticEvent<any>, close: () => void) => void
  confirmDisabled?: boolean
  onClick?: EventHandler<SyntheticEvent<any>>
  PaperProps?: Partial<PaperProps>
  loading?: boolean
}

export const ScDialog = ({
  children,
  title,
  content,
  confirmLabel,
  onConfirm,
  onClick,
  confirmDisabled,
  loading,
  PaperProps,
  ...props
}: Props) => {
  const {m} = useI18n()
  const cancelLabel = m.close
  const [open, setOpen] = useState<boolean>(false)

  const close = () => setOpen(false)

  const confirm = (event: SyntheticEvent<any>) => {
    if (onConfirm) onConfirm(event, close)
  }

  return (
    <>
      {React.cloneElement(children, {
        onClick: (event: any) => {
          if (children.props.onClick) children.props.onClick(event)
          if (onClick) onClick(event)
          setOpen(true)
        },
      })}
      <Dialog open={open} {...props} PaperProps={PaperProps}>
        {loading && (
          <LinearProgress
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
            }}
          />
        )}
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => setOpen(false)}>
            {cancelLabel || 'Cancel'}
          </Button>
          {onConfirm && (
            <Button color="primary" onClick={confirm} disabled={confirmDisabled}>
              {confirmLabel || 'Confirm'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}
