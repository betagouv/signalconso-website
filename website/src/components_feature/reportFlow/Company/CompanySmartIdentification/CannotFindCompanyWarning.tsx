import {Animate} from '@/components_simple/Animate'
import {FriendlyHelpText} from '@/components_simple/FriendlyHelpText'
import {useI18n} from '@/i18n/I18n'
import Button from '@codegouvfr/react-dsfr/Button'
import Link from 'next/link'

export function CannotFindCompanyWarning({
  onCancel,
  onContinue,
  reportTransmittableToPro,
}: {
  onCancel: () => void
  onContinue: () => void
  reportTransmittableToPro: boolean
}) {
  const {m} = useI18n()
  return (
    <Animate autoScrollTo>
      <div>
        <FriendlyHelpText>
          <p>
            <strong>{m.cannotFindWarning.moreEfficient}</strong>
            {reportTransmittableToPro && <> {m.cannotFindWarning.contactCompany}</>}
          </p>
          <p>
            {m.cannotFindWarning.youCanUse}{' '}
            <Link href={'https://annuaire-entreprises.data.gouv.fr/'} target="_blank">
              {m.cannotFindWarning.annuaireDesEntreprises}
            </Link>
            .
          </p>
          <p>{m.cannotFindWarning.youCanContinue}</p>
          <div className="flex gap-4 justify-between">
            <Button priority="secondary" iconId="ri-arrow-left-line" onClick={onCancel}>
              {m.cannotFindWarning.iTryHarder}
            </Button>
            <Button priority="secondary" iconId="ri-arrow-right-line" iconPosition="right" onClick={onContinue}>
              {m.cannotFindWarning.iReallyCant}
            </Button>
          </div>
        </FriendlyHelpText>
      </div>
    </Animate>
  )
}
