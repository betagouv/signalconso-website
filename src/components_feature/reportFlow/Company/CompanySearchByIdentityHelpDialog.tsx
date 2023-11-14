import Accordion from '@codegouvfr/react-dsfr/Accordion'
import Button from '@codegouvfr/react-dsfr/Button'
import {Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, PaperProps} from '@mui/material'
import {useI18n} from '@/i18n/I18n'
import * as React from 'react'
import {EventHandler, ReactElement, SyntheticEvent, useState} from 'react'
import imgBill from '@/img/siret-helper/siret-helper-bill.jpg'
import imgCard from '@/img/siret-helper/siret-helper-card.jpg'
import imgFooter from '@/img/siret-helper/siret-helper-footer.png'
import imgMentionsLegales from '@/img/siret-helper/siret-helper-mentions_legales.png'
import imgTicket from '@/img/siret-helper/siret-helper-ticket.jpg'
import Image from 'next/image'

export interface ConfirmProps extends Omit<DialogProps, 'children' | 'onClick' | 'open'> {
  children: ReactElement<any>
  onClick?: EventHandler<SyntheticEvent<any>>
  PaperProps?: Partial<PaperProps>
}

function Accordions({children}: {children: React.ReactNode}) {
  return <div className="fr-accordions-group">{children}</div>
}

export const CompanySearchByIdentityHelpDialog = ({children, PaperProps, onClick, ...props}: ConfirmProps) => {
  const {m} = useI18n()
  const [open, setOpen] = useState<boolean>(false)

  const close = () => setOpen(false)

  const imagePropsFullWidth = {
    sizes: '530px',
    className: 'w-full h-auto my-2 shadow-lg shadow-gray-300',
  }

  const imagePropsSmaller = {
    sizes: '300px',
    className: 'max-w-[300px] w-full h-auto my-2 block mx-auto shadow-lg shadow-gray-300',
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
        <DialogTitle>
          <span className=" font-bold">{m.companyIdentityHelperTitle}</span>
        </DialogTitle>
        <DialogContent>
          <h3 className="mb-2"> {m.companyIdentityHelper}</h3>
          <p dangerouslySetInnerHTML={{__html: m.companyIdentityHelperDesc}} />
          <h3 className="mb-2"> {m.companyIdentityHelperWhere}</h3>
          <p>{m.companyIdentityHelperWhereDesc}</p>
          <Accordions>
            <Accordion label={m.companyIdentityHelperWebsite}>
              {m.companyIdentityHelperWhereDesc0}
              <Image src={imgFooter} alt={m.companyIdentityHelperImages.footer} {...imagePropsFullWidth} />
              {m.companyIdentityHelperWhereDesc2}
              <Image src={imgMentionsLegales} alt={m.companyIdentityHelperImages.mentionsLegales} {...imagePropsFullWidth} />
            </Accordion>
            <Accordion label={m.companyIdentityHelperInvoice}>
              <Image src={imgBill} alt={m.companyIdentityHelperImages.bill} {...imagePropsFullWidth} />
            </Accordion>
            <Accordion label={m.companyIdentityHelperReceipt}>
              <Image src={imgTicket} alt={m.companyIdentityHelperImages.ticket} {...imagePropsSmaller} />
            </Accordion>
            <Accordion label={m.companyIdentityHelperCreditCardReceipt}>
              <Image src={imgCard} alt={m.companyIdentityHelperImages.card} {...imagePropsSmaller} />
            </Accordion>
          </Accordions>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} priority="secondary">
            {m.close ?? 'Cancel'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
