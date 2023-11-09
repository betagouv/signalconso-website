import {Button} from '@codegouvfr/react-dsfr/Button'
import {Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material'
import {useI18n} from 'i18n/I18n'
import * as React from 'react'
import {ReactElement, ReactNode, useState} from 'react'
import {FrIconClassName, RiIconClassName} from '@codegouvfr/react-dsfr/src/fr/generatedFromCss/classNames'

interface Props {
  title: string
  confirmLabel: string
  content: ReactNode
  children: ReactElement<any>
  onConfirm: (close: () => void) => void
  iconId?: FrIconClassName | RiIconClassName
}

export const ScDialog = ({children, title, content, confirmLabel, onConfirm, iconId}: Props) => {
  const {m} = useI18n()
  const [open, setOpen] = useState<boolean>(false)
  const close = () => setOpen(false)
  const confirm = () => {
    if (onConfirm) onConfirm(close)
  }

  return (
    <>
      {React.cloneElement(children, {
        onClick: (event: any) => {
          if (children.props.onClick) children.props.onClick(event)
          event.stopPropagation()
          event.preventDefault()
          setOpen(true)
        },
      })}
      <Dialog open={open} maxWidth="xs">
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <Button priority="tertiary" onClick={() => setOpen(false)}>
            {m.cancel}
          </Button>

          {iconId ? (
            <Button priority="primary" onClick={confirm} iconId={iconId}>
              {confirmLabel}
            </Button>
          ) : (
            <Button priority="primary" onClick={confirm}>
              {confirmLabel}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}
