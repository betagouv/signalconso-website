import {Animate} from '@/components_simple/Animate'
import {ScAlert} from '@/components_simple/ScAlert'
import {useI18n} from '@/i18n/I18n'
import {ReactNode, useState} from 'react'
import {CompanyKind} from 'shared/anomalies/Anomaly'
import {ScRadioButtons} from '../../../components_simple/formInputs/ScRadioButtons'

const identificationMethods = ['byNameAndGeoArea', 'byName', 'byIdentifier', 'iCannot'] as const
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
  children,
}: {
  companyKind: CompanyKind
  children: (method: IdentificationMethod) => ReactNode
}) {
  const {m} = useI18n()
  const [method, setMethod] = useState<IdentificationMethod | undefined>()

  const optionName = {
    label: m.identifyBy_name,
    value: 'byName' as const,
  }
  const optionNameAndGeoArea = {
    label: m.identifyBy_name_geoarea,
    value: 'byNameAndGeoArea' as const,
  }
  const optionIdentity = {
    label: m.identifyBy_identity,
    description: m.identifyBy_identityDesc,
    value: 'byIdentifier' as const,
  }
  const optionNone = {
    label: m.identifyBy_none,
    description: m.identifyBy_noneDesc,
    value: 'iCannot' as const,
  }
  const options = [
    ...(isRemote(companyKind) ? [optionName] : [optionNameAndGeoArea]),
    optionIdentity,
    ...(companyKind !== 'SIRET' ? [optionNone] : []),
  ]

  return (
    <>
      <Animate>
        <div id="CompanyIdentifyBy">
          <ScAlert type="info">
            Pour vous aider à identifier l'entreprise, rendez-vous sur
            <a href="https://annuaire-entreprises.data.gouv.fr/" target="_blank" rel="noopener noreferrer">
              {' '}
              l'annuaire des entreprises
            </a>
            .
          </ScAlert>
          <ScRadioButtons
            required
            value={method}
            onChange={setMethod}
            options={options}
            title={m.canYouIdentifyCompany}
            titleNoAutoAsterisk
            description={m.canYouIdentifyCompanyDesc}
          />
        </div>
      </Animate>
      {method && children(method)}
    </>
  )
}
