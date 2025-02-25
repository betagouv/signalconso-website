import {useToastOnQueryError} from '@/clients/apiHooks'
import {DetailsSpecifyInput} from '@/components_feature/reportFlow/Details/DetailsSpecifyInput'
import {AutofocusedDiv} from '@/components_simple/AutofocusedDiv'
import {BtnNextSubmit, ButtonWithLoader} from '@/components_simple/buttons/Buttons'
import {ScAutocompletePostcode} from '@/components_simple/formInputs/ScAutocompletePostcode'
import {ScTextInput} from '@/components_simple/formInputs/ScTextInput'
import {useApiClients} from '@/context/ApiClientsContext'
import {Alert} from '@codegouvfr/react-dsfr/Alert'
import {Button} from '@codegouvfr/react-dsfr/Button'
import {useQuery} from '@tanstack/react-query'
import {useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {SocialNetwork, socialNetworks} from 'shared/anomalies/Anomaly'
import {Animate} from '../../../components_simple/Animate'
import {SocialNetworkRow} from '../../../components_simple/SocialNetworkRow'
import {ScRadioButtons} from '../../../components_simple/formInputs/ScRadioButtons'
import {useI18n} from '../../../i18n/I18n'

type Result = {
  influencer: string
} & (
  | {
      kind: 'knownSocialNetwork'
      socialNetwork: Exclude<SocialNetwork, 'OTHER'>
    }
  | {
      kind: 'otherSocialNetwork'
      socialNetwork: 'OTHER'
      otherSocialNetwork: string
      postalCode: string
    }
)

interface Form {
  socialNetwork: SocialNetwork
  otherSocialNetwork?: string
  influencer: string
  postalCode?: string
}

export function InfluencerBySocialNetwork({onSubmit}: {onSubmit: (result: Result) => void}) {
  const {m} = useI18n()
  const {signalConsoApiClient} = useApiClients()
  const {
    handleSubmit,
    watch,
    control,
    register,
    setValue,
    formState: {errors},
  } = useForm<Form>()
  const socialNetwork = watch('socialNetwork')
  const influencer = watch('influencer')
  const [isEditingInfluencer, setIsEditingInfluencer] = useState(true)
  const [certifiedInfluencer, setCertifiedInfluencer] = useState<string | undefined>()

  const searchQuery = useQuery({
    queryKey: ['searchCertifiedInfluencer', certifiedInfluencer, socialNetwork],
    queryFn: () => signalConsoApiClient.searchCertifiedInfluencer(sanitizeInfluencer(certifiedInfluencer!), socialNetwork),
    enabled: !!certifiedInfluencer,
  })

  useToastOnQueryError(searchQuery)

  const socialNetworkOptions = socialNetworks.map(socialNetwork => {
    return {
      label: <SocialNetworkRow {...{socialNetwork}} />,
      value: socialNetwork,
      specify: socialNetwork === 'OTHER' ? <DetailsSpecifyInput control={control} name="otherSocialNetwork" /> : undefined,
    }
  })

  return (
    <>
      <form
        onSubmit={handleSubmit(form => {
          onSubmit(transformBeforeSubmit(form))
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
                  <p className="mb-2 text-sm">{m.cantIdentifyCompany}</p>
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
                      <Button type="submit">{m.continue}</Button>
                    </div>
                  ) : (
                    <div className="flex-col">
                      <Alert
                        title={''}
                        description={m.influencerUnknownDesc(socialNetwork)}
                        severity="warning"
                        className="text-base font-normal mb-8"
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

function sanitizeInfluencer(name: string) {
  return name.toLowerCase().replaceAll(' ', '').replaceAll('@', '')
}

function transformBeforeSubmit(form: Form): Result {
  const {socialNetwork, otherSocialNetwork, postalCode} = form
  const influencer = sanitizeInfluencer(form.influencer)
  if (socialNetwork === 'OTHER') {
    if (!otherSocialNetwork || !postalCode) {
      throw new Error(
        `The fields for OTHER social network should have been filled at this point : ${otherSocialNetwork} and ${postalCode}`,
      )
    }
    return {
      kind: 'otherSocialNetwork',
      socialNetwork,
      influencer,
      otherSocialNetwork,
      postalCode,
    }
  }
  return {kind: 'knownSocialNetwork', socialNetwork, influencer}
}
