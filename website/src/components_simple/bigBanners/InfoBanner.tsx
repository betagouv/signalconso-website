import {Alert} from '@codegouvfr/react-dsfr/Alert'
import {appConfig} from '@/core/appConfig'

export const InfoBanner = () => {
  if (appConfig.infoBanner) {
    return (
      <Alert
        description={<span dangerouslySetInnerHTML={{__html: appConfig.infoBanner}} />}
        severity={appConfig.infoBannerSeverity}
        title={<></>}
        className="fr-mt-4w"
      />
    )
  }
  return null
}
