import {useI18n} from '@/i18n/I18n'
import {ters, Ters, trains, Trains} from '@/anomalies/Anomaly'
import {Controller, useForm} from 'react-hook-form'
import {ScRadioButtons} from '@/components_simple/formInputs/ScRadioButtons'
import {Animate} from '@/components_simple/Animate'
import {ReactNode, useEffect, useState} from 'react'
import {RequiredFieldsLegend} from '@/components_simple/RequiredFieldsLegend'
import {BtnNextSubmit} from '@/components_simple/buttons/Buttons'
import {ScAutoComplete} from '@/components_simple/formInputs/ScAutocomplete'

interface Props {
  children: () => ReactNode
  onSubmit: (train: Trains, ter?: Ters) => void
}

interface Form {
  train: Trains
  ter?: Ters
}

export const CompanyByTrain2 = ({children, onSubmit}: Props) => {
  const {m} = useI18n()
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: {errors},
  } = useForm<Form>()

  const trainOptions = trains.map(train => {
    return {
      label: m.Train[train],
      description: m.TrainDescription[train],
      value: train,
    }
  })

  const train = watch('train')
  const ter = watch('ter')

  useEffect(() => {
    if (!!train) {
      setValue('ter', undefined)
    }
  }, [train])

  return (
    <>
      <RequiredFieldsLegend />
      <form
        onSubmit={handleSubmit(form => {
          onSubmit(form.train, form.ter)
        })}
      >
        <Animate autoScrollTo={false}>
          <div id="train">
            <Controller
              name="train"
              control={control}
              rules={{
                required: {value: true, message: m.required},
              }}
              render={({field}) => (
                <ScRadioButtons {...field} required options={trainOptions} title="Quel train avez vous pris ?" />
              )}
            />
          </div>
        </Animate>
        {train === 'TER' && (
          <Animate>
            <div id="ter">
              <Controller
                name="ter"
                control={control}
                rules={{
                  required: {value: true, message: m.required},
                }}
                render={({field: {onChange, onBlur, name, value}, fieldState: {error}}) => (
                  <ScAutocompleteTer {...{onChange, onBlur, name, value}} error={!!error} helperText={error?.message} />
                )}
              />
            </div>
          </Animate>
        )}
        {train && train !== 'OTHER' && (train !== 'TER' || !!ter) && (
          <div className="flex justify-end">
            <BtnNextSubmit />
          </div>
        )}
      </form>
      {train === 'OTHER' && children()}
    </>
  )
}

export function ScAutocompleteTer(props: {
  value?: Ters
  onChange: (ter: Ters) => void
  onBlur: () => void
  name: string
  error: boolean
  helperText?: string
}) {
  const [query, setQuery] = useState('')
  const {m} = useI18n()

  const terOptions = ters.filter(ter => {
    return !query || ter.toLowerCase().includes(query.toLowerCase())
  })

  return (
    <ScAutoComplete<Ters>
      label="TER"
      {...props}
      {...{query, setQuery}}
      optionsAreSame={(a, b) => a === b}
      optionKey={a => a}
      options={terOptions}
      inputDisplayValue={a => m.Ter[a]}
      optionRender={option => (
        <>
          <span className="mx-2">{m.Ter[option]}</span>
        </>
      )}
    />
  )
}
