import {Animate} from '@/components_simple/Animate'
import {useI18n} from '@/i18n/I18n'
import {ReactNode, useState} from 'react'
import {CompanyKinds} from '../../../anomalies/Anomaly'
import {ScRadioButtons} from '../../../components_simple/formInputs/ScRadioButtons'
import {ScAlert} from '@/components_simple/ScAlert'

export enum IdentifyBy {
  NAME_AND_POSTAL_CODE = 'NAME_AND_POSTAL_CODE',
  NAME = 'NAME',
  IDENTITY = 'IDENTITY',
  NONE = 'NONE',
}

interface Props {
  companyKind: CompanyKinds
  children: (identifyBy: IdentifyBy) => ReactNode
}

const isDistance = (companyKind: CompanyKinds) =>
  companyKind === 'WEBSITE' ||
  companyKind === 'MERCHANT_WEBSITE' ||
  companyKind === 'TRANSPORTER_WEBSITE' ||
  companyKind === 'PHONE'

export const CompanyIdentifyBy = ({companyKind, children}: Props) => {
  const {m} = useI18n()
  const [identifyBy, setIdentifyBy] = useState<IdentifyBy | undefined>()

  const createOptions = (companyKind: CompanyKinds) => [
    ...(isDistance(companyKind)
      ? [{label: m.identifyBy_name, description: m.identifyBy_nameDesc, value: IdentifyBy.NAME}]
      : [{label: m.identifyBy_name_postal_code, description: m.identifyBy_nameDesc, value: IdentifyBy.NAME_AND_POSTAL_CODE}]),
    {label: m.identifyBy_identity, description: m.identifyBy_identityDesc, value: IdentifyBy.IDENTITY},
    ...(companyKind !== 'SIRET'
      ? [
          {
            label: m.identifyBy_none,
            description: m.identifyBy_noneDesc,
            value: IdentifyBy.NONE,
          },
        ]
      : []),
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
            options={createOptions(companyKind)}
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
