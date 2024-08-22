import {Animate} from '@/components_simple/Animate'
import {FriendlyHelpText} from '@/components_simple/FriendlyHelpText'
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
  return (
    <Animate autoScrollTo>
      <div>
        <FriendlyHelpText>
          <p>
            <strong>
              SignalConso est plus efficace lorsque vous identifiez l'entreprise avec laquelle vous avez un différend.
            </strong>
            {reportTransmittableToPro && (
              <> Cela nous permet de la contacter directement pour qu'elle puisse vous répondre rapidement.</>
            )}
          </p>
          <p>
            Si vous avez besoin d'un outil de recherche plus avancé, vous pouvez utiliser{' '}
            <Link href={'https://annuaire-entreprises.data.gouv.fr/'} target="_blank">
              L'Annuaire des Entreprises
            </Link>
            .
          </p>
          <p>
            Si malgré vos efforts, vous ne parvenez pas à identifier l'entreprise, vous pouvez tout de même poursuivre votre
            signalement. Il sera transmis aux agents de la répression des fraudes, qui feront de leur mieux pour le traiter.
            Toutefois, les chances de succès seront significativement réduites sans l'identification précise de l'entreprise.
          </p>
          <div className="flex gap-4 justify-between">
            <Button priority="secondary" iconId="ri-arrow-left-line" onClick={onCancel}>
              Je vais chercher un peu plus
            </Button>
            <Button priority="secondary" iconId="ri-arrow-right-line" iconPosition="right" onClick={onContinue}>
              Je ne peux vraiment pas identifier l'entreprise
            </Button>
          </div>
        </FriendlyHelpText>
      </div>
    </Animate>
  )
}
