import {ContentPageContainer} from 'components_simple/PageContainers'
import {BigReportButton} from 'components_simple/buttons/BigReportButton'
import {BigReportButtonWebView} from 'components_simple/buttons/BigReportButtonWebview'
import {Metadata} from 'next'
import {ReactNode} from 'react'
import {getI18n} from '../i18n/I18nDictionnary'
import {AppLang} from '../i18n/localization/AppLangs'

export function getMetadata(lang: AppLang): Metadata {
  const {messages} = getI18n(lang)

  return {
    title: messages.titleAndDescriptions.commentCaMarche.title,
    description: messages.titleAndDescriptions.commentCaMarche.description,
  }
}

export const CommentCaMarche = ({isWebView, params}: {isWebView: boolean; params: any}) => {
  const {messages: m} = getI18n(params.lang)

  const reportButton = isWebView ? <BigReportButtonWebView /> : <BigReportButton {...{m}} />
  return (
    <>
      <ContentPageContainer>
        <div className="max-w-4xl mx-auto">
          <h1>{m.commentCaMarche.title}</h1>
          <div className="space-y-6">
            <Card img="/image/illustrations/consumer.png" title={m.commentCaMarche.step1.title}>
              <p>{m.commentCaMarche.step1.description1}</p>
              <p>{m.commentCaMarche.step1.description2}</p>
            </Card>
            <Card img="/image/illustrations/report.png" title={m.commentCaMarche.step2.title}>
              <p>{m.commentCaMarche.step2.description1}</p>
              <p className="text-center">{reportButton}</p>
              <p>{m.commentCaMarche.step2.description2}</p>
            </Card>
            <Card img="/image/illustrations/company.png" title={m.commentCaMarche.step3.title}>
              <p>{m.commentCaMarche.step3.description1}</p>
              <p>{m.commentCaMarche.step3.description2}</p>
            </Card>
            <Card img="/image/illustrations/dgccrf.png" title={m.commentCaMarche.step4.title}>
              <p>{m.commentCaMarche.step4.description1}</p>
              <p>{m.commentCaMarche.step4.description2}</p>
            </Card>
            <div className="fr-callout ">
              <h3 className="fr-callout__title">{m.commentCaMarche.callout.title}</h3>
              <p className="fr-callout__text">{m.commentCaMarche.callout.desc}</p>
              <p className="text-center">{reportButton}</p>
            </div>
          </div>
        </div>
      </ContentPageContainer>
    </>
  )
}

const Card = ({title, img, children}: {title: string; img: string; children?: ReactNode}) => {
  return (
    <div>
      <h2 className="fr-h4">{title}</h2>
      <div className="flex flex-col-reverse items-center sm:flex-row">
        <div className="shrink-0">
          <img src={img} alt="" width={200} height={200} />
        </div>
        <div className="ml-2">{children}</div>
      </div>
    </div>
  )
}
