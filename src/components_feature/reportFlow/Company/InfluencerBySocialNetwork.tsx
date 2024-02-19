import {RequiredFieldsLegend} from '@/components_simple/RequiredFieldsLegend'
import {BtnNextSubmit, ButtonWithLoader} from '@/components_simple/buttons/Buttons'
import {ScTextInput} from '@/components_simple/formInputs/ScTextInput'
import {Controller, useForm} from 'react-hook-form'
import {SocialNetworks, socialNetworks} from '../../../anomalies/Anomaly'
import {Animate} from '../../../components_simple/Animate'
import {SocialNetworkRow} from '../../../components_simple/SocialNetworkRow'
import {ScRadioButtons} from '../../../components_simple/formInputs/ScRadioButtons'
import {useI18n} from '../../../i18n/I18n'
import {DetailsSpecifyInput} from '@/components_feature/reportFlow/Details/DetailsSpecifyInput'
import {AutofocusedDiv} from '@/components_simple/AutofocusedDiv'
import {Button} from '@codegouvfr/react-dsfr/Button'
import {useQuery} from '@tanstack/react-query'
import {useApiClients} from '@/context/ApiClientsContext'
import {useToastOnQueryError} from '@/clients/apiHooks'
import {useEffect, useState} from 'react'
import {Alert} from '@codegouvfr/react-dsfr/Alert'
import {ScAutocompletePostcode} from '@/components_simple/formInputs/ScAutocompletePostcode'
import {ScAlert} from '@/components_simple/ScAlert'

interface Props {
  onSubmit: (socialNetwork: SocialNetworks, influencer: string, otherSocialNetwork?: string, postalCode?: string) => void
}

interface Form {
  socialNetwork: SocialNetworks
  otherSocialNetwork: string
  influencer: string
  postalCode: string
}

export const InfluencerBySocialNetwork = ({onSubmit}: Props) => {
  const {m} = useI18n()
  const {
    handleSubmit,
    watch,
    control,
    register,
    setValue,
    formState: {errors},
  } = useForm<Form>()

  const {signalConsoApiClient} = useApiClients()
  const socialNetwork = watch('socialNetwork')

  const influencer = watch('influencer')
  const [isEditingInfluencer, setIsEditingInfluencer] = useState(true)
  const [certifiedInfluencer, setCertifiedInfluencer] = useState<string>()

  const searchQuery = useQuery({
    queryKey: ['searchCertifiedInfluencer', certifiedInfluencer, socialNetwork],
    queryFn: () => signalConsoApiClient.searchCertifiedInfluencer(certifiedInfluencer!, socialNetwork),
    enabled: !!certifiedInfluencer,
  })

  useToastOnQueryError(searchQuery)

  const socialNetworkOptions = socialNetworks.map(socialNetwork => {
    return {
      label: <SocialNetworkRow socialNetwork={socialNetwork} />,
      value: socialNetwork,
      specify: socialNetwork === 'OTHER' ? <DetailsSpecifyInput control={control} name="otherSocialNetwork" /> : undefined,
    }
  })

  return (
    <>
      <RequiredFieldsLegend />
      <form
        onSubmit={handleSubmit(form => {
          onSubmit(form.socialNetwork, form.influencer.toLowerCase().replaceAll(' ', ''), form.otherSocialNetwork, form.postalCode)
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
              render={({field: {onChange, ...rest}}) => (
                <ScRadioButtons
                  {...rest}
                  onChange={value => {
                    setCertifiedInfluencer(undefined)
                    setIsEditingInfluencer(true)
                    setValue('influencer', '')
                    return onChange(value)
                  }}
                  required
                  options={socialNetworkOptions}
                  title="Réseau social"
                />
              )}
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
                editable={
                  !isEditingInfluencer
                    ? {
                        onEdit: () => {
                          setValue('influencer', '')
                          setIsEditingInfluencer(true)
                        },
                        label: m.edit,
                      }
                    : undefined
                }
                disabled={!isEditingInfluencer}
              />

              {socialNetwork === 'OTHER' ? (
                <>
                  <ScAlert type="info">
                    <p className="mb-0">{m.cantIdentifyWebsiteCompany}</p>
                  </ScAlert>
                  <Controller
                    control={control}
                    name="postalCode"
                    rules={{
                      required: {value: true, message: m.required},
                    }}
                    render={({field: {onChange, onBlur, name, value}, fieldState: {error}}) => (
                      <ScAutocompletePostcode
                        label={m.yourPostalCode}
                        {...{onChange, onBlur, name, value}}
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                  <div className="flex justify-end">
                    <BtnNextSubmit />
                  </div>
                </>
              ) : isEditingInfluencer ? (
                <div className="flex justify-end">
                  <ButtonWithLoader
                    loading={searchQuery.isLoading}
                    disabled={!influencer}
                    onClick={() => {
                      setCertifiedInfluencer(influencer)
                      setIsEditingInfluencer(false)
                    }}
                    iconId={'fr-icon-arrow-right-s-line'}
                  >
                    {m.next}
                  </ButtonWithLoader>
                </div>
              ) : (
                <AutofocusedDiv>
                  <br />
                  {searchQuery.data ? (
                    <div className="flex justify-end">
                      <Button type="submit">{m.continueWithInfluencer(influencer)}</Button>
                    </div>
                  ) : (
                    <div className="flex-col">
                      <Alert
                        title={m.influencerUnknownTitle}
                        description={m.influencerUnknownDesc}
                        severity="warning"
                        className="text-base font-normal mb-3"
                      />
                      <div className="flex flex-row justify-end">
                        <Button priority={'secondary'} className={'mr-2'} onClick={_ => setIsEditingInfluencer(true)}>
                          {m.edit}
                        </Button>
                        <Button type="submit">{m.continueWithInfluencer(influencer)}</Button>
                      </div>
                    </div>
                  )}
                </AutofocusedDiv>
              )}
            </div>
          </Animate>
        )}
      </form>
    </>
  )
}
