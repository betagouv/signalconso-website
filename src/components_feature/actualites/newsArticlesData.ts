import {ArticleAppMobile} from './ArticleAppMobile'
import {ArticleQuestionnaireSiteDgccrf} from './ArticleQuestionnaireSiteDgccrf'
import {ArticleAccessibilite} from './ArticleAccessibilite'

export type NewsArticle = (typeof newsArticlesData)[number]

// This is the display order. Keep the most recents at the start of the array
export const newsArticlesData = [
  {
    date: '2023-08-04',
    lang: 'fr',
    slug: 'signalconso-une-accessibilite-renforcee-pour-tous-les-consommateurs',
    title: 'SignalConso : Une Accessibilité Renforcée pour tous les Consommateurs',
    // used for SEO description
    // used for the preview in /news
    excerpt: `SignalConso : Une Accessibilité Renforcée pour tous les Consommateurs`,
    content: ArticleAccessibilite,
  },
  {
    date: '2023-06-08',
    lang: 'fr',
    slug: 'site-dgccrf-votre-avis-nous-interesse',
    title: 'Le site internet de la DGCCRF : votre avis nous intéresse !',
    excerpt: `La DGCCRF travaille à améliorer son site internet pour mieux répondre aux besoins des consommateurs et des professionnels. Pour nous aider à vous satisfaire au maximum, nous vous invitons à remplir un petit questionnaire en ligne.`,
    content: ArticleQuestionnaireSiteDgccrf,
  },
  {
    date: '2023-05-30',
    lang: 'fr',
    slug: 'signalconso-desormais-disponible-en-application-mobile',
    title: 'SignalConso, désormais disponible en application mobile !',
    // used for SEO description
    // used for the preview in /news
    excerpt: `Découvrez dès maintenant la nouvelle application mobile SignalConso, qui rend vos signalements en tant que consommateur
    encore plus faciles et simplifie vos démarches.`,
    content: ArticleAppMobile,
  },
  {
    date: '2023-09-08',
    lang: 'en',
    slug: 'signalconso-mobile-app-available',
    title: 'Signal conso available on mobile app!',
    // used for SEO description
    // used for the preview in /news
    excerpt: `Discover now the new mobile application SignalConso, which makes your reports as a consumer even easier and simplifies your processes.`,
    content: ArticleAppMobile,
  },
]
