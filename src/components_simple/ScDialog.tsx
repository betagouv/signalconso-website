import {Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle} from '@mui/material'
import {useI18n} from 'i18n/I18n'
import * as React from 'react'
import {EventHandler, ReactElement, ReactNode, SyntheticEvent, useState} from 'react'

interface Props extends Omit<DialogProps, 'children' | 'onClick' | 'open' | 'content'> {
  title: string
  confirmLabel: string
  content: ReactNode
  children: ReactElement<any>
  onConfirm: (event: SyntheticEvent<any>, close: () => void) => void
  onClick?: EventHandler<SyntheticEvent<any>>
}

export const ScDialog = ({children, title, content, confirmLabel, onConfirm, onClick, ...props}: Props) => {
  const {m} = useI18n()
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
      <Dialog open={open} {...props}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => setOpen(false)}>
            {m.close}
          </Button>
          <Button color="primary" onClick={confirm}>
            {confirmLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
