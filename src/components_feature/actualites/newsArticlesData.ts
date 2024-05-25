import {AppLangs} from '../../i18n/localization/AppLangs'

export type NewsArticle = (typeof initialNewsArticlesData)[number]

// This is the display order. Keep the most recents at the start of the array
export const initialNewsArticlesData = [
  {
    date: '2024-05-24',
    lang: AppLangs.fr,
    slug: 'signalconso-reduflation',
    title: "Réduflation ou shrinkflation: obligation d'informer les consommateurs dès le 1er juillet !",
    excerpt: `Réduflation et shrinkflation sont des termes issus de la contraction de "réduction" et "inflation" (et en anglais « shrink » qui signifie rétrécir ou réduire, et inflation). Ils désignent des pratiques commerciales visant à masquer la diminution de la quantité de produits tout en maintenant voire en augmentant leurs prix.`,
  },
  {
    date: '2024-04-23',
    lang: 'fr',
    slug: 'magasins-ephemeres',
    title: `Mise en garde- pratiques commerciales trompeuses : vente de meubles dans des magasins éphémères`,
    excerpt: `Convaincu par le discours commercial du vendeur ainsi que les remises importantes et les facilités de paiement proposées, vous avez acheté un ou plusieurs produits. Vous regrettez votre achat, mais vous êtes dans l’incapacité de contacter le vendeur.`,
  },
  {
    date: '2024-04-18',
    lang: 'fr',
    slug: 'amf',
    title: `Attention aux investissements de trading en ligne : soyez vigilant`,
    excerpt: `Avant d’investir, il est indispensable de consulter la liste noire des sociétés et sites non autorisés publiée sur le site de l'autorité des marchés financiers (AMF).`,
  },
  {
    date: '2024-04-11',
    lang: 'fr',
    slug: 'objets-occasion-reconditionnes',
    title: `Objets d’occasion, reconditionnés : quelles garanties pour l’acheteur ?`,
    excerpt: `Connaissez-vous les garanties qui couvrent ces achats ? Contre quels défauts vous protègent-elles et pour combien de temps ? D’ailleurs, quelles différences entre un produit neuf, d’occasion et reconditionné ? On vous explique.`,
  },
  {
    date: '2024-03-18',
    lang: 'fr',
    slug: 'faux-sites-administratifs',
    title: `Faux sites administratifs, attention aux arnaques!`,
    excerpt: `La plupart des démarches administratives sont gratuites, pourtant de nombreux sites les font payer de manière frauduleuse.`,
  },
  {
    date: '2024-02-05',
    lang: 'fr',
    slug: 'conseils-de-consommation-pour-des-vacances-dhiver-sereines',
    title: `Conseils de consommation pour des vacances d'hiver sereines`,
    excerpt: `Les vacances d’hiver 2024 sont proches. Pour qu’elles soient sereines, la DGCCRF vous fournit quelques conseils de consommation relatifs aux voyages, séjours et sorties de loisirs.`,
  },
  {
    date: '2024-01-17',
    lang: 'fr',
    slug: 'acheter-sur-internet-en-toute-securite',
    title: `Acheter sur internet en toute sécurité : conseils SignalConso`,
    excerpt: `Lorsque vous commandez en ligne, vous effectuez un achat à distance encadré par le Code de la consommation (art. L221-1) qui impose des obligations au vendeur en ligne et donne des droits au consommateur.`,
  },
  {
    date: '2024-01-03',
    lang: 'fr',
    slug: 'amelioration-de-laccessibilite-de-la-plateforme-signalconso',
    title: `Amélioration de l'accessibilité de la plateforme SignalConso !`,
    excerpt: `L'accessibilité numérique consiste à rendre les contenus et services numériques compréhensibles et utilisables par les personnes en situation de handicap.`,
  },
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

export const getNewsArticleData = () => {
  const currentDate = new Date()
  return initialNewsArticlesData.filter(article => new Date(article.date) <= currentDate)
}
