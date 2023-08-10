import {Button} from '@codegouvfr/react-dsfr/Button'
import {ButtonWithLoader} from 'components_simple/Buttons'
import React, {useState} from 'react'
import RadioButtons from '@codegouvfr/react-dsfr/RadioButtons'
import {SocialNetworkRow} from '../../components_simple/SocialNetworkRow/SocialNetworkRow'
import {ScRadioButtons} from '../../components_simple/RadioGroup/ScRadioButtons'
import {Txt} from '../../alexlibs/mui-extension/Txt/Txt'
import {AccordionInline} from '../../components_simple/AccordionInline/AccordionInline'
import {useI18n} from '../../i18n/I18n'
import {DetailsSpecifyInput} from '../Report/Details/DetailsSpecifyInput'
import {SpecifyFormUtils} from '../Report/Details/Details'
import {useForm} from 'react-hook-form'
import {ScCheckbox} from '../../components_simple/RadioGroup/ScCheckbox'

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
              <AccordionInline label={m.companyHowToFindCountry} onClick={e => e.stopPropagation()}>
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
