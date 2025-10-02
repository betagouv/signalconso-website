'use client'
import {useI18n} from '@/i18n/I18n'
import customerArea from '@/img/client-reference-helper/espace-client.png'
import invoice from '@/img/client-reference-helper/invoice.png'
import reservation from '@/img/client-reference-helper/reservation.png'
import {PortalToBody} from '@/utils/PortalToBody'
import Accordion from '@codegouvfr/react-dsfr/Accordion'
import {createModal} from '@codegouvfr/react-dsfr/Modal'
import Image from 'next/image'
import {useId, useMemo} from 'react'

export function ClientReferenceHelpButton() {
  const {m} = useI18n()
  const id = useId()
  const modal = useMemo(
    () =>
      createModal({
        id: `client-reference-help-modal-${id}`,
        isOpenedByDefault: false,
      }),
    [id]
  )
  const imagePropsFullWidth = {
    sizes: '1200px', // Increased from 1060px
    className: 'w-full h-auto my-2 shadow-lg shadow-gray-300',
  }

  const imagePropsSmaller = {
    sizes: '1000px', // Increased from 600px
    // Adjusted max-width or removed constraint, ensure your CSS supports this
    className: 'w-full h-auto my-2 block mx-auto shadow-lg shadow-gray-300',
  }
  return (
    <>
      <button className="text-scbluefrance" type="button" {...modal.buttonProps}>
        ({m.howToFindIt})
      </button>
      <PortalToBody>
        <modal.Component size={'large'} title={m.clientReferenceHelperTitle}>
          <h2 className="fr-h6 "> {m.clientReferenceHelper}</h2>
          <p dangerouslySetInnerHTML={{__html: m.clientReferenceHelperDesc}} />
          <h2 className="fr-h6 "> {m.clientReferenceHelperWhere}</h2>
          <p>{m.clientReferenceHelperWhereDesc}</p>
          <div className="fr-accordions-group">
            <Accordion label={m.companyIdentityHelperWebsite}>
              {m.clientReferenceHelperWhereDesc0}
              <Image src={customerArea} alt={m.clientReferenceHelperImages.website} {...imagePropsSmaller} />
            </Accordion>
            <Accordion label={m.clientReferenceHelperInvoice}>
              <Image src={invoice} alt={m.clientReferenceHelperImages.invoice} {...imagePropsFullWidth} />
            </Accordion>
            <Accordion label={m.clientReferenceHelperReservation}>
              <Image src={reservation} alt={m.clientReferenceHelperImages.reservation} {...imagePropsSmaller} />
            </Accordion>
          </div>
        </modal.Component>
      </PortalToBody>
    </>
  )
}
