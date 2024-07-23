import {CompanyRecapFromSearchResult, CompanyRecapFromStep2} from '@/components_simple/CompanyRecap/CompanyRecap'
import {ScAlert} from '@/components_simple/ScAlert'
import {ButtonWithLoader} from '@/components_simple/buttons/Buttons'
import {Fixture, SeedableRandom} from '@/test/fixture'
import {PortalToBody} from '@/utils/PortalToBody'
import Button from '@codegouvfr/react-dsfr/Button'
import {createModal} from '@codegouvfr/react-dsfr/Modal'
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {AccordionInline} from '../../components_simple/AccordionInline'
import {SocialNetworkRow} from '../../components_simple/SocialNetworkRow'
import {ScCheckbox} from '../../components_simple/formInputs/ScCheckbox'
import {ScRadioButtons} from '../../components_simple/formInputs/ScRadioButtons'
import {useI18n} from '../../i18n/I18n'
import {DetailsSpecifyInput} from '../reportFlow/Details/DetailsSpecifyInput'

const modal = createModal({
  id: 'playground-modal',
  isOpenedByDefault: false,
})

export const PlaygroundOther = () => {
  const [radioValue, setRadioValue] = useState<string | undefined>(undefined)
  const [checkValue, setCheckValue] = useState<string[] | undefined>(undefined)
  const {m} = useI18n()
  const {watch, control} = useForm<{specifiyValue: string}>()
  const {watch: watchCheck, control: controlCheck} = useForm<{specifiyCheck: string}>()
  const specifiyValue = watch('specifiyValue')
  const specifiyCheck = watchCheck('specifiyCheck')
  const random = new SeedableRandom(33)
  return (
    <>
      <div className="mb-4">
        <h6> Modale du DSFR</h6>
        <PortalToBody>
          <modal.Component
            size="small"
            title="Titre de la modale"
            buttons={[
              {
                children: 'Un bouton',
                priority: 'secondary',
              },
              {
                children: `Le bouton d'action principal`,
              },
            ]}
          >
            <p>Lorem ipsum dolor</p>
          </modal.Component>
        </PortalToBody>
        <div className="flex flex-col gap-2">
          <Button nativeButtonProps={modal.buttonProps}>Open modal (with button props)</Button>
          <Button onClick={() => modal.open()}>Open modal (with .open())</Button>{' '}
        </div>
      </div>

      <div className="mb-4">
        <h6> a big animated loader, standalone</h6>
        <div className="sc-loader-big w-10 h-10"></div>
      </div>
      <h6 className="">
        Button with loader (aligné plusieurs fois pour vérifier que les différentes versions prennent toujours la même place)
      </h6>

      <div className="flex flex-col">
        <QuickButtonWithLoader loading={true} />
        <QuickButtonWithLoader loading={false} />
        <div>
          <QuickButtonWithLoader loading={true} />
          <QuickButtonWithLoader loading={false} />
        </div>
      </div>
      <hr />

      <div className="">
        <h6>SocialNetworkRow</h6>

        <SocialNetworkRow socialNetwork="SNAPCHAT" />
        <SocialNetworkRow socialNetwork="SNAPCHAT" gray />
        <SocialNetworkRow socialNetwork="TWITCH" />
      </div>

      <h6>Radio DSFR</h6>

      <ScRadioButtons
        title="Test fieldset"
        description="une desc"
        orientation="vertical"
        onChange={setRadioValue}
        required={false}
        options={[
          {
            label: 'Option 1',
            description: 'Du texte',
            value: 'a',
          },
          {
            label: 'Option 2',
            description: 'Description',
            value: 'b',
            specify: <DetailsSpecifyInput control={control} name="specifiyValue" />,
          },
          {
            label: <SocialNetworkRow socialNetwork="SNAPCHAT" />,
            value: 'c',
          },
          {
            label: 'Option 3',
            description: (
              <AccordionInline label={m.companyHowToFindCountry}>
                <p className="mb-0 text-gray-500 text-sm" dangerouslySetInnerHTML={{__html: m.howToFindCompanyCountryDesc}} />
              </AccordionInline>
            ),
            value: 'd',
          },
          {
            label: 'Option 4',
            description: 'Du texte',
            value: 'e',
            disabled: true,
          },
        ]}
        value={radioValue}
      />

      <p>Radio value: {radioValue}</p>
      <p>Specifiy value: {specifiyValue}</p>

      <ScCheckbox
        title="Test Check"
        description="une check"
        onChange={setCheckValue}
        value={checkValue}
        required={false}
        options={[
          {
            label: 'Option 1',
            value: 'a',
          },
          {
            label: 'Option 2',
            value: 'b',
            specify: <DetailsSpecifyInput control={controlCheck} name="specifiyCheck" />,
          },
        ]}
      />

      <p>Check value: {checkValue}</p>
      <p>Specifiy check value: {specifiyCheck}</p>

      <div className="border border-gray-500 border-solid p-2 mb-2">
        <h6>Le composant "AccordionInline"</h6>
        <AccordionInline label={"label de l'accordéon"}>Le contenu de l'accordéon</AccordionInline>

        <AccordionInline
          label={
            <span className="bg-purple-100">
              Label plus <span className="font-bold">complexe</span>
            </span>
          }
        >
          <span className="bg-green-100">
            Contenu plus <span className="font-bold">complexe</span>
          </span>
        </AccordionInline>
        <AccordionInline
          label={
            <div className="bg-purple-100">
              Label plus <span className="font-bold">complexe</span> et pas inline
            </div>
          }
        >
          <div className="bg-green-100">
            <p>
              Contenu plus <span className="font-bold">complexe</span> et pas inline
            </p>
            <p>Avec plusieurs lignes</p>
          </div>
        </AccordionInline>
      </div>

      <div className="border border-gray-500 border-solid p-2 mb-2">
        <h6>Le composant "ScAlert"</h6>
        <ScAlert type="info" action="action">
          <p>contenu</p>
          <p>contenu</p>
          <p>contenu</p>
          <p className="mb-0">contenu</p>
        </ScAlert>
        <ScAlert type="success">
          <p className="mb-0">Un message de succès</p>
        </ScAlert>
        <ScAlert type="info">
          <p className="mb-0">Un message d'information</p>
        </ScAlert>
        <ScAlert type="warning">
          <p className="mb-0">Un message de warning</p>
        </ScAlert>
        <ScAlert type="error">
          <p className="mb-0">Un message d'erreur</p>
        </ScAlert>
      </div>
      <div className="border border-gray-500 border-solid p-2 mb-2">
        <h6>Le composant "CompanyRecapFromSearchResult"</h6>
        <CompanyRecapFromSearchResult company={Fixture.genCompanySearchResult()} draft={{tags: []}} />
        <h6>Le composant "CompanyRecapFromSearchResult" sur la shrinkflation</h6>
        <CompanyRecapFromSearchResult company={Fixture.genCompanySearchResult()} draft={{tags: ['Shrinkflation']}} />
        <h6>Le composant "CompanyRecapFromStep2" avec un draft en step2</h6>
        <CompanyRecapFromStep2 draft={Fixture.genDraftReportStep2({random})} />
      </div>
    </>
  )
}

function QuickButtonWithLoader({loading}: {loading: boolean}) {
  return (
    <ButtonWithLoader loading={loading} iconId="fr-icon-search-line">
      Texte du bouton
    </ButtonWithLoader>
  )
}
