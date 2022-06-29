import {Alert} from '../../alexlibs/mui-extension'
import {useConfig} from 'core/context/ConfigContext'
import {useWindowWidth} from '../../core/useWindowWidth'

export const InfoBanner = () => {
  const config = useConfig().config
  const {isMobileWidthMax} = useWindowWidth()

  return (config.infoBannerOnMobile || !isMobileWidthMax) && config.infoBanner ? (
    <Alert type="warning" className="blog" dangerouslySetInnerHTML={{__html: config.infoBanner}} />
  ) : (
    <></>
  )
}
