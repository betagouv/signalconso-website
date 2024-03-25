import {ScAutocompleteStation} from '@/components_simple/formInputs/ScAutocompleteStation'
import {Controller, useForm} from 'react-hook-form'
import {ReactNode, useState} from 'react'
import {Button} from '@codegouvfr/react-dsfr/Button'
import {BtnNextSubmit, ButtonWithLoader} from '@/components_simple/buttons/Buttons'
import {useI18n} from '@/i18n/I18n'

interface Props {
  onSubmit: (station: string) => void
  children: () => ReactNode
}
interface Form {
  station: string
}

export const CompanyByStation = ({onSubmit, children}: Props) => {
  const {m} = useI18n()
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
    setValue,
  } = useForm<Form>()
  const [skipped, setSkipped] = useState<boolean>(false)
  const station = watch('station')

  return (
    <div>
      <form onSubmit={handleSubmit(form => onSubmit(form.station))}>
        <Controller
          control={control}
          name="station"
          render={({field: {onChange, onBlur, name, value}, fieldState: {error}}) => (
            <ScAutocompleteStation
              label={m.whichStation}
              {...{onChange, onBlur, name, value}}
              error={!!error}
              helperText={error?.message}
              disabled={skipped}
              editable={
                skipped
                  ? {
                      onEdit: () => {
                        setValue('station', '')
                        setSkipped(false)
                      },
                      label: m.edit,
                    }
                  : undefined
              }
            />
          )}
        />
        <div className="flex justify-end gap-2">
          <Button priority="tertiary no outline" type="button" onClick={() => setSkipped(true)}>
            {m.dontKnowStation}
          </Button>
          {station && !skipped && <BtnNextSubmit />}
        </div>
      </form>
      {skipped && children()}
    </div>
  )
}
