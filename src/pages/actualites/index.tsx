import {ContentPageContainer} from 'components_simple/ContentPageContainer'
import {newsArticlesData} from 'actualites/newsArticlesData'
import Head from 'next/head'
import {Card} from '@codegouvfr/react-dsfr/Card'
import {buildLinkNewsArticle} from 'core/pagesDefinitions'
import {isoToFrenchFormat} from 'utils/utils'
import {useI18n} from '../../i18n/I18n'

const PlanDuSite = () => {
  const {m} = useI18n()
  return (
    <>
      <Head>
        <title>{m.titleAndDescriptions.actualites.title}</title>
        <meta name="description" content={m.titleAndDescriptions.actualites.description} />
      </Head>
      <ContentPageContainer>
        <h1>Actualités</h1>
        <p>{m.titleAndDescriptions.actualites.description}</p>
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
