import {ContentPageContainer} from 'components_simple/ContentPageContainer'
import {titleAndDescriptions} from 'core/titleAndDescriptions'
import {newsArticlesData} from 'news/newsArticlesData'
import Head from 'next/head'
import {Card} from '@codegouvfr/react-dsfr/Card'
import {buildLinkNewsArticle} from 'core/pagesDefinitions'

const PlanDuSite = () => {
  return (
    <>
      <Head>
        <title>{titleAndDescriptions.news.title}</title>
        <meta name="description" content={titleAndDescriptions.news.description} />
      </Head>
      <ContentPageContainer>
        <h1>Actualités</h1>
        <p>{titleAndDescriptions.news.description}</p>
        <div className="fr-grid-row fr-grid-row--gutters">
          {newsArticlesData.map(article => {
            return (
              <div className="fr-col-12 fr-col-sm-6" key={article.slug}>
                <Card
                  title={article.title}
                  desc={article.excerpt.slice(0, 200) + '...'}
                  linkProps={{
                    href: buildLinkNewsArticle(article),
                  }}
                  enlargeLink
                  detail={article.date}
                />
              </div>
            )
          })}
        </div>
      </ContentPageContainer>
    </>
  )
}

export default PlanDuSite
