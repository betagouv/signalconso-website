import React, {ReactNode, useEffect, useRef, useState} from 'react'
import {useI18n} from 'i18n/I18n'
import {Txt} from '../../../components_simple/Txt'
import {Panel, PanelBody} from 'components_simple/Panel'
import {Animate} from 'components_simple/Animate'
import {CompanyKinds} from '../../../anomalies/Anomaly'
import {ScRadioButtons} from '../../../components_simple/formInputs/ScRadioButtons'
import {AutofocusedDiv} from 'components_simple/AutofocusedDiv'

export enum IdentifyBy {
  NAME = 'NAME',
  IDENTITY = 'IDENTITY',
  NONE = 'NONE',
}

interface Props {
  companyKind: CompanyKinds
  children: (identifyBy: IdentifyBy) => ReactNode
}

export const CompanyIdentifyBy = ({companyKind, children}: Props) => {
  const {m} = useI18n()
  const divRef = useRef<HTMLDivElement>(null)
  const [identifyBy, setIdentifyBy] = useState<IdentifyBy | undefined>()

  const createOptions = (companyKind: CompanyKinds) => [
    ...(companyKind !== 'SOCIAL'
      ? [
          {
            label: m.identifyBy_name,
            description: m.identifyBy_nameDesc,
            value: IdentifyBy.NAME,
          },
        ]
      : []),
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

  useEffect(() => {
    divRef.current?.focus()
  })

  return (
    <>
      <Animate>
        <ScRadioButtons
          required
          value={identifyBy}
          onChange={setIdentifyBy}
          options={createOptions(companyKind)}
          title={m.canYouIdentifyCompany}
          titleNoAutoAsterisk
          description={m.canYouIdentifyCompanyDesc}
        />
      </Animate>
      {identifyBy && children(identifyBy)}
    </>
  )
}
