import {Metadata} from 'next'
import {LinkBackToHome} from '../../components_simple/LinkBackToHome'
import {Page} from '../../components_simple/Page/Page'
import {Fender} from '../../alexlibs/mui-extension/Fender/Fender'
import {getI18n} from '../../i18n/I18nDictionnary'

const genMetadata = () => {
  const {messages: m} = getI18n('fr')
  return {
    title: m.pageNotFoundHeadTitle,
    description: m.pageNotFoundTitle,
  }
}

export const metadata: Metadata = genMetadata()

export default function NotFound() {
  const {messages: m} = getI18n('fr')
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
