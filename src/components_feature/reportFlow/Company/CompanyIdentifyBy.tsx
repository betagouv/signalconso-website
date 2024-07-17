import {Animate} from '@/components_simple/Animate'
import {ScAlert} from '@/components_simple/ScAlert'
import {useI18n} from '@/i18n/I18n'
import {ReactNode, useState} from 'react'
import {CompanyKind} from '../../../anomalies/Anomaly'
import {ScRadioButtons} from '../../../components_simple/formInputs/ScRadioButtons'

export enum IdentifyBy {
  NAME_AND_POSTAL_CODE = 'NAME_AND_POSTAL_CODE',
  NAME = 'NAME',
  IDENTITY = 'IDENTITY',
  NONE = 'NONE',
}

interface Props {
  companyKind: CompanyKind
  children: (identifyBy: IdentifyBy) => ReactNode
}

function isRemote(companyKind: CompanyKind) {
  return (
    companyKind === 'WEBSITE' ||
    companyKind === 'MERCHANT_WEBSITE' ||
    companyKind === 'TRANSPORTER_WEBSITE' ||
    companyKind === 'PHONE'
  )
}
export const CompanyIdentifyBy = ({companyKind, children}: Props) => {
  const {m} = useI18n()
  const [identifyBy, setIdentifyBy] = useState<IdentifyBy | undefined>()

  const optionName = {
    label: m.identifyBy_name,
    description: m.identifyBy_nameDesc,
    value: IdentifyBy.NAME,
  }
  const optionNameAndCp = {
    label: m.identifyBy_name_postal_code,
    description: m.identifyBy_nameDesc,
    value: IdentifyBy.NAME_AND_POSTAL_CODE,
  }
  const optionIdentity = {
    label: m.identifyBy_identity,
    description: m.identifyBy_identityDesc,
    value: IdentifyBy.IDENTITY,
  }
  const optionNone = {
    label: m.identifyBy_none,
    description: m.identifyBy_noneDesc,
    value: IdentifyBy.NONE,
  }
  const options = [
    ...(isRemote(companyKind) ? [optionName] : [optionNameAndCp]),
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
            value={identifyBy}
            onChange={setIdentifyBy}
            options={options}
            title={m.canYouIdentifyCompany}
            titleNoAutoAsterisk
            description={m.canYouIdentifyCompanyDesc}
          />
        </div>
      </Animate>
      {identifyBy && children(identifyBy)}
    </>
  )
}
