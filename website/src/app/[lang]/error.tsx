'use client'

import * as Sentry from '@sentry/nextjs'
import {useI18n} from '../../i18n/I18n'
import {ErrorPageContent} from '@/components_simple/ErrorPageContent'

export default function ErrorPage({error, reset}: {error: Error; reset: () => void}) {
  Sentry.captureException(error)
  // Flushing before returning is necessary if deploying to Vercel, see
  // https://vercel.com/docs/platform/limits#streaming-responses
  Sentry.flush(2000)
  return <ErrorContent />
}

function ErrorContent() {
  const {currentLang} = useI18n()
  return <ErrorPageContent lang={currentLang} />
}
