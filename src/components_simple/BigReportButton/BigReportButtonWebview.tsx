'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import {sendMessageToReactNative} from 'utils/utils'
import {bigReportButtonProps} from './bigReportButtonConstants'

export function BigReportButtonWebview(props: typeof bigReportButtonProps & {children: string}) {
  return <Button {...props} onClick={() => sendMessageToReactNative('home-start-report')} />
}
