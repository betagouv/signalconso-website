import {FormLayout} from '../../../shared/FormLayout/FormLayout'
import {useI18n} from '../../../core/i18n'
import {ScInput} from '../../../shared/Input/ScInput'
import {Panel, PanelActions, PanelBody} from '../../../shared/Panel/Panel'
import {useApiSdk} from '../../../core/context/ApiSdk'
import {useEffectFn, useFetcher} from '@alexandreannic/react-hooks-lib'
import {ScButton} from '../../../shared/Button/Button'
import {useForm} from 'react-hook-form'
import {CompanySearchResult} from '@signal-conso/signalconso-api-sdk-js'
import {useToast} from '../../../core/toast'
import {IconBtn, Txt} from 'mui-extension'
import {Icon} from '@mui/material'
import React, {useRef} from 'react'
import {Accordion} from '../../../shared/Accordion/Accordion'
import {Animate} from '../../../shared/Animate/Animate'

interface Form {
  identity: string
}

interface Props {
  autoScrollTo?: boolean
  animate?: boolean
  onFound: (companies?: CompanySearchResult[]) => void
}

export const CompanySearchByIdentity = ({autoScrollTo, animate, onFound}: Props) => {
  const {m} = useI18n()
  const {apiSdk} = useApiSdk()
  const {toastError} = useToast()
  const _searchByIdentity = useFetcher(apiSdk.company.searchCompaniesByIdentity)
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<Form>()
  const inputEl = useRef<HTMLInputElement>(null)

  const search = (form: Form) => {
    _searchByIdentity.fetch({force: true, clean: true}, form.identity).then(onFound)
  }

  useEffectFn(_searchByIdentity.error, toastError)

  return (
    <Animate autoScrollTo={autoScrollTo} animate={animate}>
      <Panel title={m.couldYouPrecise} id="CompanySearchByIdentity">
        <form onSubmit={handleSubmit(search)}>
          <PanelBody>
            <FormLayout required label={m.companyIdentityLabel}>
              <Accordion label={<Txt size="small">{m.companyIdentityHelper}</Txt>}>
                <Txt color="hint" size="small" dangerouslySetInnerHTML={{__html: m.companyIdentityHelperDesc}}/>
              </Accordion>
              <ScInput
                inputRef={inputEl}
                {...register('identity', {
                  required: {value: true, message: m.required}
                })}
                fullWidth
                placeholder={m.companyIdentityPlaceholder}
                InputProps={{
                  endAdornment: (
                    <IconBtn size="small" color="primary" onClick={() => {
                      onFound(undefined)
                      reset()
                      console.log(inputEl)
                      inputEl.current?.focus()
                    }}>
                      <Icon>clear</Icon>
                    </IconBtn>
                  )
                }}
              />
            </FormLayout>
          </PanelBody>

          <PanelActions>
            <ScButton color="primary" variant="contained" icon="search" type="submit" loading={_searchByIdentity.loading}>
              {m.search}
            </ScButton>
          </PanelActions>
        </form>
      </Panel>
    </Animate>
  )
}
