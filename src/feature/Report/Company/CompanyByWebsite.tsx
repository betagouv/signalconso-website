import {ScInput} from '../../../shared/Input/ScInput'
import {Txt} from 'mui-extension'
import React from 'react'
import {useI18n} from '../../../core/i18n'
import {useApiSdk} from '../../../core/context/ApiSdk'
import {ScButton} from '../../../shared/Button/Button'
import {useForm} from 'react-hook-form'
import {CompanySearchResult} from '@signal-conso/signalconso-api-sdk-js'
import {useBoolean, useEffectFn, useFetcher} from '@alexandreannic/react-hooks-lib'
import {useToast} from '../../../core/toast'
import {Box, BoxProps} from '@mui/material'
import {Panel, PanelBody} from '../../../shared/Panel/Panel'
import {Animate} from '../../../shared/Animate/Animate'

interface Form {
  website: string
}

interface Props extends Omit<BoxProps, 'onSubmit'> {
  value?: string
  onSubmit: (websiteUrl?: string, company?: CompanySearchResult[]) => void
}

export const CompanyByWebsite = ({value, onSubmit, ...props}: Props) => {
  const {m} = useI18n()
  const {apiSdk} = useApiSdk()
  const _searchByUrl = useFetcher(apiSdk.company.searchCompaniesByUrl)
  const {toastError} = useToast()
  const submitted = useBoolean()
  const {
    handleSubmit,
    register,
    formState: {errors},
  } = useForm<Form>()

  const submit = (form: Form) => {
    submitted.setTrue()
    _searchByUrl.fetch({clean: true, force: true}, form.website)
      .then(_ => onSubmit(
        form.website,
        _.length > 0 ? _ : undefined)
      )
      .finally(submitted.setFalse)
  }

  useEffectFn(_searchByUrl.error, toastError)

  return (
    <Animate>
      <Panel title={m.aboutCompany} id="CompanyByWebsite">
        <PanelBody>
          <Box component="form" onSubmit={handleSubmit(submit)} {...props}>
            <Txt block>
              <span dangerouslySetInnerHTML={{__html: m.website}}/>
              <Txt color="disabled"> *</Txt>
            </Txt>
            <ScInput
              onClear={() => {
                onSubmit()
                submitted.setFalse()
              }}
              defaultValue={value}
              disabled={submitted.value}
              {...register('website', {
                required: {value: true, message: m.required},
                pattern: {value: /^((http|https):\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/, message: m.invalidUrlPattern}
              })}
              fullWidth placeholder={m.websitePlaceholder}
              error={!!errors.website}
              helperText={errors.website?.message}
            />

            <ScButton variant="contained" color="primary" sx={{mt: 2}} type="submit" loading={_searchByUrl.loading} disabled={submitted.value}>
              {m.continue}
            </ScButton>
          </Box>
        </PanelBody>
      </Panel>
    </Animate>
  )
}
