'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import {useI18n} from '@/i18n/I18n'
import {sendMessageToReactNative} from '@/utils/utils'
import {bigReportButtonProps, getBigReportButtonText} from './buttonsUtils'

// this one needs "use client", that's why they are on small distinct files
export function BigReportButtonWebView() {
  const {m} = useI18n()
  return (
    <Button {...bigReportButtonProps} onClick={() => sendMessageToReactNative('home-start-report')}>
      {getBigReportButtonText(m)}
    </Button>
  )
}
