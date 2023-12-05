import {Alert} from '@codegouvfr/react-dsfr/Alert'
import {appConfig} from '@/core/appConfig'
import Link from 'next/link'

export const MobileAppPromoBanner = () => {
  // Do not include this banner if we have the other one
  if (appConfig.infoBanner) {
    return null
  }
  return (
    <Alert
      description={
        <>
          Téléchargez notre application mobile <Link href="https://apps.apple.com/fr/app/signalconso/id6447964093">pour iOS</Link>{' '}
          ou <Link href="https://play.google.com/store/apps/details?id=com.signalconso.signalconso">pour Android</Link>.
        </>
      }
      severity={'info'}
      title="Mettez SignalConso dans votre poche !"
      className="fr-mt-4w md:hidden"
    />
  )
}
