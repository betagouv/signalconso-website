import {SocialNetworks} from '../../anomalies/Anomaly'
import {Txt} from '../../alexlibs/mui-extension/Txt/Txt'
import {Row} from '../Row/Row'
import {useI18n} from '../../i18n/I18n'

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
}

export const SocialNetworkRow = ({socialNetwork}: Props) => {
  const {m} = useI18n()
  return (
    <Row dense icon={socialNetworkIcon(socialNetwork)}>
      <Txt color="hint">{m.SocialNetwork[socialNetwork]}</Txt>
    </Row>
  )
}
