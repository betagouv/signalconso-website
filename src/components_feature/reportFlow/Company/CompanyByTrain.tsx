import {useI18n} from '@/i18n/I18n'
import {ters, Ters, trains, Trains, NightTrains, nightTrains} from '@/anomalies/Anomaly'
import {Controller, useForm} from 'react-hook-form'
import {ScRadioButtons} from '@/components_simple/formInputs/ScRadioButtons'
import {Animate} from '@/components_simple/Animate'
import {ReactNode, useEffect} from 'react'
import {RequiredFieldsLegend} from '@/components_simple/RequiredFieldsLegend'
import {BtnNextSubmit} from '@/components_simple/buttons/Buttons'

interface Props {
  onSubmit: (train: Trains, ter?: Ters, nightTrain?: NightTrains) => void
  children: () => ReactNode
}

interface Form {
  train: Trains
  ter?: Ters
  nightTrain?: NightTrains
}

export const CompanyByTrain = ({onSubmit, children}: Props) => {
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

  const terOptions = ters.map(ter => {
    return {
      label: m.Ter[ter],
      value: ter,
    }
  })

  const nightTrainOptions = nightTrains.map(nightTrain => {
    return {
      label: m.NightTrain[nightTrain],
      value: nightTrain,
    }
  })

  const train = watch('train')
  const ter = watch('ter')
  const nightTrain = watch('nightTrain')

  const displayNextButton = !!train && ((train !== 'TER' && train !== 'TRAIN_DE_NUIT') || !!ter || !!nightTrain)

  useEffect(() => {
    if (!!train) {
      setValue('ter', undefined)
      setValue('nightTrain', undefined)
    }
  }, [train])

  return (
    <>
      <RequiredFieldsLegend />
      <form
        onSubmit={handleSubmit(form => {
          onSubmit(form.train, form.ter, form.nightTrain)
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
              render={({field}) => <ScRadioButtons {...field} required options={trainOptions} title={m.trainTaken} />}
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
                render={({field}) => <ScRadioButtons {...field} required options={terOptions} title={m.terRegion} />}
              />
            </div>
          </Animate>
        )}
        {train === 'TRAIN_DE_NUIT' && (
          <Animate>
            <div id="ter">
              <Controller
                name="nightTrain"
                control={control}
                rules={{
                  required: {value: true, message: m.required},
                }}
                render={({field}) => (
                  <ScRadioButtons {...field} required options={nightTrainOptions} title="Quel train de nuit ?" />
                )}
              />
            </div>
          </Animate>
        )}
        {nightTrain === 'AUTRE_TRAIN_DE_NUIT' && children()}
        {displayNextButton && nightTrain !== 'AUTRE_TRAIN_DE_NUIT' && (
          <div className="flex justify-end">
            <BtnNextSubmit />
          </div>
        )}
      </form>
    </>
  )
}
