import {SocialNetworks} from '../../anomalies/Anomaly'
import {Txt} from '../../alexlibs/mui-extension/Txt/Txt'
import {Row} from '../Row/Row'
import {useI18n} from '../../i18n/I18n'
import Image from 'next/image'

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
  }
}

interface Props {
  socialNetwork: SocialNetworks
  color?: 'primary' | 'secondary' | 'disabled' | 'hint' | 'default' | 'error'
}

export const SocialNetworkRow = ({socialNetwork, color}: Props) => {
  const {m} = useI18n()
  const src = `/icons/${socialNetworkIcon(socialNetwork)}.svg`
  return (
    <Row dense icon={<Image src={src} width={24} height={24} />}>
      <Txt color={color}>{m.SocialNetwork[socialNetwork]}</Txt>
    </Row>
  )
}
