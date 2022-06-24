import * as React from 'react'
import {EventHandler, ReactElement, ReactNode, SyntheticEvent, useState} from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, LinearProgress, PaperProps} from '@mui/material'

export interface ConfirmProps extends Omit<DialogProps, 'children' | 'onClick' | 'open'> {
  disabled?: boolean
  title?: string
  confirmLabel?: string
  cancelLabel?: string
  content?: ((content: () => void) => ReactNode) | ReactNode | string
  children: ReactElement<any>
  onConfirm?: (event: SyntheticEvent<any>, close: () => void) => void
  confirmDisabled?: boolean
  onClick?: EventHandler<SyntheticEvent<any>>
  PaperProps?: Partial<PaperProps>
  loading?: boolean
}

const enterKeyCode = 13

export const Confirm = ({
  children,
  title,
  content,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onClick,
  confirmDisabled,
  loading,
  PaperProps,
  ...props
}: ConfirmProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const close = () => setOpen(false)

  const confirm = (event: SyntheticEvent<any>) => {
    if (onConfirm) onConfirm(event, close)
  }

  const handleKeypress = (e: any) => {
    if (e.keyCode === enterKeyCode) {
      confirm(e)
    }
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
        <DialogContent>{typeof content === 'function' ? content(close) : content}</DialogContent>
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
