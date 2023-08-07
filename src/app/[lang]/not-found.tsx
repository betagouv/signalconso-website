'use client'
import {Fender} from 'alexlibs/mui-extension/Fender/Fender'
import {LinkBackToHome} from '../../components_simple/LinkBackToHome'
import {Page} from '../../components_simple/Page/Page'
import {usePathname} from 'next/navigation'
import {getI18n} from '../../i18n/I18nDictionnary'
import {AppLangs, getSupportedLang} from '../../i18n/localization/AppLangs'

// No metadata here, not available yet https://github.com/vercel/next.js/issues/45620

export default function NotFound() {
  const pathname = usePathname()
  const currentPathLang = pathname!.toLowerCase().split('/')[1]
  const lang = getSupportedLang(currentPathLang) ?? AppLangs.fr

  const {messages: m} = getI18n(lang)

  return (
    <Page>
      <Fender
        icon="pan_tool"
        title={m.pageNotFoundTitle}
        description={
          <div
            style={{
              marginTop: 1,
            }}
            dangerouslySetInnerHTML={{__html: m.pageNotFoundDesc}}
          />
        }
      >
        <LinkBackToHome isWebView={false} lang={lang} />
      </Fender>
    </Page>
  )
}
