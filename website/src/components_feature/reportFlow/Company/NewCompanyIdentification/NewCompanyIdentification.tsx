import {ButtonWithLoader} from '@/components_simple/buttons/Buttons'
import {ScCheckbox} from '@/components_simple/formInputs/ScCheckbox'
import {ScTextInput} from '@/components_simple/formInputs/ScTextInput'
import {Report} from '@/model/Report'
import {CommonCompanyIdentification} from '@/model/Step2Model'
import {PartialReport} from '../../ReportFlowContext'

export function NewCompanyIdentification({
  draft,
  onIdentification,
}: {
  draft: PartialReport & Pick<Report, 'step0' | 'step1'>
  onIdentification: (_: CommonCompanyIdentification) => void
}) {
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
        label="Rechercher une entreprise"
        placeholder="Nom, ou numéro SIRET/SIREN, ou numéro RCS, ..."
        onBlur={() => {}}
        onChange={() => {}}
      />
      <ScCheckbox
        label="Restreindre la recherche à un département ou code postal"
        onChange={() => {}}
        value={false}
        required={true}
      />
      <div className="flex justify-end">
        <ButtonWithLoader
          iconId={'fr-icon-search-line'}
          onClick={() => {}}
          className="stepper-next-button"
          disabled={false}
          loading={false}
        >
          Rechercher
        </ButtonWithLoader>
      </div>
    </div>
  )
}
