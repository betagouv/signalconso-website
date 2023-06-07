import {ContentPageContainer} from 'components_simple/ContentPageContainer'
import {titleAndDescriptions} from 'core/titleAndDescriptions'
import {newsArticlesData} from 'actualites/newsArticlesData'
import Head from 'next/head'
import {Card} from '@codegouvfr/react-dsfr/Card'
import {buildLinkNewsArticle} from 'core/pagesDefinitions'
import {isoToFrenchFormat} from 'utils/utils'

const PlanDuSite = () => {
  return (
    <>
      <Head>
        <title>{titleAndDescriptions.actualites.title}</title>
        <meta name="description" content={titleAndDescriptions.actualites.description} />
      </Head>
      <ContentPageContainer>
        <h1>Actualités</h1>
        <p>{titleAndDescriptions.actualites.description}</p>
        <div className="fr-grid-row fr-grid-row--gutters">
          {newsArticlesData.map(article => {
            return (
              <div className="fr-col-12 fr-col-sm-6" key={article.slug}>
                <Card
                  title={article.title}
                  desc={article.excerpt}
                  linkProps={{
                    href: buildLinkNewsArticle(article),
                  }}
                  enlargeLink
                  detail={isoToFrenchFormat(article.date)}
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
