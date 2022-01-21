import {ScInput} from '../../../shared/Input/ScInput'
import {Txt} from 'mui-extension'
import React from 'react'
import {useI18n} from '../../../core/i18n'
import {ScButton} from '../../../shared/Button/Button'
import {useForm} from 'react-hook-form'
import {useBoolean} from '@alexandreannic/react-hooks-lib'
import {useToast} from '../../../core/toast'
import {Box, BoxProps, Icon} from '@mui/material'
import {IconBtn} from 'mui-extension/lib'
import {Panel, PanelBody} from '../../../shared/Panel/Panel'
import {Animate} from '../../../shared/Animate/Animate'

interface Form {
  phone: string
}

interface Props extends Omit<BoxProps, 'onSubmit'> {
  autoScrollTo?: boolean
animate?: boolean
  value?: string
  onSubmit: (phone?: string) => void
}

export const CompanyByPhone = ({autoScrollTo, animate, value, onSubmit, ...props}: Props) => {
  const {m} = useI18n()
  const {toastError} = useToast()
  const submitted = useBoolean()
  const {
    handleSubmit,
    register,
    formState: {errors},
  } = useForm<Form>()
  
  return (
    <Animate autoScrollTo={autoScrollTo} animate={animate}>
      <Panel title={m.aboutCompany}>
        <PanelBody>
          <Box component="form" onSubmit={handleSubmit(({phone}) => onSubmit(phone))} {...props}>
            <Txt block>
              <span dangerouslySetInnerHTML={{__html: m.phoneNumberHavingCalled}}/>
              <Txt color="disabled"> *</Txt>
            </Txt>
            <ScInput
              defaultValue={value}
              disabled={submitted.value}
              {...register('phone', {
                required: {value: true, message: m.required},
                pattern: {value: /^((\+)33|0|0033)[1-9]([.\-\s+]?\d{2}){4}$/g, message: m.invalidUrlPattern}
              })}
              fullWidth placeholder={m.phoneNumberHavingCalledPlaceholder}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              InputProps={submitted.value ? {
                endAdornment: (
                  <IconBtn size="small" color="primary" onClick={() => {
                    onSubmit()
                    submitted.setFalse()
                  }}>
                    <Icon>clear</Icon>
                  </IconBtn>
                )
              } : {}}
            />

            <ScButton variant="contained" color="primary" sx={{mt: 2}} type="submit" disabled={submitted.value}>
              {m.continue}
            </ScButton>
          </Box>
        </PanelBody>
      </Panel>
    </Animate>
  )
}
