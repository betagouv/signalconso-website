import {CompanySearchResult, Report} from '@signal-conso/signalconso-api-sdk-js'
import {Txt} from 'mui-extension/lib/Txt/Txt'
import {Box, BoxProps, Icon} from '@mui/material'
import React, {ReactNode, useEffect, useState} from 'react'
import {Panel, PanelActions, PanelBody} from '../../../shared/Panel/Panel'
import {useI18n} from '../../../core/i18n'
import {ScRadioGroup, ScRadioGroupItem} from '../../../shared/RadioGroup'
import {Fender} from 'mui-extension'
import {styleUtils} from '../../../core/theme/theme'
import {AddressComponent} from '../../../shared/Address/Address'
import {Animate} from '../../../shared/Animate/Animate'
import {ScButton} from '../../../shared/Button/Button'
import {Controller, useForm} from 'react-hook-form'

interface Props extends Omit<BoxProps, 'onChange'> {
  companies: CompanySearchResult[]
  children: (selected: CompanySearchResult) => ReactNode
}

interface RowProps extends BoxProps {
  icon?: string
}

export const Row = ({icon, children, sx, ...props}: RowProps) => {
  return (
    <Box {...props} sx={{
      color: t => t.palette.text.secondary,
      mb: .25,
      fontSize: t => styleUtils(t).fontSize.normal,
      display: 'flex',
      alignItems: 'flex-start',
      ...sx
    }}>
      <Icon sx={{
        mr: .5,
        mt: '3px',
        fontSize: t => styleUtils(t).fontSize.big,
        lineHeight: 1,
        minWidth: 20,
      }}>
        {icon}
      </Icon>
      <div>
        {children}
      </div>
    </Box>
  )
}

interface Form {
  result: string
}

export const CompanySearchResultComponent = ({companies, children}: Props) => {
  const {m} = useI18n()
  const [selected, setSelected] = useState<CompanySearchResult | undefined>()
  useEffect(() => {
    setSelected(undefined)
  }, [companies])
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<Form>()
  return (
    <>
      <Animate>
        {companies.length === 0 ? (
          <Panel id="CompanySearchResult">
            <Fender type="empty" icon="sentiment_very_dissatisfied">
              <Txt color="hint" size="big">{m.noMatchingCompany}</Txt>
            </Fender>
          </Panel>
        ) : (
          <Panel title={m.selectCompany} id="CompanySearchResult">
            <form onSubmit={handleSubmit(form => setSelected(companies.find(_ => _.siret === form.result)))}>
              <Txt block color="hint">{m.selectCompanyDesc}</Txt>
              <PanelBody>
                <Controller
                  control={control}
                  rules={{
                    required: {value: true, message: m.required + ' *'},
                  }}
                  name="result"
                  render={({field}) => (
                    <ScRadioGroup {...field} error={!!errors.result}>
                      {companies.map(company => {
                        const isGovernment = Report.isGovernmentCompany(company)
                        return (
                          <ScRadioGroupItem key={company.siret} value={company.siret!}>
                            <Txt truncate block bold>
                              {company.name}
                            </Txt>
                            {company.brand && <Txt block>{company.brand}</Txt>}
                            {company.isHeadOffice && (
                              <Row icon="business" sx={{color: t => t.palette.primary.main}}>{m.isHeadOffice}</Row>
                            )}
                            {company.activityLabel && (
                              <Row icon="label">{company.activityLabel}</Row>
                            )}
                            {isGovernment && (
                              <Row icon="error" sx={{color: t => t.palette.error.main}}>{m.governmentCompany}</Row>
                            )}
                            {company.address && (
                              <Row icon="location_on">
                                <AddressComponent address={company.address}/>
                              </Row>
                            )}
                          </ScRadioGroupItem>
                        )
                      })}
                    </ScRadioGroup>
                  )}/>
              </PanelBody>
              <PanelActions>
                <ScButton color="primary" variant="contained" icon="search" type="submit">
                  {m.continue}
                </ScButton>
              </PanelActions>
            </form>
          </Panel>
        )}
      </Animate>
      {selected && children(selected)}
    </>
  )
}
