'use client'
import {LinkBackToHome} from '../../components_simple/LinkBackToHome'
import {Page} from '../../components_simple/Page/Page'
import {usePathname} from 'next/navigation'
import {getI18n} from '../../i18n/I18nDictionnary'
import {AppLangs, getSupportedLang} from '../../i18n/localization/AppLangs'
import MuiSetup from './MuiSetup'
import '../../globals.css'
import React from 'react'
import {getHtmlAttributes} from '@codegouvfr/react-dsfr/next-appdir/getHtmlAttributes'
import {DsfrProvider} from '@codegouvfr/react-dsfr/next-appdir/DsfrProvider'
import {Fender} from '../../alexlibs/mui-extension/Fender/Fender'

// No metadata here, not available yet https://github.com/vercel/next.js/issues/45620
export default function NotFound() {
  const pathname = usePathname()
  const currentPathLang = pathname!.toLowerCase().split('/')[1]
  const lang = getSupportedLang(currentPathLang) ?? AppLangs.fr

  const {messages: m} = getI18n(lang)

  return (
    // <html
    //   {...getHtmlAttributes({defaultColorScheme: 'light', lang: lang})}
    //   //NOTE: Scrollbar always visible to avoid layout shift when modal are opened
    //   style={{
    //     overflow: '-moz-scrollbars-vertical',
    //     overflowY: 'scroll',
    //   }}
    //   lang={lang}
    // >
    //   <body>
    <MuiSetup>
      <DsfrProvider lang={lang}>
        <Page>
          <Fender
            icon="pan_tool"
            title={m.pageNotFoundTitle}
            description={
              <div
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                }}
                dangerouslySetInnerHTML={{__html: m.pageNotFoundDesc}}
              />
            }
          >
            <LinkBackToHome isWebView={false} lang={lang} />
          </Fender>
        </Page>
      </DsfrProvider>
    </MuiSetup>
    //   </body>
    // </html>
  )
}
