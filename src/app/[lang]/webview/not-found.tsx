'use client'
import {LinkBackToHome} from '../../../components_simple/LinkBackToHome'
import {Page} from '../../../components_simple/Page/Page'
import {Fender} from '../../../alexlibs/mui-extension/Fender/Fender'
import {useI18n} from '../../../i18n/I18n'

// No metadata here, not available yet https://github.com/vercel/next.js/issues/45620
export default function NotFound() {
  const {m} = useI18n()
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
        <LinkBackToHome isWebView={true} />
      </Fender>
    </Page>
  )
}
