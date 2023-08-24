import {ContentPageContainer} from 'components_simple/PageContainers'
import {pagesDefs} from 'core/pagesDefinitions'
import {newsArticlesData, NewsArticle} from 'components_feature/actualites/newsArticlesData'
import {Metadata} from 'next'
import Link from 'next/link'
import {isoToHumanReadableText} from 'utils/utils'
import {notFound} from 'next/navigation'
import {AppLang} from '../../../../i18n/localization/AppLangs'
import {getI18n} from '../../../../i18n/I18nDictionnary'

type Props = {
  articleSlug: string
  lang: AppLang
}

function getArticleData(params: Props) {
  return newsArticlesData.find(_ => _.slug === params.articleSlug && params.lang === _.lang)
}

export function generateMetadata(props: {params: Props}): Metadata {
  const article = getArticleData(props.params)

  return article
    ? {
        title: article.title,
        description: article.excerpt,
      }
    : {}
}

export default function News(props: {params: Props}) {
  const article: NewsArticle | undefined = getArticleData(props.params)

  return article ? <NewsArticle article={article} lang={props.params.lang} /> : notFound()
}

function NewsArticle(props: {article: NewsArticle; lang: AppLang}) {
  const {messages} = getI18n(props.lang)
  return (
    <ContentPageContainer>
      <p>
        <span className="ri-arrow-left-line" aria-hidden="true"></span>{' '}
        <Link href={pagesDefs.actualites.url}>{messages.planDuSite.newsSection}</Link>
      </p>
      <h1>{props.article.title}</h1>
      <p>
        <span className="text-gray-500 text-sm"> {isoToHumanReadableText(props.article.date, props.lang)}</span>
      </p>
      <props.article.content />
    </ContentPageContainer>
  )
}
