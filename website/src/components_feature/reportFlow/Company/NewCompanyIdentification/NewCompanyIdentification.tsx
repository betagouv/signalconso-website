import {ButtonWithLoader} from '@/components_simple/buttons/Buttons'
import {ScAutocompletePostcode} from '@/components_simple/formInputs/ScAutocompletePostcode'
import {ScCheckbox} from '@/components_simple/formInputs/ScCheckbox'
import {ScTextInput} from '@/components_simple/formInputs/ScTextInput'
import {Report} from '@/model/Report'
import {CommonCompanyIdentification} from '@/model/Step2Model'
import Button from '@codegouvfr/react-dsfr/Button'
import {useState} from 'react'
import {PartialReport} from '../../ReportFlowContext'

export function NewCompanyIdentification({
  draft,
  onIdentification,
}: {
  draft: PartialReport & Pick<Report, 'step0' | 'step1'>
  onIdentification: (_: CommonCompanyIdentification) => void
}) {
  const [geographicalRestriction, setGeographicalRestriction] = useState(false)
  return (
    <div>
      <h2 className="fr-h6">Rechercher une entreprise</h2>
      <ScTextInput
        error={false}
        name="name"
        required
        autocomplete="autocompletion"
        desc="Entreprises françaises uniquement"
        // helperText="Entreprises françaises uniquement"
        label="Nom ou identifiant de l'entreprise"
        placeholder="Nom, n° SIRET/SIREN, n° RCS..."
        onBlur={() => {}}
        onChange={() => {}}
      />
      <div className={` ${geographicalRestriction ? 'p-4 pb-1 mb-4 border border-solid border-gray-300' : ''}`}>
        <ScCheckbox
          label="Restreindre la recherche à un département ou code postal"
          onChange={v => {
            setGeographicalRestriction(v)
          }}
          value={geographicalRestriction}
          required={true}
        />
        {geographicalRestriction && (
          <div className="max-w-lg">
            <ScAutocompletePostcode
              error={false}
              label="Département ou code postal"
              name="foobar"
              onBlur={() => {}}
              onChange={() => {}}
              // helperText="helper text"
            />
          </div>
        )}
      </div>
      <div className="flex justify-end gap-4">
        {/* <Button onClick={() => {}} priority="tertiary no outline" iconId="fr-icon-question-line">
          Je ne trouve pas l'entreprise
        </Button>
        <Button onClick={() => {}} priority="tertiary no outline" iconId="ri-earth-line">
          Elle est à l'étranger
        </Button> */}
        {/* <ButtonWithLoader iconId={'fr-icon-search-line'} onClick={() => {}} className="" disabled={false} loading={false}>
          Je lance la recherche
        </ButtonWithLoader> */}
      </div>
      <div className="flex flex-col items-center gap-2">
        <ButtonWithLoader iconId={'fr-icon-search-line'} onClick={() => {}} loading={false}>
          Je lance la recherche
        </ButtonWithLoader>
        <div className="flex flex-col">
          <Button onClick={() => {}} priority="tertiary no outline" iconId="ri-arrow-right-line">
            Je ne trouve pas / ne connais pas l'entreprise...
          </Button>
          <Button onClick={() => {}} priority="tertiary no outline" iconId="ri-arrow-right-line">
            L'entreprise est à l'étranger
          </Button>
        </div>
      </div>
    </div>
  )
}
