import {useConfig} from 'context/ConfigContext'
import {Alert} from '../../alexlibs/mui-extension/Alert/Alert'

export const InfoBanner = () => {
  const config = useConfig().config

  return config.infoBanner ? (
    <Alert type="warning" className="blog" dangerouslySetInnerHTML={{__html: config.infoBanner}} />
  ) : (
    <></>
  )
}
