import {RequiredFieldsLegend} from '@/components_simple/RequiredFieldsLegend'
import {BtnNext, BtnNextSubmit, ButtonWithLoader} from '@/components_simple/buttons/Buttons'
import {ScTextInput} from '@/components_simple/formInputs/ScTextInput'
import {Controller, useForm} from 'react-hook-form'
import {SocialNetworks, socialNetworks} from '../../../anomalies/Anomaly'
import {Animate} from '../../../components_simple/Animate'
import {SocialNetworkRow} from '../../../components_simple/SocialNetworkRow'
import {ScRadioButtons} from '../../../components_simple/formInputs/ScRadioButtons'
import {useI18n} from '../../../i18n/I18n'
import {DetailsSpecifyInput} from '@/components_feature/reportFlow/Details/DetailsSpecifyInput'
import {AutofocusedDiv} from "@/components_simple/AutofocusedDiv";
import {Button} from "@codegouvfr/react-dsfr/Button";
import {SignalConsoApiClient} from "@/clients/SignalConsoApiClient";
import {SiretExtractorClient} from "@/clients/SiretExtractorClient";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useApiClients} from "@/context/ApiClientsContext";
import {useToastOnQueryError} from "@/clients/apiHooks";
import {Influencer} from "@/model/Influencer";
import {useEffect, useState} from "react";
import {Alert} from "@codegouvfr/react-dsfr/Alert";

interface Props {
  onSubmit: (socialNetwork: SocialNetworks, influencer: string, otherSocialNetwork?: string) => void
}

interface Form {
  socialNetwork: SocialNetworks
  otherSocialNetwork: string
  influencer: string,
  certified?: boolean
}


async function searchInfluencer(
  signalConsoApiClient: SignalConsoApiClient,
  influencer: string,
  socialNetwork: SocialNetworks
): Promise<Influencer[]> {
  return await signalConsoApiClient.searchCertifiedInfluencer(influencer, socialNetwork)
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

  useEffect(() => {
    setValue("influencer", "")
    setIsEditingWebsite(true)
  }, [socialNetwork])

  const influencer = watch('influencer')
  const [isEditingWebsite, setIsEditingWebsite] = useState(true)
  const [getCertifiedInfluencer, setGetCertifiedInfluencer] = useState(false)

  const searchQuery = useQuery({
    queryKey: ['searchCertifiedInfluencer', influencer, socialNetwork],
    queryFn: () => {
      return searchInfluencer(signalConsoApiClient, influencer, socialNetwork).then(res => {
        setGetCertifiedInfluencer(false)
        return res;
      })
    },
    enabled: getCertifiedInfluencer
  })

  useToastOnQueryError(searchQuery)

  const socialNetworkOptions = socialNetworks.map(socialNetwork => {
    return {
      label: <SocialNetworkRow socialNetwork={socialNetwork}/>,
      value: socialNetwork,
      specify: socialNetwork === 'OTHER' ?
        <DetailsSpecifyInput control={control} name="otherSocialNetwork"/> : undefined,
    }
  })




  function CertifiedInfluencer({
                                 currentInfluencer,
                                 certifiedInfluencers,
                               }: {
    currentInfluencer: string,
    certifiedInfluencers: string[] | undefined,

  }) {
    const {m} = useI18n()
    if (certifiedInfluencers && !isEditingWebsite) {
      return (
        <AutofocusedDiv>
          <br/>
          {(certifiedInfluencers.includes(currentInfluencer)) ?
            (
              <>
                <Alert title={m.influencerIdentifiedTitle}
                       description={m.influencerIdentifiedDesc}
                       severity="success" className="text-base font-normal mb-3"/>
                <div className="flex justify-end">
                  <Button
                    type="submit"
                  >
                    {m.continueWithInfluencer(currentInfluencer)}
                  </Button>
                </div>
              </>

            ) : (
              <div className="flex-col">
                <Alert title={m.influencerUnknownTitle}
                       description={m.influencerUnknownDesc}
                       severity="warning" className="text-base font-normal mb-3"/>
                <div className="flex flex-row justify-end">
                  <Button priority={"secondary"} className={"mr-2"} onClick={_ => setIsEditingWebsite(true)}>
                    {m.edit}
                  </Button>
                  <Button type="submit">
                    {m.continueWithWebsite(currentInfluencer)}
                  </Button>
                </div>
              </div>)
          }

        </AutofocusedDiv>

      )
    }
    return null;
  }


  return (
    <>
      <RequiredFieldsLegend/>
      <form
        onSubmit={handleSubmit(form => {
          onSubmit(form.socialNetwork, form.influencer, form.otherSocialNetwork)
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
              render={({field}) => <ScRadioButtons {...field} required options={socialNetworkOptions}
                                                   title="Réseau social"/>}
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
                editable={!isEditingWebsite ? {
                    onEdit: () => {
                      setValue("influencer", "")
                      setIsEditingWebsite(true)
                    },
                    label: m.modifyWebsite,
                  }
                  : undefined
                }
                disabled={!isEditingWebsite}
              />

              <CertifiedInfluencer
                currentInfluencer={influencer}
                certifiedInfluencers={searchQuery.data ? searchQuery.data.map(_ => _.name) : undefined}
              />


              {isEditingWebsite &&
                (<div className="flex justify-end">
                  <ButtonWithLoader loading={searchQuery.isLoading} disabled={influencer == ""} onClick={() => {
                    setGetCertifiedInfluencer(true)
                    setIsEditingWebsite(false)
                  }} iconId={"fr-icon-arrow-right-s-line"}>Next</ButtonWithLoader>
                </div>)

              }

            </div>
          </Animate>
        )}
      </form>
    </>
  )
}
