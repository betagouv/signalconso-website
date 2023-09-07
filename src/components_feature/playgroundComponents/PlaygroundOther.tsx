import {ButtonWithLoader} from 'components_simple/Buttons'
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {AccordionInline} from '../../components_simple/AccordionInline'
import {SocialNetworkRow} from '../../components_simple/SocialNetworkRow'
import {Txt} from '../../components_simple/Txt'
import {ScCheckbox} from '../../components_simple/formInputs/ScCheckbox'
import {ScRadioButtons} from '../../components_simple/formInputs/ScRadioButtons'
import {useI18n} from '../../i18n/I18n'
import {DetailsSpecifyInput} from '../reportFlow/Details/DetailsSpecifyInput'
import {ScAlert} from 'components_simple/ScAlert'

export const PlaygroundOther = () => {
  const [radioValue, setRadioValue] = useState<string | undefined>(undefined)
  const [checkValue, setCheckValue] = useState<string[] | undefined>(undefined)
  const {m} = useI18n()
  const {watch, control} = useForm<{specifiyValue: string}>()
  const {watch: watchCheck, control: controlCheck} = useForm<{specifiyCheck: string}>()
  const specifiyValue = watch('specifiyValue')
  const specifiyCheck = watchCheck('specifiyCheck')

  return (
    <>
      <p>Button with loader (aligné plusieurs fois pour vérifier que les différentes versions prennent toujours la même place)</p>

      <div className="flex flex-col">
        <QuickButtonWithLoader loading={true} />
        <QuickButtonWithLoader loading={false} />
        <div>
          <QuickButtonWithLoader loading={true} />
          <QuickButtonWithLoader loading={false} />
        </div>
      </div>
      <hr />

      <p>Radio DSFR</p>

      <ScRadioButtons
        title="Test fieldset"
        description="une desc"
        orientation="vertical"
        onChange={setRadioValue}
        options={[
          {
            label: 'Option 1',
            description: 'Du texte',
            value: 'a',
          },
          {
            label: 'Option 2',
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
                <Txt color="hint" size="small" dangerouslySetInnerHTML={{__html: m.howToFindCompanyCountryDesc}} />
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
        <p>Le composant "AccordionInline"</p>
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
        <p>Le composant "ScAlert"</p>
        <ScAlert type="info" action="action">
          <p>contenu</p>
          <p>contenu</p>
          <p>contenu</p>
          <p>contenu</p>
        </ScAlert>
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
