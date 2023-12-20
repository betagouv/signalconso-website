import {AppLangs} from '../../i18n/localization/AppLangs'

export type NewsArticle = (typeof newsArticlesData)[number]

// This is the display order. Keep the most recents at the start of the array
export const newsArticlesData = [
  {
    date: '2023-12-20',
    lang: 'fr',
    slug: 'signalement-par-code-barres',
    title: "Faire son signalement à l'aide du code-barres du produit alimentaire est désormais possible !",
    // used for SEO description
    // used for the preview in /actualites
    excerpt: `Fini les difficultés pour identifier le produit alimentaire pour lequel vous souhaitez déposer un signalement ! SignalConso a développé une nouvelle fonctionnalité de recherche par saisie du code-barres (GTIN) du produit.`,
  },
  {
    date: '2023-09-13',
    lang: 'fr',
    slug: 'resilier-contrats-en-ligne',
    title: 'Résilier ses contrats conclus sur internet est désormais très facile !',
    excerpt: `Fini les lettres recommandées avec accusé de réception pour mettre fin à son contrat d'assurance, d'abonnement à un opérateur téléphonique ou à une salle de sport ! Les contrats pouvant être conclus par Internet peuvent maintenant être résiliés par Internet.`,
  },
  {
    date: '2023-09-08',
    lang: 'en',
    slug: 'signalconso-mobile-app-available',
    title: 'Signal conso available on mobile app!',
    excerpt: `Discover now the new mobile application SignalConso, which makes your reports as a consumer even easier and simplifies your processes.`,
  },
  {
    date: '2023-09-08',
    lang: AppLangs.fr,
    slug: 'signalconso-disponible-en-anglais',
    title: 'SignalConso en anglais afin d’être accessibles aux touristes lors de la coupe du monde de rugby 2023 🏈',
    excerpt: `SignalConso : l’application mobile et le site traduits en anglais afin d’être accessibles aux touristes lors de la coupe du monde de rugby 2023. `,
  },
  {
    date: '2023-09-08',
    lang: AppLangs.en,
    slug: 'signalconso-available-in-english',
    title: 'SignalConso translated into English to be accessible to tourists during the 2023 Rugby World Cup 🏈',
    excerpt: `SignalConso: the mobile application and the site translated into English to be accessible to tourists during the 2023 Rugby World Cup.`,
  },
  {
    date: '2023-08-04',
    lang: AppLangs.fr,
    slug: 'signalconso-une-accessibilite-renforcee-pour-tous-les-consommateurs',
    title: 'SignalConso : une accessibilité renforcée pour tous les consommateurs',
    excerpt: `SignalConso : une accessibilité renforcée pour tous les consommateurs`,
  },
  {
    date: '2023-06-08',
    lang: AppLangs.fr,
    slug: 'site-dgccrf-votre-avis-nous-interesse',
    title: 'Le site internet de la DGCCRF : votre avis nous intéresse !',
    excerpt: `La DGCCRF travaille à améliorer son site internet pour mieux répondre aux besoins des consommateurs et des professionnels. Pour nous aider à vous satisfaire au maximum, nous vous invitons à remplir un petit questionnaire en ligne.`,
  },
  {
    date: '2023-05-30',
    lang: AppLangs.fr,
    slug: 'signalconso-desormais-disponible-en-application-mobile',
    title: 'SignalConso, désormais disponible en application mobile !',
    excerpt: `Découvrez dès maintenant la nouvelle application mobile SignalConso, qui rend vos signalements en tant que consommateur
    encore plus faciles et simplifie vos démarches.`,
  },
] as const
