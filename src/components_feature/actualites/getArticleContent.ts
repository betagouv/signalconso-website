import {ArticleResilierContratsEnLigne} from './ArticleResilierContratsEnLigne'
import {getNewsArticleData} from './newsArticlesData'
import {NewsArticle} from './newsArticlesData'
import {ArticleAppMobile} from './ArticleAppMobile'
import {ArticleQuestionnaireSiteDgccrf} from './ArticleQuestionnaireSiteDgccrf'
import {ArticleAccessibilite} from './ArticleAccessibilite'
import {ArticleSignalConsoTraduit} from './ArticleSignalConsoTraduit'
import {ArticleSignalConsoTranslated} from './ArticleSignalConsoTranslated'
import {ArticleCodeBarres} from './ArticleCodeBarres'
import {ArticleAmeliorationAccessibilite} from './ArticleAmeliorationAccessibilite'
import {ArticleAchatInternet} from './ArticleAchatInternet'
import {ArticleConseilsVacancesHiver} from './ArticleConseilsVacancesHiver'
import {ArticleFauxSitesAdministratifs} from './ArticleFauxSitesAdministratifs'

// We can't put import these JSX directly into the "newsArticlesData"
// it causes too much import problems in the sitemap generation script
export function getArticleContent(slug: NewsArticle['slug']) {
  switch (slug) {
    case 'faux-sites-administratifs':
      return ArticleFauxSitesAdministratifs
    case 'conseils-de-consommation-pour-des-vacances-dhiver-sereines':
      return ArticleConseilsVacancesHiver
    case 'amelioration-de-laccessibilite-de-la-plateforme-signalconso':
      return ArticleAmeliorationAccessibilite
    case 'signalement-par-code-barres':
      return ArticleCodeBarres
    case 'resilier-contrats-en-ligne':
      return ArticleResilierContratsEnLigne
    case 'signalconso-mobile-app-available':
      return ArticleResilierContratsEnLigne
    case 'signalconso-disponible-en-anglais':
      return ArticleSignalConsoTraduit
    case 'signalconso-available-in-english':
      return ArticleSignalConsoTranslated
    case 'signalconso-une-accessibilite-renforcee-pour-tous-les-consommateurs':
      return ArticleAccessibilite
    case 'acheter-sur-internet-en-toute-securite':
      return ArticleAchatInternet
    case 'site-dgccrf-votre-avis-nous-interesse':
      return ArticleQuestionnaireSiteDgccrf
    case 'signalconso-desormais-disponible-en-application-mobile':
      return ArticleAppMobile
  }
}
