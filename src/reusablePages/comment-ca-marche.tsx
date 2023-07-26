import {ContentPageContainer} from 'components_simple/ContentPageContainer'
import Image from 'next/image'
import {ReactNode} from 'react'
import {getI18n} from '../i18n/I18nDictionnary'
import {Metadata} from 'next'

export function getMetadata(): Metadata {
  const {messages} = getI18n('fr')

  return {
    title: messages.titleAndDescriptions.commentCaMarche.title,
    description: messages.titleAndDescriptions.commentCaMarche.description,
  }
}

export const CommentCaMarche = () => {
  const {messages} = getI18n('fr')

  return (
    <>
      <ContentPageContainer>
        <h1>{messages.commentCaMarche.title}</h1>
        <div className="space-y-6">
          <Card img="/image/illustrations/consumer.png" title={messages.commentCaMarche.step1.title}>
            <p>{messages.commentCaMarche.step1.description1}</p>
            <p>{messages.commentCaMarche.step1.description2}</p>
          </Card>
          <Card img="/image/illustrations/report.png" title={messages.commentCaMarche.step2.title}>
            <p>{messages.commentCaMarche.step2.description1}</p>
            <p>{messages.commentCaMarche.step2.description2}</p>
          </Card>
          <Card img="/image/illustrations/company.png" title={messages.commentCaMarche.step3.title}>
            <p>{messages.commentCaMarche.step3.description1}</p>
            <p>{messages.commentCaMarche.step3.description2}</p>
          </Card>
          <Card img="/image/illustrations/dgccrf.png" title={messages.commentCaMarche.step4.title}>
            <p>{messages.commentCaMarche.step4.description1}</p>
            <p>{messages.commentCaMarche.step4.description2}</p>
          </Card>
        </div>
      </ContentPageContainer>
    </>
  )
}

const Card = ({title, img, children}: {title: string; img: string; children?: ReactNode}) => {
  return (
    <div className="flex flex-col-reverse items-center sm:flex-row">
      <div className="mr-2">
        <h2 className="fr-h4">{title}</h2>
        {children}
      </div>
      <div className="shrink-0">
        <img src={img} alt="" width={200} height={200} />
      </div>
    </div>
  )
}
