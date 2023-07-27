'use client'

import {useI18n} from '../../../i18n/I18n'
import {ContentPageContainer} from '../../../components_simple/PageContainers'
import {newsArticlesData} from '../../../actualites/newsArticlesData'
import {Card} from '@codegouvfr/react-dsfr/Card'
import {buildLinkNewsArticle} from '../../../core/pagesDefinitions'
import {isoToFrenchFormat} from '../../../utils/utils'

const NewsHome = () => {
  const {m} = useI18n()
  return (
    <ContentPageContainer>
      <h1>{m.planDuSite.newsSection}</h1>
      <p>{m.titleAndDescriptions.actualites.description}</p>
      <div className="fr-grid-row fr-grid-row--gutters">
        {newsArticlesData.map(article => {
          return (
            <div className="fr-col-12 fr-col-sm-6 fr-col-xl-4" key={article.slug}>
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
  )
}

export default NewsHome
