import {ScInput} from 'shared/Input/ScInput'
import {IconBtn, Txt} from '../../../alexlibs/mui-extension'
import React, {ReactNode} from 'react'
import {useI18n} from 'core/i18n'
import {useApiSdk} from 'core/context/ApiSdk'
import {ScButton} from 'shared/Button/Button'
import {useForm} from 'react-hook-form'
import {useEffectFn, useFetcher} from '../../../alexlibs/react-hooks-lib'
import {useToast} from 'core/toast'
import {Box, BoxProps, Icon, Tooltip} from '@mui/material'
import {Panel, PanelBody} from 'shared/Panel/Panel'
import {Animate} from 'shared/Animate/Animate'
import {useAnalyticContext} from 'core/analytic/AnalyticContext'
import {CompanySearchEventActions, EventCategories} from 'core/analytic/analytic'
import {CompanySearchResult} from '../../../client/company/Company'
import {Country} from '../../../client/constant/Country'

interface Form {
  website: string
}

interface Props extends Omit<BoxProps, 'onSubmit' | 'children'> {
  value?: string
  children: (websiteUrl?: string, result?: CompanySearchResult[], countries?: Country[]) => ReactNode
}

export const CompanyByWebsite = ({value, children, ...props}: Props) => {
  const {m} = useI18n()
  const {apiSdk} = useApiSdk()
  const _searchCompany = useFetcher(apiSdk.company.searchCompaniesByUrl)
  const _searchCountry = useFetcher(apiSdk.company.searchForeignCompaniesByUrl)
  const _analytic = useAnalyticContext()
  const {toastError} = useToast()
  const {
    getValues,
    handleSubmit,
    register,
    reset,
    formState: {errors},
  } = useForm<Form>()

  const submit = async (form: Form) => {
    _searchCompany.clearCache()
    _searchCountry.clearCache()
    const res = await _searchCompany.fetch({clean: true, force: true}, form.website)
    if (res.length === 0) {
      await _searchCountry.fetch({clean: true, force: true}, form.website)
    }
    _analytic.trackEvent(EventCategories.companySearch, CompanySearchEventActions.searchByUrl, form.website)
  }

  useEffectFn(_searchCompany.error, toastError)

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
                      <IconBtn size="small" color="primary" onClick={_searchCompany.clearCache}>
                        <Icon>edit</Icon>
                      </IconBtn>
                    </Tooltip>
                  ),
                }}
                onClear={() => {
                  _searchCompany.clearCache()
                  reset()
                }}
                defaultValue={value}
                disabled={!!_searchCompany.entity}
                {...register('website', {
                  required: {value: true, message: m.required},
                  pattern: {
                    value: /^((http|https):\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/,
                    message: m.invalidUrlPattern,
                  },
                })}
                fullWidth
                placeholder={m.websitePlaceholder}
                error={!!errors.website}
                helperText={errors.website?.message}
              />

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
            </Box>
          </PanelBody>
        </Panel>
      </Animate>
      {(() => {
        const website = getValues().website
        if (website) {
          if (_searchCountry.entity && _searchCountry.entity.length > 0) {
            return children(website, undefined, _searchCountry.entity)
          }
          if (_searchCompany.entity) {
            return children(website, _searchCompany.entity)
          }
        }
      })()}
    </>
  )
}
