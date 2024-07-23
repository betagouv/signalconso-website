import {ScAlert} from '@/components_simple/ScAlert'
import {useI18n} from '@/i18n/I18n'
import {Address} from '@/model/Address'
import {BarcodeProduct} from '@/model/BarcodeProduct'
import {ChildrenProps} from '@/utils/utils'
import {AddressComponent} from '../Address'
import {ProductRecap} from './ProductRecap'

// Use name + commercialName if present
// Does not use brand
export function buildCompanyName(_: {name?: string; commercialName?: string}) {
  const name = _.name
  const commercialName = _.commercialName
  return commercialName ? `${commercialName} (${name})` : name
}

export type CompanyRecapProps = {
  name: string | undefined
  commercialName: string | undefined
  closed: boolean | undefined
  siret: string | undefined
  address: Address | undefined
  isHeadOffice: boolean | undefined
  isGovernment: boolean | undefined
  website: string | undefined
  phone: string | undefined
  activityLabel: string | undefined
  brand: string | undefined
  specialLegislation: 'SHRINKFLATION' | undefined | undefined
  barcodeProduct: BarcodeProduct | undefined
}

export function CompanyRecapRaw({
  name,
  commercialName,
  closed = false,
  siret,
  address,
  isHeadOffice = false,
  isGovernment = false,
  website,
  phone,
  activityLabel,
  brand,
  specialLegislation,
  barcodeProduct,
}: CompanyRecapProps) {
  return (
    <>
      <div className="flex justify-between w-full">
        <div>
          <RowName {...{name, commercialName}} />
          <RowBrand {...{brand}} />
          <RowIsHeadOffice {...{isHeadOffice}} />
          <RowActivityLabel {...{activityLabel}} />
          <RowIsGovernment {...{isGovernment: isGovernment}} />
          <RowSiret {...{siret}} />
          <RowAddress {...{address}} />
          <RowWebsite {...{website}} />
          <RowPhone {...{phone}} />
          <RowSpecialLegislation {...{specialLegislation}} />
        </div>
        <RowClosed {...{closed}} />
      </div>
      {barcodeProduct && (
        <>
          <p className="mt-4 !mb-2">À propos du produit :</p>
          <ProductRecap product={barcodeProduct} />
        </>
      )}
    </>
  )
}

function RowName({name, commercialName}: {name: string | undefined; commercialName: string | undefined}) {
  const finalName = buildCompanyName({name, commercialName})
  return finalName ? <span className="font-bold block">{finalName}</span> : null
}
function RowBrand({brand}: {brand: string | undefined}) {
  const {m} = useI18n()
  return brand ? <span className="block">{brand}</span> : null
}
function RowIsHeadOffice({isHeadOffice}: {isHeadOffice: boolean}) {
  const {m} = useI18n()
  return isHeadOffice ? (
    <Row icon="ri-building-fill" variant="blue">
      {m.isHeadOffice}
    </Row>
  ) : null
}
function RowActivityLabel({activityLabel}: {activityLabel: string | undefined}) {
  return activityLabel ? <Row icon="ri-price-tag-3-fill">{activityLabel}</Row> : null
}
function RowIsGovernment({isGovernment}: {isGovernment: boolean}) {
  const {m} = useI18n()
  return isGovernment ? (
    <Row icon="ri-error-warning-fill" variant="error">
      {m.governmentCompany}
    </Row>
  ) : null
}
function RowSiret({siret}: {siret: string | undefined}) {
  const {m} = useI18n()
  return siret ? (
    <Row icon="ri-profile-fill">
      {m.siretNumber} <span className="">{siret}</span>
    </Row>
  ) : null
}
function RowAddress({address}: {address: Address | undefined}) {
  return address ? (
    <Row icon="ri-map-pin-2-fill">
      <AddressComponent {...{address}} />
    </Row>
  ) : null
}
function RowWebsite({website}: {website: string | undefined}) {
  return website ? <Row icon="ri-global-line">{website}</Row> : null
}
function RowPhone({phone}: {phone: string | undefined}) {
  return phone ? <Row icon="ri-phone-line">{phone}</Row> : null
}
function RowSpecialLegislation({specialLegislation}: {specialLegislation: 'SHRINKFLATION' | undefined}) {
  const {m} = useI18n()
  return specialLegislation ? (
    <ScAlert type="warning" dangerouslySetInnerHTML={{__html: m.specialLegislation[specialLegislation]}} />
  ) : null
}
function RowClosed({closed}: {closed: boolean}) {
  const {m} = useI18n()
  return closed ? <span className="text-red-600">{m.closedCompany}</span> : null
}
function Row({icon, children, variant}: {icon: string; variant?: 'blue' | 'error'} & ChildrenProps) {
  const color = variant === 'blue' ? 'text-scbluefrance' : variant === 'error' ? 'text-red-500' : 'text-gray-500'
  return (
    <div className={`flex items-start mb-1 text-sm ${color} `}>
      <i className={`${icon} mr-2 fr-icon--sm`} />
      <div>{children}</div>
    </div>
  )
}
