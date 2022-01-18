import {CompanySearchResult, Report} from '@signal-conso/signalconso-api-sdk-js'
import {Txt} from 'mui-extension/lib/Txt/Txt'
import {Icon as MuiIcon, IconProps} from '@mui/material'
import React from 'react'
import {Panel, PanelBody} from '../../../shared/Panel/Panel'
import {useI18n} from '../../../core/i18n'
import {ScRadioGroup, ScRadioGroupItem} from '../../../shared/RadioGroup'
import {AddressComponent} from '../../../shared/Address/Address'

interface Props {
  companies: CompanySearchResult[]
  onChange: (_: CompanySearchResult) => void
}

const Icon = (props: IconProps) => <MuiIcon {...props} sx={{
  display: 'inline !important',
  fontSize: 'inherit',
  lineHeight: 1,
  verticalAlign: 'text-top',
}}/>

export const CompanySearchResultComponent = ({companies, onChange}: Props) => {
  const {m} = useI18n()

  return (
    <Panel title={m.selectCompany}>
      <Txt block color="hint">{m.selectCompanyDesc}</Txt>
      <PanelBody>
        <ScRadioGroup>
          {companies.map(company => {
            const isGovernment = Report.isGovernmentCompany(company)
            return (
              <ScRadioGroupItem key={company.siret} value={company.siret!} onClick={() => onChange(company)}>
                <Txt truncate block bold>
                  {company.name}
                </Txt>
                {company.brand && <Txt block>{company.brand}</Txt>}
                {company.isHeadOffice && (
                  <Txt color="primary" sx={{display: 'flex', alignItems: 'center'}}>
                    <Icon>business</Icon>
                    &nbsp;
                    {m.isHeadOffice}
                  </Txt>
                )}
                {!company.isHeadOffice && company.activityLabel && (
                  <Txt color="hint" sx={{display: 'flex', alignItems: 'center'}}>
                    <Icon>label</Icon>
                    &nbsp;
                    {company.activityLabel}
                  </Txt>
                )}
                {isGovernment && (
                  <Txt color="error" bold sx={{display: 'flex', alignItems: 'center'}}>
                    <Icon>error</Icon>
                    {m.governmentCompany}
                  </Txt>
                )}
                {company.address && (
                  <Txt color="hint" block size="small" sx={{mt: .5}}>
                    <AddressComponent address={company.address}/>
                  </Txt>
                )}
              </ScRadioGroupItem>
            )
          })}
        </ScRadioGroup>
      </PanelBody>
    </Panel>
  )
}
