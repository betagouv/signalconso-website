import {ArticleResilierContratsEnLigne} from './ArticleResilierContratsEnLigne'
import {newsArticlesData} from './newsArticlesData'
import {ArticleAppMobile} from './ArticleAppMobile'
import {ArticleQuestionnaireSiteDgccrf} from './ArticleQuestionnaireSiteDgccrf'
import {ArticleAccessibilite} from './ArticleAccessibilite'
import {ArticleSignalConsoTraduit} from './ArticleSignalConsoTraduit'
import {ArticleSignalConsoTranslated} from './ArticleSignalConsoTranslated'
import {ArticleCodeBarres} from './ArticleCodeBarres'

// We can't put import these JSX directly into the "newsArticlesData"
// it causes too much import problems in the sitemap generation script
export function getArticleContent(slug: (typeof newsArticlesData)[number]['slug']) {
  switch (slug) {
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
    case 'site-dgccrf-votre-avis-nous-interesse':
      return ArticleQuestionnaireSiteDgccrf
    case 'signalconso-desormais-disponible-en-application-mobile':
      return ArticleAppMobile
  }
}
