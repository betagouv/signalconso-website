import React, {ReactNode, useState} from 'react'
import {ScRadioGroupItem} from 'components_simple/RadioGroup/RadioGroupItem'
import {ScRadioGroup} from 'components_simple/RadioGroup/RadioGroup'
import {useI18n} from 'i18n/I18n'
import {Txt} from '../../../alexlibs/mui-extension/Txt/Txt'
import {Panel, PanelBody} from 'components_simple/Panel/Panel'
import {Animate} from 'components_simple/Animate/Animate'
import {CompanyKinds} from '../../../anomalies/Anomaly'

export enum IdentifyBy {
  NAME = 'NAME',
  IDENTITY = 'IDENTITY',
  NONE = 'NONE',
}

interface Props {
  companyKind: CompanyKinds
  children: (identifyBy: IdentifyBy) => ReactNode
  value?: IdentifyBy
}

export const CompanyIdentifyBy = ({companyKind, value, children}: Props) => {
  const {m} = useI18n()
  const [identifyBy, setIdentifyBy] = useState<IdentifyBy | undefined>()
  return (
    <>
      <Animate>
        <Panel title={m.canYouIdentifyCompany} id="CompanyIdentifyBy">
          <Txt block sx={{mb: 2}} color="hint">
            {m.canYouIdentifyCompanyDesc}
          </Txt>
          <PanelBody>
            <ScRadioGroup value={value} onChange={setIdentifyBy}>
              {companyKind !== 'SOCIAL' && (
                <ScRadioGroupItem value={IdentifyBy.NAME} title={m.identifyBy_name} description={m.identifyBy_nameDesc} />
              )}
              <ScRadioGroupItem value={IdentifyBy.IDENTITY} title={m.identifyBy_identity} />
              {companyKind !== 'SIRET' && (
                <ScRadioGroupItem value={IdentifyBy.NONE} title={m.identifyBy_none} description={m.identifyBy_noneDesc} />
              )}
            </ScRadioGroup>
          </PanelBody>
        </Panel>
      </Animate>
      {identifyBy && children(identifyBy)}
    </>
  )
}
