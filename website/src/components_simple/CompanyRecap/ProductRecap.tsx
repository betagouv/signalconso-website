import {useI18n} from '@/i18n/I18n'
import {BarcodeProduct} from '@/model/BarcodeProduct'

export function ProductRecap({product}: {product: BarcodeProduct}) {
  const {m} = useI18n()
  return (
    <>
      <p className="mb-0 font-bold">{product.productName ?? m.barcodeNoDescriptionFound}</p>
      <p className="text-gray-600 mb-12 text-sm">
        {m.barcodeLabel} {product.gtin}
      </p>
    </>
  )
}
