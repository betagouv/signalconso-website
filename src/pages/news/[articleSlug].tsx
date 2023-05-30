import {ContentPageContainer} from 'components_simple/ContentPageContainer'
import {pagesDefs} from 'core/pagesDefinitions'
import {newsArticlesData} from 'news/newsArticlesData'
import {GetStaticPaths, GetStaticProps} from 'next'
import Head from 'next/head'
import Link from 'next/link'
import {isoToFrenchFormat} from 'utils/utils'

export const getStaticPaths: GetStaticPaths = () => {
  const paths = newsArticlesData.map(_ => ({
    params: {articleSlug: _.slug},
  }))
  return {
    paths,
    fallback: false,
  }
}

type Props = {
  articleSlug: string
}

export const getStaticProps: GetStaticProps<Props> = async context => {
  const articleSlug = context.params?.articleSlug
  if (typeof articleSlug !== 'string') {
    throw new Error(`Missing articleSlug in context`)
  }
  return {
    props: {
      articleSlug,
    },
  }
}

export default function LandingPage({articleSlug}: Props) {
  const article = newsArticlesData.find(_ => _.slug === articleSlug)
  if (!article) {
    throw new Error(`Unknown article ${articleSlug}`)
  }
  return (
    <>
      <Head>
        <title>{article.title}</title>
        <meta name="description" content={article.excerpt} />
      </Head>
      <ContentPageContainer>
        <p>
          <span className="ri-arrow-left-line" aria-hidden="true"></span> <Link href={pagesDefs.news.url}>Actualités</Link>
        </p>
        <h1>{article.title}</h1>
        <p>
          <span className="text-gray-500 text-sm">{isoToFrenchFormat(article.date)}</span>
        </p>
        <article.content />
      </ContentPageContainer>
    </>
  )
}
