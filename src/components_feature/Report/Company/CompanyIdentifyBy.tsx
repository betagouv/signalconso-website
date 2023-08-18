import React, {ReactNode, useState} from 'react'
import {useI18n} from 'i18n/I18n'
import {Txt} from '../../../alexlibs/mui-extension/Txt/Txt'
import {Panel, PanelBody} from 'components_simple/Panel/Panel'
import {Animate} from 'components_simple/Animate/Animate'
import {CompanyKinds} from '../../../anomalies/Anomaly'
import {ScRadioButtons} from '../../../components_simple/RadioGroup/ScRadioButtons'

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
    {label: m.identifyBy_identity, value: IdentifyBy.IDENTITY},
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
        <Panel title={m.canYouIdentifyCompany} id="CompanyIdentifyBy">
          <Txt block sx={{mb: 2}} color="hint">
            {m.canYouIdentifyCompanyDesc}
          </Txt>
          <PanelBody>
            <ScRadioButtons value={identifyBy} onChange={setIdentifyBy} options={createOptions(companyKind)} />
          </PanelBody>
        </Panel>
      </Animate>
      {identifyBy && children(identifyBy)}
    </>
  )
}
