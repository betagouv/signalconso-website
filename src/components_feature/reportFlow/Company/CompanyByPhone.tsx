import {Button} from '@codegouvfr/react-dsfr/Button'
import {Box, BoxProps} from '@mui/material'
import {Animate} from 'components_simple/Animate'
import {Panel, PanelBody} from 'components_simple/Panel'
import {RequiredFieldsLegend} from 'components_simple/RequiredFieldsLegend'
import {ScTextInput} from 'components_simple/formInputs/ScTextInput'
import {useI18n} from 'i18n/I18n'
import {ReactNode, useState} from 'react'
import {useForm} from 'react-hook-form'

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
  } = useForm<Form>({
    defaultValues: {
      phone: value,
    },
  })

  const submit = async (form: Form) => {
    setPhone(form.phone)
  }

  const edit = () => {
    // I don'y why, it doesn't actually empty the field
    // but at least it enables it again
    setPhone(undefined)
  }

  const isSubmitted = !!phone

  return (
    <>
      <Animate>
        <Panel title={m.aboutCompany} id="CompanyByPhone">
          <PanelBody>
            <RequiredFieldsLegend />
            <Box component="form" onSubmit={handleSubmit(submit)} {...props}>
              <ScTextInput
                type="tel"
                label={m.phoneNumberHavingCalled}
                disabled={isSubmitted}
                {...register('phone', {
                  required: {value: true, message: m.required},
                  pattern: {value: /^((((\+)33|0|0033)[1-9]([.\-\s+]?\d{2}){4})|(\d{2,5}))$/g, message: m.invalidPhone},
                })}
                required
                placeholder={m.phoneNumberHavingCalledPlaceholder}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                editable={
                  isSubmitted
                    ? {
                        onEdit: edit,
                        label: m.clearPhone,
                      }
                    : undefined
                }
              />
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
