import * as React from 'react'
import {EventHandler, ReactElement, SyntheticEvent, useState} from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, PaperProps} from '@mui/material'
import {useI18n} from 'core/i18n'
import {Txt} from '../../../alexlibs/mui-extension'
import {AccordionPanel, AccordionPanels} from 'shared/AccordionPanel/AccordionPanel'

export interface ConfirmProps extends Omit<DialogProps, 'children' | 'onClick' | 'open'> {
  children: ReactElement<any>
  onClick?: EventHandler<SyntheticEvent<any>>
  PaperProps?: Partial<PaperProps>
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
        <DialogTitle>Aide SIRET/SIREN</DialogTitle>
        <DialogContent>
          <Txt size="big" bold block sx={{mb: 1}}>
            A quoi correspondent ces identifiants ?
          </Txt>
          SIRET, SIREN et RCS sont des identifiants de l'entreprise.
          <br />
          Le SIRET est composé de 14 chiffres, le SIREN est composé de 9 chiffres.
          <br />
          Le RCS est composé de:
          <br />
          <ul>
            <li>la mention "RCS"</li>
            <li>le nom de la ville d'immatriculation</li>
            <li>une lettre (A ou B)</li>
            <li>le numéro SIREN</li>
          </ul>
          <Txt size="big" bold block sx={{mb: 1}}>
            Où trouver ces identifiants ?
          </Txt>
          Vous pouvez retrouver ce numéro sur un devis, une facture ou un ticket de caisse émis par l’entreprise et également dans
          les mentions légales de son site internet.
          <br />
          <AccordionPanels sx={{mt: 1}}>
            <AccordionPanel title="Sur un site internet">
              Descendez en bas de la page internet d’accueil du site en question :
              <img
                src="/image/siret-helper/siret-helper-footer.png"
                alt="Sur un site internet 1 sur 2"
                style={{width: '100%', marginTop: 4, marginBottom: 4}}
              />
              Cliquez sur le texte « Mentions légales », une nouvelle page va s’ouvrir sur laquelle vous trouverez facilement ce
              numéro :
              <img
                src="/image/siret-helper/siret-helper-mentions_legales.png"
                alt="Sur un site internet 2 sur 2"
                style={{width: '100%', marginTop: 4, marginBottom: 4}}
              />
            </AccordionPanel>
            <AccordionPanel title="Sur une facture">
              <img src="/image/siret-helper/siret-helper-bill.jpg" alt="Sur une facture" style={{width: '100%'}} />
            </AccordionPanel>
            <AccordionPanel title="Sur un ticket de caisse">
              <img
                src="/image/siret-helper/siret-helper-ticket.jpg"
                alt="Sur un ticket de caisse"
                style={{maxWidth: '300px', margin: 'auto', display: 'block'}}
              />
            </AccordionPanel>
            <AccordionPanel title="Sur un ticket de carte bleue">
              <img
                src="/image/siret-helper/siret-helper-card.jpg"
                alt="Sur un ticket de carte bleue"
                style={{maxWidth: '300px', margin: 'auto', display: 'block'}}
              />
            </AccordionPanel>
          </AccordionPanels>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={close}>
            {m.close ?? 'Cancel'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
