import {useI18n} from '@/i18n/I18n'
import imgBill from '@/img/siret-helper/siret-helper-bill.jpg'
import imgCard from '@/img/siret-helper/siret-helper-card.jpg'
import imgFooter from '@/img/siret-helper/siret-helper-footer.png'
import imgMentionsLegales from '@/img/siret-helper/siret-helper-mentions_legales.png'
import imgTicket from '@/img/siret-helper/siret-helper-ticket.jpg'
import {PortalToBody} from '@/utils/PortalToBody'
import Accordion from '@codegouvfr/react-dsfr/Accordion'
import {createModal} from '@codegouvfr/react-dsfr/Modal'
import Image from 'next/image'
import {useId} from 'react'

export function SiretHelpButton() {
  const {m} = useI18n()
  const id = useId()
  const modal = createModal({
    id: `siret-help-modal-${id}`,
    isOpenedByDefault: false,
  })
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
      <button className="text-scbluefrance" type="button" {...modal.buttonProps}>
        ({m.howToFindIt})
      </button>
      <PortalToBody>
        <modal.Component title={m.companyIdentityHelperTitle}>
          <h2 className="fr-h6 "> {m.companyIdentityHelper}</h2>
          <p dangerouslySetInnerHTML={{__html: m.companyIdentityHelperDesc}} />
          <h2 className="fr-h6 "> {m.companyIdentityHelperWhere}</h2>
          <p>{m.companyIdentityHelperWhereDesc}</p>
          <div className="fr-accordions-group">
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
          </div>
        </modal.Component>
      </PortalToBody>
    </>
  )
}
