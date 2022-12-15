import {ScInput} from 'components_simple/Input/ScInput'
import {IconBtn, Txt} from '../../../alexlibs/mui-extension'
import React, {ReactNode, useEffect, useState} from 'react'
import {useI18n} from 'i18n'
import {useApiClients} from 'context/ApiClientsContext'
import {ScButton} from 'components_simple/Button/Button'
import {useForm} from 'react-hook-form'
import {useFetcher} from '../../../hooks/useFetcher'
import {useToast} from 'hooks/useToast'
import {Box, BoxProps, Icon, Tooltip} from '@mui/material'
import {Panel, PanelBody} from 'components_simple/Panel/Panel'
import {Animate} from 'components_simple/Animate/Animate'
import {useAnalyticContext} from 'analytic/AnalyticContext'
import {CompanySearchEventActions, EventCategories} from 'analytic/analytic'
import {CompanySearchResult} from '../../../model/Company'
import {Country} from '../../../model/Country'

interface Form {
  website: string
}

interface Props extends Omit<BoxProps, 'onSubmit' | 'children'> {
  value?: string
  children: (websiteUrl?: string, result?: CompanySearchResult[], countries?: Country[]) => ReactNode
}

export const CompanyByWebsite = ({value, children, ...props}: Props) => {
  const {m} = useI18n()
  const {signalConsoApiClient} = useApiClients()
  const _searchCompany = useFetcher(signalConsoApiClient.searchCompaniesByUrl)
  const _searchCountry = useFetcher(signalConsoApiClient.searchForeignCompaniesByUrl)
  const _analytic = useAnalyticContext()
  const {toastError} = useToast()
  const {
    getValues,
    setValue,
    handleSubmit,
    register,
    reset,
    formState: {errors},
  } = useForm<Form>()

  const [companies, setCompanies] = useState<CompanySearchResult[] | undefined>(undefined)

  useEffect(() => {
    if (_searchCompany.error) toastError(_searchCompany.error)
  }, [_searchCompany.error])

  const submit = async (form: Form) => {
    _searchCompany.clearCache()
    _searchCountry.clearCache()
    const res = await _searchCompany.fetch({clean: true, force: true}, form.website)
    if (res.exactMatch.length != 0) {
      setCompanies(res.exactMatch)
    }
    if (res.exactMatch.length === 0 && res.similarHosts.length === 0) {
      setCompanies([])
      await _searchCountry.fetch({clean: true, force: true}, form.website)
    }
    _analytic.trackEvent(EventCategories.companySearch, CompanySearchEventActions.searchByUrl, form.website)
  }

  const editWebsite = () => {
    _searchCompany.clearCache()
    setCompanies(undefined)
  }

  const clearWebsite = () => {
    editWebsite()
    reset()
  }

  const SimilarHosts = () => {
    if (_searchCompany.entity && _searchCompany.entity.exactMatch.length == 0 && _searchCompany.entity.similarHosts.length > 0) {
      return (
        <>
          <br />
          <Txt truncate block>
            {m.suggestion}
          </Txt>
          <>
            {_searchCompany.entity.similarHosts.map((website, key) => {
              return (
                <ScButton
                  key={key}
                  variant={!!companies ? 'text' : 'contained'}
                  sx={{mt: 2, mr: 1}}
                  onClick={_ => {
                    setValue('website', website)
                    submit(getValues())
                  }}
                  size={'small'}
                  disabled={!!companies}
                  loading={_searchCompany.loading}
                >
                  {website}
                </ScButton>
              )
            })}
            <ScButton
              key={'key'}
              sx={{mt: 2}}
              variant={!!companies ? 'contained' : 'text'}
              size={'small'}
              disabled={!!companies}
              onClick={_ => setCompanies([])}
              loading={_searchCompany.loading}
            >
              {m.continueWithWebsite(getValues().website)}
            </ScButton>
          </>
        </>
      )
    } else {
      return <></>
    }
  }

  return (
    <>
      <Animate>
        <Panel title={m.aboutCompany} id="CompanyByWebsite">
          <PanelBody>
            <Box component="form" onSubmit={handleSubmit(submit)} {...props}>
              <Txt block>
                <span dangerouslySetInnerHTML={{__html: m.website}} />
                <Txt color="disabled"> *</Txt>
              </Txt>
              <ScInput
                InputProps={{
                  endAdornment: (
                    <Tooltip title={m.edit}>
                      <IconBtn size="small" color="primary" onClick={editWebsite}>
                        <Icon>edit</Icon>
                      </IconBtn>
                    </Tooltip>
                  ),
                }}
                onClear={clearWebsite}
                defaultValue={value}
                disabled={!!_searchCompany.entity}
                {...register('website', {
                  required: {value: true, message: m.required},
                  pattern: {
                    value:
                      /^((http|https):\/\/)?(www\.)?[A-Za-z0-9]+([\-\.]{1}[A-Za-z0-9]+)*\.[A-Za-z]{2,}(:[0-9]{1,5})?(\/.*)?$/,
                    message: m.invalidUrlPattern,
                  },
                })}
                fullWidth
                placeholder={m.websitePlaceholder}
                error={!!errors.website}
                helperText={errors.website?.message}
              />
              <br />
              <SimilarHosts />
              {(_searchCompany.entity && _searchCompany.entity.similarHosts.length > 0) ?? (
                <ScButton
                  variant="contained"
                  color="primary"
                  sx={{mt: 2}}
                  type="submit"
                  loading={_searchCompany.loading}
                  disabled={!!_searchCompany.entity}
                >
                  {m.continue}
                </ScButton>
              )}
            </Box>
          </PanelBody>
        </Panel>
      </Animate>
      {(() => {
        const website = getValues().website
        if (website) {
          if (_searchCountry.entity && _searchCountry.entity.length > 0) {
            return children(website, undefined, _searchCountry.entity)
          } else if (companies) {
            return children(website, companies)
          }
        }
      })()}
    </>
  )
}
