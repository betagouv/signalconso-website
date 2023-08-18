import {SocialNetworks, socialNetworks} from '../../../anomalies/Anomaly'
import {ScInput} from '../../../components_simple/Input/ScInput'
import {Animate} from '../../../components_simple/Animate/Animate'
import {Panel, PanelActions, PanelBody} from '../../../components_simple/Panel/Panel'
import {useI18n} from '../../../i18n/I18n'
import {Controller, useForm} from 'react-hook-form'
import React from 'react'
import {Box} from '@mui/material'
import {Txt} from '../../../alexlibs/mui-extension/Txt/Txt'
import {SocialNetworkRow} from '../../../components_simple/SocialNetworkRow/SocialNetworkRow'
import {BtnNextSubmit} from 'components_simple/Buttons'
import {ScRadioButtons} from '../../../components_simple/RadioGroup/ScRadioButtons'

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
      <Box
        component="form"
        onSubmit={handleSubmit(form => {
          onSubmit(form.socialNetwork, form.influencer)
        })}
      >
        <Animate autoScrollTo={false}>
          <Panel
            title={
              <>
                <Txt>Réseau social</Txt>
                <Txt color="disabled"> *</Txt>
              </>
            }
            id="SocialNetwork"
          >
            <PanelBody>
              <Controller
                name="socialNetwork"
                control={control}
                rules={{
                  required: {value: true, message: m.required},
                }}
                render={({field}) => <ScRadioButtons {...field} options={socialNetworkOptions} />}
              />
            </PanelBody>
          </Panel>
        </Animate>
        {socialNetwork && (
          <Animate>
            <Panel
              title={
                <>
                  <Txt>Nom ou pseudonyme de l'influenceur ou influenceuse</Txt>
                  <Txt color="disabled"> *</Txt>
                </>
              }
              id="influencer"
            >
              <PanelBody>
                <ScInput
                  fullWidth
                  error={!!errors.influencer}
                  helperText={errors.influencer?.message}
                  placeholder="Nom ou pseudonyme"
                  {...register('influencer', {required: {value: true, message: m.required}})}
                />
              </PanelBody>
              <PanelActions>
                <BtnNextSubmit />
              </PanelActions>
            </Panel>
          </Animate>
        )}
      </Box>
    </>
  )
}
