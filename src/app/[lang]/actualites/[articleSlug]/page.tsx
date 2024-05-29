import {getArticleContent} from '@/components_feature/actualites/getArticleContent'
import {NewsArticle, getNewsArticleData} from '@/components_feature/actualites/newsArticlesData'
import {ContentPageContainer} from '@/components_simple/PageContainers'
import {GenerateMetadataArg, PageComponentProps, PathParams} from '@/core/metadatas'
import {pagesDefs} from '@/core/pagesDefinitions'
import {isoToHumanReadableText} from '@/utils/utils'
import {Metadata} from 'next'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import {getI18n} from '../../../../i18n/I18nDictionnary'
import {AppLang} from '../../../../i18n/localization/AppLangs'

type LocalPathParams = PathParams<{
  articleSlug: string
}>

function getArticleData(params: LocalPathParams) {
  return getNewsArticleData().find(_ => _.slug === params.articleSlug && params.lang === _.lang)
}

export function generateMetadata(props: GenerateMetadataArg<LocalPathParams>): Metadata {
  const article = getArticleData(props.params)
  return article
    ? {
        title: article.title,
        description: article.excerpt,
      }
    : {}
}

export default function Page(props: PageComponentProps<LocalPathParams>) {
  const article: NewsArticle | undefined = getArticleData(props.params)
  return article ? <NewsArticleComponent article={article} lang={props.params.lang} /> : notFound()
}

function NewsArticleComponent(props: {article: NewsArticle; lang: AppLang}) {
  const {messages} = getI18n(props.lang)
  const ArticleContent = getArticleContent(props.article.slug)
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
      <ArticleContent />
    </ContentPageContainer>
  )
}
