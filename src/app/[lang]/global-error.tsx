'use client'

import {useI18n} from '../../i18n/I18n'
import * as Sentry from '@sentry/nextjs'
import {usePathname} from 'next/navigation'
import {AppLangs, getSupportedLang} from '../../i18n/localization/AppLangs'
import {getI18n} from '../../i18n/I18nDictionnary'
import {getHtmlAttributes} from '@codegouvfr/react-dsfr/next-appdir/getHtmlAttributes'
import MuiSetup from './MuiSetup'
import {DsfrProvider} from '@codegouvfr/react-dsfr/next-appdir/DsfrProvider'
import {Page} from '../../components_simple/Page/Page'
import {LinkBackToHome} from '../../components_simple/LinkBackToHome'
import React from 'react'
import '../../globals.css'

export default async function GlobalError({error, reset}: {error: Error; reset: () => void}) {
  Sentry.captureException(error)
  // Flushing before returning is necessary if deploying to Vercel, see
  // https://vercel.com/docs/platform/limits#streaming-responses
  await Sentry.flush(2000)
  return <ErrorContent />
}

function ErrorContent() {
  const pathname = usePathname()
  const currentPathLang = pathname!.toLowerCase().split('/')[1]
  const lang = getSupportedLang(currentPathLang) ?? AppLangs.fr

  const {messages: m} = getI18n(lang)

  return (
    <html
      {...getHtmlAttributes({defaultColorScheme: 'light', lang: lang})}
      //NOTE: Scrollbar always visible to avoid layout shift when modal are opened
      style={{
        overflow: '-moz-scrollbars-vertical',
        overflowY: 'scroll',
      }}
      lang={lang}
    >
      <body>
        <MuiSetup>
          <DsfrProvider lang={lang}>
            <Page>
              <div className="fr-container my-32">
                <h1>{m.minimalErrorTitle}</h1>
                <p>{m.minimalErrorText}</p>
              </div>
              <LinkBackToHome isWebView={false} lang={lang} />
            </Page>
          </DsfrProvider>
        </MuiSetup>
      </body>
    </html>
  )
}
