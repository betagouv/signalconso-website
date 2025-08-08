import {AccordionInline} from '@/components_simple/AccordionInline'
import {Animate} from '@/components_simple/Animate'
import {useI18n} from '@/i18n/I18n'
import {ReactNode, useState} from 'react'
import {CompanyKind} from 'shared/anomalies/Anomaly'
import {ScRadioButtons, ScRadioButtonsProps} from '../../../components_simple/formInputs/ScRadioButtons'

const identificationMethods = ['byNameAndGeoArea', 'byName', 'byIdentifier', 'iCannot', 'itIsForeign'] as const
export type IdentificationMethod = (typeof identificationMethods)[number]

function isRemote(companyKind: CompanyKind) {
  return (
    companyKind === 'WEBSITE' ||
    companyKind === 'MERCHANT_WEBSITE' ||
    companyKind === 'TRANSPORTER_WEBSITE' ||
    companyKind === 'PHONE'
  )
}
export function CompanyChooseIdentificationMethod({
  companyKind,
  customizedCompanyIdentificationTitle,
  children,
}: {
  companyKind: CompanyKind
  customizedCompanyIdentificationTitle?: string
  children: (method: IdentificationMethod) => ReactNode
}) {
  const {m} = useI18n()
  const [method, setMethod] = useState<IdentificationMethod | undefined>()

  const optionByName = {
    label: m.identifyBy_name,
    value: 'byName' as const,
  }
  const optionByNameAndGeoArea = {
    label: m.identifyBy_name_geoarea,
    value: 'byNameAndGeoArea' as const,
  }
  const optionByIdentifier = {
    label: m.identifyBy_identity,
    description: m.identifyBy_identityDesc,
    value: 'byIdentifier' as const,
  }
  const optionICannot = {
    label: m.identifyBy_none,
    value: 'iCannot' as const,
  }
  const optionItIsForeign = {
    label: m.identifyBy_itIsForeign,
    description: (
      <AccordionInline label={m.companyHowToFindCountry}>
        <p className="mb-0 text-sm text-gray-600 pt-2 px-1" dangerouslySetInnerHTML={{__html: m.howToFindCompanyCountryDesc}} />
      </AccordionInline>
    ),
    value: 'itIsForeign' as const,
  }
  const options: ScRadioButtonsProps<IdentificationMethod>['options'] = [
    ...(isRemote(companyKind) ? [optionByName] : [optionByNameAndGeoArea]),
    optionByIdentifier,
    ...(companyKind !== 'SIRET' ? [optionICannot, optionItIsForeign] : []),
  ]

  return (
    <>
      <Animate>
        <div id="CompanyIdentifyBy">
          <ScRadioButtons
            required
            value={method}
            onChange={setMethod}
            options={options}
            title={customizedCompanyIdentificationTitle ?? m.canYouIdentifyCompany}
            description={<span dangerouslySetInnerHTML={{__html: m.canYouIdentifyCompanyDesc}} />}
          />
        </div>
      </Animate>
      {method && children(method)}
    </>
  )
}
