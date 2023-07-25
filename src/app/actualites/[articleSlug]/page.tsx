import {ContentPageContainer} from 'components_simple/PageContainers'
import {pagesDefs} from 'core/pagesDefinitions'
import {newsArticlesData} from 'actualites/newsArticlesData'
import {Metadata} from 'next'
import Link from 'next/link'
import {isoToFrenchFormatText} from 'utils/utils'

type Props = {
  articleSlug: string
}

function getArticleData(params: Props) {
  const article = newsArticlesData.find(_ => _.slug === params.articleSlug)
  if (!article) {
    throw new Error(`Unknown article ${params.articleSlug}`)
  }
  return article
}

export function generateMetadata(props: {params: Props}): Metadata {
  const article = getArticleData(props.params)

  return {
    title: article.title,
    description: article.excerpt,
  }
}

export default function News(props: {params: Props}) {
  const article = getArticleData(props.params)
  return (
    <ContentPageContainer>
      <p>
        <span className="ri-arrow-left-line" aria-hidden="true"></span> <Link href={pagesDefs.actualites.url}>Actualités</Link>
      </p>
      <h1>{article.title}</h1>
      <p>
        <span className="text-gray-500 text-sm">le {isoToFrenchFormatText(article.date)}</span>
      </p>
      <article.content />
    </ContentPageContainer>
  )
}
