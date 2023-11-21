'use client'
import {DsfrProvider} from '@codegouvfr/react-dsfr/next-appdir/DsfrProvider'
import {usePathname} from 'next/navigation'
import {LinkBackToHome} from '../../components_simple/LinkBackToHome'
import '../../globals.css'
import {getI18n} from '../../i18n/I18nDictionnary'
import {AppLangs, getSupportedLang} from '../../i18n/localization/AppLangs'
import ThemeSetup from './ThemeSetup'

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
        <main role="main" id="main-content">
          <div className="fr-container">
            <div className="py-20 max-w-md mx-auto">
              <h1>{m.pageNotFoundTitle}</h1>
              <p>{m.pageNotFoundDesc}</p>
              <LinkBackToHome isWebView={isWebView} lang={lang} />
            </div>
          </div>
        </main>
      </DsfrProvider>
    </ThemeSetup>
  )
}
