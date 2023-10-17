import Accordion from '@codegouvfr/react-dsfr/Accordion'
import Button from '@codegouvfr/react-dsfr/Button'
import {Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, PaperProps} from '@mui/material'
import {useI18n} from 'i18n/I18n'
import * as React from 'react'
import {EventHandler, ReactElement, SyntheticEvent, useState} from 'react'

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
              <img
                src="/image/siret-helper/siret-helper-footer.png"
                alt={m.companyIdentityHelperImages.footer}
                style={{width: '100%', marginTop: 4, marginBottom: 4}}
              />
              {m.companyIdentityHelperWhereDesc2}
              <img
                src="/image/siret-helper/siret-helper-mentions_legales.png"
                alt={m.companyIdentityHelperImages.mentionsLegales}
                style={{width: '100%', marginTop: 4, marginBottom: 4}}
              />
            </Accordion>
            <Accordion label={m.companyIdentityHelperInvoice}>
              <img
                src="/image/siret-helper/siret-helper-bill.jpg"
                alt={m.companyIdentityHelperImages.bill}
                style={{width: '100%'}}
              />
            </Accordion>
            <Accordion label={m.companyIdentityHelperReceipt}>
              <img
                src="/image/siret-helper/siret-helper-ticket.jpg"
                alt={m.companyIdentityHelperImages.ticket}
                style={{maxWidth: '300px', margin: 'auto', display: 'block'}}
              />
            </Accordion>
            <Accordion label={m.companyIdentityHelperCreditCardReceipt}>
              <img
                src="/image/siret-helper/siret-helper-card.jpg"
                alt={m.companyIdentityHelperImages.card}
                style={{maxWidth: '300px', margin: 'auto', display: 'block'}}
              />
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
