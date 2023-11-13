import {Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, PaperProps} from '@mui/material'
import {EventHandler, ReactElement, SyntheticEvent, useState} from 'react'
import {useI18n} from '../../../i18n/I18n'
import * as React from 'react'
import Image from 'next/image'
import Button from '@codegouvfr/react-dsfr/Button'

export interface ConfirmProps extends Omit<DialogProps, 'children' | 'onClick' | 'open'> {
  children: ReactElement<any>
  onClick?: EventHandler<SyntheticEvent<any>>
  PaperProps?: Partial<PaperProps>
}

export const CompanySearchByBarcodeHelpDialog = ({children, PaperProps, onClick, ...props}: ConfirmProps) => {
  const {m} = useI18n()
  const [open, setOpen] = useState<boolean>(false)

  const close = () => setOpen(false)

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
        <DialogTitle>
          <span className=" font-bold">{m.barcodeHelp}</span>
        </DialogTitle>
        <DialogContent>
          {m.barcodeHelp2}
          <Image src="/image/barcode.jpg" alt="" width={500} height={315} />
        </DialogContent>
        <DialogActions>
          <Button onClick={close} priority="secondary">
            {m.close}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
