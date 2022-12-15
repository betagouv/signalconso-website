import {Alert} from '../../alexlibs/mui-extension'
import {useConfig} from 'context/ConfigContext'
import {useWindowWidth} from '../../hooks/useWindowWidth'

export const InfoBanner = () => {
  const config = useConfig().config
  const {isMobileWidthMax} = useWindowWidth()

  return (config.infoBannerOnMobile || !isMobileWidthMax) && config.infoBanner ? (
    <Alert type="warning" className="blog" dangerouslySetInnerHTML={{__html: config.infoBanner}} />
  ) : (
    <></>
  )
}
