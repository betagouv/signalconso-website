import {ScInput} from 'components_simple/formInputs/ScInput'
import {Txt} from '../../../components_simple/Txt'
import React, {ReactNode, useState} from 'react'
import {useI18n} from 'i18n/I18n'
import {useForm} from 'react-hook-form'
import {Box, BoxProps, Icon, IconButton} from '@mui/material'
import {Panel, PanelBody} from 'components_simple/Panel'
import {Animate} from 'components_simple/Animate'
import {Button} from '@codegouvfr/react-dsfr/Button'
import {FieldLabel} from 'components_simple/FieldLabel'

interface Form {
  phone: string
}

interface Props extends Omit<BoxProps, 'onSubmit' | 'children'> {
  value?: string
  children: (phone?: string) => ReactNode
}

export const CompanyByPhone = ({value, children, ...props}: Props) => {
  const {m} = useI18n()
  const [phone, setPhone] = useState<string | undefined>()
  const {
    handleSubmit,
    register,
    formState: {errors},
  } = useForm<Form>()

  const submit = async (form: Form) => {
    setPhone(form.phone)
  }

  const clear = () => {
    setPhone(undefined)
  }

  return (
    <>
      <Animate>
        <Panel title={m.aboutCompany} id="CompanyByPhone">
          <PanelBody>
            <Box component="form" onSubmit={handleSubmit(submit)} {...props}>
              <FieldLabel label={m.phoneNumberHavingCalled} required>
                <ScInput
                  type="tel"
                  defaultValue={value}
                  disabled={!!phone}
                  {...register('phone', {
                    required: {value: true, message: m.required},
                    pattern: {value: /^((((\+)33|0|0033)[1-9]([.\-\s+]?\d{2}){4})|(\d{2,5}))$/g, message: m.invalidPhone},
                  })}
                  fullWidth
                  placeholder={m.phoneNumberHavingCalledPlaceholder}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  InputProps={
                    !!phone
                      ? {
                          endAdornment: (
                            <IconButton size="small" color="primary" onClick={clear}>
                              <Icon>clear</Icon>
                            </IconButton>
                          ),
                        }
                      : {}
                  }
                />
              </FieldLabel>

              <div className="flex items-center justify-end">
                <Button type="submit" disabled={!!phone} className="mt-2">
                  {m.continue}
                </Button>
              </div>
            </Box>
          </PanelBody>
        </Panel>
      </Animate>
      {phone && children(phone)}
    </>
  )
}
