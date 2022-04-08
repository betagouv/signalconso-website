import {Alert} from 'mui-extension'
import {useConfig} from 'core/context/ConfigContext'


export const InfoBanner = () => {
  const config = useConfig().config

  return config.infoBanner ? (
    <Alert type="warning" className="blog" dangerouslySetInnerHTML={{__html: config.infoBanner}}/>
  ) : <></>
}

