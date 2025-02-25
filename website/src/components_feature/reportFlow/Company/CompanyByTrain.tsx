import {Animate} from '@/components_simple/Animate'
import {BtnNextSubmit} from '@/components_simple/buttons/Buttons'
import {ScRadioButtons} from '@/components_simple/formInputs/ScRadioButtons'
import {FriendlyHelpText} from '@/components_simple/FriendlyHelpText'
import {useI18n} from '@/i18n/I18n'
import {useEffect} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {NightTrain, nightTrains, Ter, ters, Train, trains} from 'shared/anomalies/Anomaly'

interface Props {
  onSubmit: (form: Form) => void
}

interface Form {
  train: Train
  ter?: Ter
  nightTrain?: NightTrain
}

export const CompanyByTrain = ({onSubmit}: Props) => {
  const {m, currentLang} = useI18n()
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

  const foreignCountryCode =
    train === 'ICE' ? 'DE' : train === 'RENFE' ? 'ES' : train === 'EUROSTAR' ? 'GB' : nightTrain === 'NIGHTJET' ? 'AT' : undefined

  const displayNextButton =
    !foreignCountryCode && !!train && ((train !== 'TER' && train !== 'TRAIN_DE_NUIT') || !!ter || !!nightTrain)

  useEffect(() => {
    if (!!train) {
      setValue('ter', undefined)
      setValue('nightTrain', undefined)
    }
  }, [train])

  return (
    <>
      <form
        onSubmit={handleSubmit(form => {
          onSubmit(form)
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
        {foreignCountryCode && (
          <FriendlyHelpText>
            <p dangerouslySetInnerHTML={{__html: m.foreignRailwayCompany[foreignCountryCode]}} />
          </FriendlyHelpText>
        )}
        {displayNextButton && (
          <div className="flex justify-end">
            <BtnNextSubmit />
          </div>
        )}
      </form>
    </>
  )
}
