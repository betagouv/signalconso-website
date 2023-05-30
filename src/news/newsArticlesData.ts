import {ArticleAppMobile} from './ArticleAppMobile'

export type NewsArticle = typeof newsArticlesData[number]

export const newsArticlesData = [
  {
    date: '2023-05-30',
    slug: 'signalconso-desormais-disponible-en-application-mobile',
    title: 'SignalConso, désormais disponible en application mobile !',
    // used for SEO description
    // used for the preview in /news (truncated)
    excerpt: `Découvrez dès maintenant la nouvelle application mobile SignalConso, qui rend vos signalements en tant que consommateur
    encore plus faciles et simplifie vos démarches. Téléchargez gratuitement l'application sur l'App Store
    ou le Play Store et profitez des mêmes fonctionnalités que celles offertes par notre site internet.`,
    content: ArticleAppMobile,
  },
]
