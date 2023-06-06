import Button from '@codegouvfr/react-dsfr/Button'
import {buildLinkHomePickCategory} from 'core/pagesDefinitions'
import {getI18n} from 'i18n/I18nDictionnary'
import {BigReportButtonWebview} from './BigReportButtonWebview'
import {bigReportButtonProps} from './bigReportButtonConstants'

export function BigReportButton({isWebView}: {isWebView: boolean}) {
  const {messages: m} = getI18n('fr')
  const props = {
    ...bigReportButtonProps,
    children: m.landing.bigReportButton,
  } as const
  if (isWebView) {
    return <BigReportButtonWebview {...props} />
  }
  return (
    <Button
      {...props}
      linkProps={{
        href: buildLinkHomePickCategory(),
      }}
    />
  )
}
