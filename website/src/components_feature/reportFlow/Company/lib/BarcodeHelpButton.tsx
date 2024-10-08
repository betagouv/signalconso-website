import imgBarcode from '@/img/barcode-helper/barcode.jpg'
import {createModal} from '@codegouvfr/react-dsfr/Modal'
import Image from 'next/image'
import {useI18n} from '../../../../i18n/I18n'
import {PortalToBody} from '@/utils/PortalToBody'

const modal = createModal({
  id: 'barcode-help-modal',
  isOpenedByDefault: false,
})

export function BarcodeHelpButton() {
  const {m} = useI18n()
  return (
    <>
      <button className="text-scbluefrance" type="button" {...modal.buttonProps}>
        ({m.howToFindIt})
      </button>
      <PortalToBody>
        <modal.Component title={m.barcodeHelp}>
          <p className="mb-2">{m.barcodeHelp2}</p>
          <Image src={imgBarcode} alt="" className="max-w-[300px] w-full h-auto block mx-auto" sizes="300px" />
        </modal.Component>
      </PortalToBody>
    </>
  )
}
