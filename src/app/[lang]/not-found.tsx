'use client'
import {LinkBackToHome} from '../../components_simple/LinkBackToHome'
import {Page} from '../../components_simple/Page'
import {usePathname} from 'next/navigation'
import {getI18n} from '../../i18n/I18nDictionnary'
import {AppLangs, getSupportedLang} from '../../i18n/localization/AppLangs'
import ThemeSetup from './ThemeSetup'
import '../../globals.css'
import React from 'react'
import {DsfrProvider} from '@codegouvfr/react-dsfr/next-appdir/DsfrProvider'
import {Fender} from '../../components_simple/Fender'

// No metadata here, not available yet https://github.com/vercel/next.js/issues/45620
export default function NotFound() {
  const pathname = usePathname()
  const currentPathLang = pathname!.toLowerCase().split('/')[1]
  const lang = getSupportedLang(currentPathLang) ?? AppLangs.fr

  const isWebView = pathname.includes('/webview/')
  const {messages: m} = getI18n(lang)

  return (
    <ThemeSetup>
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
            <LinkBackToHome isWebView={isWebView} lang={lang} />
          </Fender>
        </Page>
      </DsfrProvider>
    </ThemeSetup>
  )
}
