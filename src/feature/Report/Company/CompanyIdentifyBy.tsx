import React from 'react'
import {ScRadioGroup, ScRadioGroupItem} from '../../../shared/RadioGroup'
import {useI18n} from '../../../core/i18n'
import {BoxProps} from '@mui/material'
import {Txt} from 'mui-extension'
import {Panel, PanelBody} from '../../../shared/Panel/Panel'

export enum IdentifyBy {
  NAME = 'NAME',
  IDENTITY = 'IDENTITY',
  NONE = 'NONE',
}

interface Props extends Omit<BoxProps, 'onChange'> {
  onChange: (identifyBy: IdentifyBy) => void
}

export const CompanyIdentifyBy = ({onChange, ...props}: Props) => {
  const {m} = useI18n()
  return (
    <Panel title={m.canYouIdentifyCompany}>
      <Txt block sx={{mb: 2}} color="hint">{m.canYouIdentifyCompanyDesc}</Txt>
      <PanelBody>
        <ScRadioGroup {...props} onChange={onChange}>
          <ScRadioGroupItem value={IdentifyBy.NAME} title={m.identifyBy_name}/>
          <ScRadioGroupItem value={IdentifyBy.IDENTITY} title={m.identifyBy_identity}/>
          <ScRadioGroupItem value={IdentifyBy.NONE} title={m.identifyBy_none}/>
        </ScRadioGroup>
      </PanelBody>
    </Panel>
  )
}
