import {Button} from '@codegouvfr/react-dsfr/Button'
import {ButtonWithLoader} from 'components_simple/Buttons'
import {ScRichRadio} from 'components_simple/RadioGroup/ScRichRadio'
import {useState} from 'react'

export const PlaygroundOther = () => {
  const [value, setValue] = useState<'first' | 'second' | 'third' | undefined>()
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
      <ScRichRadio
        title="Votre choix"
        titleDesc="Un peu de texte additionnel"
        onChange={setValue}
        options={[
          {
            label: 'Première option',
            description: 'Description illustrant la première option avec des exemples',
            value: 'first',
          },
          {
            label: 'Seconde option',
            description: 'Autre petite description',
            value: 'second',
            needToSpecify: true,
          },
          {
            label: 'Troisième option',
            value: 'third',
          },
        ]}
        value={value}
        // errorMessage="Texte d’erreur obligatoire"
      />
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
