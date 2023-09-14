import {ScPrecisionInput} from 'components_simple/formInputs/ScPrecisionInput'
import {useI18n} from 'i18n/I18n'
import {Control, Controller} from 'react-hook-form'
import {FieldError} from 'react-hook-form/dist/types/errors'

export const DetailsSpecifyInput = ({name, control, error}: {name: string; control: Control<any, any>; error?: FieldError}) => {
  const {m} = useI18n()
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: {value: true, message: m.required},
      }}
      render={({field}) => {
        return <ScPrecisionInput {...field} error={!!error} helperText={error?.message} required />
      }}
    />
  )
}
