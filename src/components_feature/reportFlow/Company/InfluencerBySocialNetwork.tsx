import {RequiredFieldsLegend} from '@/components_simple/RequiredFieldsLegend'
import {BtnNextSubmit} from '@/components_simple/buttons/Buttons'
import {ScTextInput} from '@/components_simple/formInputs/ScTextInput'
import {Controller, useForm} from 'react-hook-form'
import {SocialNetworks, socialNetworks} from '../../../anomalies/Anomaly'
import {Animate} from '../../../components_simple/Animate'
import {SocialNetworkRow} from '../../../components_simple/SocialNetworkRow'
import {ScRadioButtons} from '../../../components_simple/formInputs/ScRadioButtons'
import {useI18n} from '../../../i18n/I18n'

interface Props {
  onSubmit: (socialNetwork: SocialNetworks, influencer: string) => void
}
interface Form {
  socialNetwork: SocialNetworks
  influencer: string
}

export const InfluencerBySocialNetwork = ({onSubmit}: Props) => {
  const {m} = useI18n()
  const {
    handleSubmit,
    watch,
    control,
    register,
    formState: {errors},
  } = useForm<Form>()

  const socialNetwork = watch('socialNetwork')

  const socialNetworkOptions = socialNetworks.map(socialNetwork => {
    return {
      label: <SocialNetworkRow socialNetwork={socialNetwork} />,
      value: socialNetwork,
    }
  })

  return (
    <>
      <RequiredFieldsLegend />
      <form
        onSubmit={handleSubmit(form => {
          onSubmit(form.socialNetwork, form.influencer)
        })}
      >
        <Animate autoScrollTo={false}>
          <div id="SocialNetwork">
            <Controller
              name="socialNetwork"
              control={control}
              rules={{
                required: {value: true, message: m.required},
              }}
              render={({field}) => <ScRadioButtons {...field} required options={socialNetworkOptions} title="Réseau social" />}
            />
          </div>
        </Animate>
        {socialNetwork && (
          <Animate>
            <div id="influencer">
              <ScTextInput
                label="Nom ou pseudonyme de l'influenceur ou influenceuse"
                error={!!errors.influencer}
                helperText={errors.influencer?.message}
                placeholder="Nom ou pseudonyme"
                {...register('influencer', {required: {value: true, message: m.required}})}
                required
              />
              <div className="flex justify-end">
                <BtnNextSubmit />
              </div>
            </div>
          </Animate>
        )}
      </form>
    </>
  )
}
