import Image from 'next/image'
import {SocialNetworks} from '../anomalies/Anomaly'
import {useI18n} from '../i18n/I18n'

const socialNetworkIcon = (socialNetwork: SocialNetworks) => {
  switch (socialNetwork) {
    case 'YOUTUBE':
      return 'youtube'
    case 'FACEBOOK':
      return 'facebook'
    case 'INSTAGRAM':
      return 'instagram'
    case 'TIKTOK':
      return 'tiktok'
    case 'TWITTER':
      return 'twitter'
    case 'LINKEDIN':
      return 'linkedin'
    case 'SNAPCHAT':
      return 'snapchat'
    case 'TWITCH':
      return 'twitch'
    case 'OTHER':
      return null
  }
}

interface Props {
  socialNetwork: SocialNetworks
  gray?: boolean
  className?: string
}

export function SocialNetworkRow({socialNetwork, gray, className = ''}: Props) {
  const {m} = useI18n()
  const icon = socialNetworkIcon(socialNetwork)
  const src = icon && `/icons/${icon}.svg`
  return (
    <div className={`flex gap-2 pl-1 ${className}`}>
      {src && <Image src={src} width={24} height={24} alt="" />}
      <span className={gray ? 'text-gray-500' : ''}>{m.SocialNetwork[socialNetwork]}</span>
    </div>
  )
}
