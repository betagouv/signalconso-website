import {I18nMessages} from '@/i18n/I18nDictionnary'

export const bigReportButtonProps = {
  iconId: 'ri-mail-send-line',
  size: 'large',
} as const

export function getBigReportButtonText(m: I18nMessages) {
  return m.landing.bigReportButton
}
