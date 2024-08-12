import {ScCheckboxes} from '@/components_simple/formInputs/ScCheckboxes'
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
        helperText="Entreprises françaises uniquement"
        label="Rechercher une entreprise"
        placeholder="Nom, ou numéro SIRET/SIREN, ou numéro RCS, ..."
        onBlur={() => {}}
        onChange={() => {}}
      />
      <ScCheckboxes
        title="Title checkbox"
        description="une description"
        onChange={() => {}}
        value={['a']}
        required={false}
        options={[
          {
            label: 'Option 1',
            value: 'a',
          },
        ]}
      />
    </div>
  )
}
