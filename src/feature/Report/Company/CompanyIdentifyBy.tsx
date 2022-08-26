import React, {ReactNode, useState} from 'react'
import {ScRadioGroup, ScRadioGroupItem} from 'shared/RadioGroup'
import {useI18n} from 'core/i18n'
import {Txt} from '../../../alexlibs/mui-extension'
import {Panel, PanelBody} from 'shared/Panel/Panel'
import {Animate} from 'shared/Animate/Animate'
import {CompanyKinds} from '../../../anomaly/Anomaly'

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
              {companyKind !== CompanyKinds.INFLUENCEUR && (
                <ScRadioGroupItem value={IdentifyBy.NAME} title={m.identifyBy_name} description={m.identifyBy_nameDesc} />
              )}
              <ScRadioGroupItem value={IdentifyBy.IDENTITY} title={m.identifyBy_identity} />
              {companyKind !== CompanyKinds.SIRET && (
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
