import {ScInput} from 'shared/Input/ScInput'
import {Txt} from '../../../alexlibs/mui-extension'
import React, {ReactNode, useState} from 'react'
import {useI18n} from 'core/i18n'
import {ScButton} from 'shared/Button/Button'
import {useForm} from 'react-hook-form'
import {Box, BoxProps, Icon} from '@mui/material'
import {IconBtn} from '../../../alexlibs/mui-extension'
import {Panel, PanelBody} from 'shared/Panel/Panel'
import {Animate} from 'shared/Animate/Animate'

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
              <Txt block>
                <span dangerouslySetInnerHTML={{__html: m.phoneNumberHavingCalled}} />
                <Txt color="disabled"> *</Txt>
              </Txt>
              <ScInput
                defaultValue={value}
                disabled={!!phone}
                {...register('phone', {
                  required: {value: true, message: m.required},
                  pattern: {value: /^((\+)33|0|0033)[1-9]([.\-\s+]?\d{2}){4}$/g, message: m.invalidPhone},
                })}
                fullWidth
                placeholder={m.phoneNumberHavingCalledPlaceholder}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                InputProps={
                  !!phone
                    ? {
                        endAdornment: (
                          <IconBtn size="small" color="primary" onClick={clear}>
                            <Icon>clear</Icon>
                          </IconBtn>
                        ),
                      }
                    : {}
                }
              />

              <ScButton variant="contained" color="primary" sx={{mt: 2}} type="submit" disabled={!!phone}>
                {m.continue}
              </ScButton>
            </Box>
          </PanelBody>
        </Panel>
      </Animate>
      {phone && children(phone)}
    </>
  )
}
