import {ContentPageContainer} from '@/components_simple/PageContainers'
import {BigReportButton} from '@/components_simple/buttons/BigReportButton'
import {BigReportButtonWebView} from '@/components_simple/buttons/BigReportButtonWebview'
import {ReactNode} from 'react'
import {getI18n} from '../i18n/I18nDictionnary'
import {AppLangs} from '@/i18n/localization/AppLangs'
import imgConsumer from '@/img/illustrations/consumer.png'
import imgReport from '@/img/illustrations/report.png'
import imgCompany from '@/img/illustrations/company.png'
import imgDgccrf from '@/img/illustrations/dgccrf.png'
import Image, {StaticImageData} from 'next/image'

export const CommentCaMarche = ({isWebView, lang}: {isWebView: boolean; lang: AppLangs}) => {
  const {messages: m} = getI18n(lang)

  const reportButton = isWebView ? <BigReportButtonWebView /> : <BigReportButton {...{m}} />
  return (
    <>
      <ContentPageContainer>
        <div className="max-w-4xl mx-auto">
          <h1>{m.commentCaMarche.title}</h1>
          <div className="space-y-6">
            <Card
              img={imgConsumer}
              title="1. Votre signalement est envoyé à la fois à la répression des fraudes, et à l'entreprise."
            >
              <p>L'entreprise est alors invitée à vous répondre et prendre action pour s'améliorer et résoudre votre problème.</p>
              <p>{m.commentCaMarche.step1.description2}</p>
            </Card>
            <Card img={imgReport} title={m.commentCaMarche.step2.title}>
              <p>{m.commentCaMarche.step2.description1}</p>
              <p className="text-center">{reportButton}</p>
              <p>{m.commentCaMarche.step2.description2}</p>
            </Card>
            <Card img={imgCompany} title={m.commentCaMarche.step3.title}>
              <p>{m.commentCaMarche.step3.description1}</p>
              <p>{m.commentCaMarche.step3.description2}</p>
            </Card>
            <Card img={imgDgccrf} title={m.commentCaMarche.step4.title}>
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

const Card = ({title, img, children}: {title: string; img: StaticImageData; children?: ReactNode}) => {
  return (
    <div>
      <h2 className="text-lg">{title}</h2>
      <div className="flex flex-col-reverse items-center sm:flex-row">
        <div className="shrink-0">
          <Image src={img} alt="" width={200} height={200} />
        </div>
        <div className="ml-2">{children}</div>
      </div>
    </div>
  )
}
