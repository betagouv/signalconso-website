import {appConfig} from '@/core/appConfig'
import Link from 'next/link'
import {FriendlyHelpText} from '../FriendlyHelpText'

export const iosAppUrl = 'https://apps.apple.com/fr/app/signalconso/id6447964093'
export const androidAppUrl = 'https://play.google.com/store/apps/details?id=com.signalconso.signalconso'

export const MobileAppPromoBanner = () => {
  // Do not include this banner if we have the other one
  if (appConfig.infoBanner) {
    return null
  }
  return (
    <div className="md:hidden">
      <FriendlyHelpText margins={false}>
        <>
          Mettez SignalConso dans votre poche ! Téléchargez notre application mobile <Link href={iosAppUrl}>pour iOS</Link> ou{' '}
          <Link href={androidAppUrl}>pour Android</Link>.
        </>
      </FriendlyHelpText>
    </div>
  )
}
