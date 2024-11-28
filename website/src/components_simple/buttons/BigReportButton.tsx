import {buildLinkHomePickCategory} from '@/core/buildLinks'
import {I18nMessages} from '@/i18n/I18nDictionnary'
import Button from '@codegouvfr/react-dsfr/Button'
import {bigReportButtonProps, getBigReportButtonText} from './buttonsUtils'

export function BigReportButton({m}: {m: I18nMessages}) {
  return (
    <Button
      {...bigReportButtonProps}
      linkProps={{
        href: buildLinkHomePickCategory(),
      }}
    >
      {getBigReportButtonText(m)}
    </Button>
  )
}
