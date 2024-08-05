import {getArticleContent} from '@/components_feature/actualites/getArticleContent'
import {NewsArticle, getNewsArticleData} from '@/components_feature/actualites/newsArticlesData'
import {FullWidthPageContainer} from '@/components_simple/PageContainers'
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
  const {title2} = props.article
  return (
    <FullWidthPageContainer>
      <div className="bg-sclightpurple">
        <div className="fr-container bg-white sm:bg-transparent">
          <div className="sm:max-w-4xl mx-auto pt-8 pb-8 sm:px-8 sm:bg-white">
            <div className="flex justify-between">
              <p>
                <span className="ri-arrow-left-line" aria-hidden="true"></span>{' '}
                <Link href={pagesDefs.actualites.url}>{messages.planDuSite.newsSection}</Link>
              </p>
              <p>
                <span className=" text-sm"> {isoToHumanReadableText(props.article.date, props.lang)}</span>
              </p>
            </div>
            <h1 className={`fr-h2 ${title2 ? '!mb-2' : ''}`}>{props.article.title}</h1>
            {title2 && <h2 className="fr-h6 ">{title2}</h2>}
            <ArticleContent />
          </div>
        </div>
      </div>
    </FullWidthPageContainer>
  )
}