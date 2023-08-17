'use client'

import {useI18n} from '../../i18n/I18n'
import React from 'react'
import {Page} from '../../components_simple/Page/Page'
import {Fender} from '../../alexlibs/mui-extension/Fender/Fender'
import * as Sentry from '@sentry/nextjs'

export default function GlobalError({error, reset}: {error: Error; reset: () => void}) {
  Sentry.captureException(error)
  // Flushing before returning is necessary if deploying to Vercel, see
  // https://vercel.com/docs/platform/limits#streaming-responses
  Sentry.flush(2000)
  return <ErrorContent />
}

function ErrorContent() {
  const {m} = useI18n()
  return (
    <Page>
      <Fender
        icon="error"
        title={m.minimalErrorTitle}
        description={
          <div
            style={{
              marginTop: 30,
              marginBottom: 30,
            }}
            dangerouslySetInnerHTML={{__html: m.minimalErrorText}}
          />
        }
      ></Fender>
    </Page>
  )
}
