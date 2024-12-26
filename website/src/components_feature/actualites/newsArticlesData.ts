import {AppLang, AppLangs} from '../../i18n/localization/AppLangs'
import {appConfig} from '../../core/appConfig'

export type NewsArticle = {
  date: string
  lang: AppLang
  slug: string
  title: string
  title2?: string
  veryShortTitle: string
  excerpt: string
}

// This is the display order. Keep the most recents at the start of the array
export const initialNewsArticlesData: NewsArticle[] = [
  {
    date: '2025-01-06',
    lang: AppLangs.fr,
    slug: 'plastique-usage-unique',
    veryShortTitle: 'Plastiques à usage unique',
    title: 'Interdiction des plastiques à usage unique – Ce que vous devez savoir',
    excerpt: `Depuis l’entrée en vigueur de la loi Anti-Gaspillage pour une Économie Circulaire (AGEC), la vente de nombreux produits en plastique à usage unique est strictement interdite. Cette réglementation, en application depuis janvier 2021, vise à réduire les déchets plastiques et à encourager des alternatives durables.`,
  },
  {
    date: '2025-01-03',
    lang: AppLangs.fr,
    slug: 'tarification-dynamique',
    veryShortTitle: 'Tarification dynamique',
    title: 'Tarification dynamique : Ce que vous devez savoir pour protéger votre portefeuille',
    excerpt: `Acheter un billet de concert ou réserver un taxi en ligne peut parfois réserver de mauvaises surprises. Les prix changent constamment et très souvent à notre désavantage.`,
  },
  {
    date: '2024-12-30',
    lang: AppLangs.fr,
    slug: 'condamnation-indexia',
    veryShortTitle: 'Condamnation d’INDEXIA',
    title: 'Condamnation d’INDEXIA : des pratiques commerciales trompeuses enfin sanctionnées',
    excerpt: `Après un procès hors norme qui a duré sept jours, avec pas moins de 63 tomes de plaintes et plus de 2 500 victimes recensées, le tribunal judiciaire de Paris a condamné six sociétés du groupe INDEXIA pour pratiques commerciales trompeuses et obstacle à la justice.`,
  },
  {
    date: '2024-12-23',
    lang: AppLangs.fr,
    slug: 'decoration-noel',
    veryShortTitle: 'Décorations de Noël',
    title: 'Décorations de Noël : quelques conseils pour éviter les étincelles pendant les fêtes',
    excerpt: `Les fêtes de fin d’année approchent. Les vitrines illuminées émerveillent petits et grands, et la magie se prolonge à la maison avec les sapins décorés de guirlandes scintillantes. Mais attention, guirlandes électriques, bougies décoratives ou autres ornements festifs peuvent représenter des risques s’ils sont mal conçus ou mal utilisés.`,
  },
  {
    date: '2024-12-16',
    lang: AppLangs.fr,
    slug: 'securite-des-jouets',
    veryShortTitle: 'Sécurité des jouets',
    title: 'Sécurité des jouets : Choisissez les cadeaux de vos enfants en toute sérénité',
    excerpt: `Les fêtes approchent, et l’achat de jouets pour les enfants est au cœur des préparatifs de fin d’année. Pour garantir la sécurité des plus jeunes, voici la réglementation à connaître et quelques recommandations essentielles.`,
  },
  {
    date: '2024-12-09',
    lang: AppLangs.fr,
    slug: 'coffrets-cadeaux',
    veryShortTitle: 'Coffrets-cadeaux à Noël',
    title: 'Coffrets-cadeaux : évitez les déconvenues pour Noël !',
    excerpt: `Les coffrets-cadeaux sont souvent présentés comme une solution clé en main pour offrir des expériences variées. Cependant, vous n’êtes pas à l’abri de certaines déconvenues.`,
  },
  {
    date: '2024-12-05',
    lang: AppLangs.fr,
    slug: 'marche-noel',
    veryShortTitle: 'Les marchés de Noël',
    title: 'Les fêtes approchent : profitez des marchés de Noël en toute sérénité !',
    excerpt: `Voici quelques conseils pratiques pour acheter en toute confiance sur les marchés de Noël et profiter pleinement de cette tradition.`,
  },
  {
    date: '2024-11-29',
    lang: AppLangs.fr,
    slug: 'droit-de-retractation',
    veryShortTitle: 'Droit de rétractation pendant le Black Friday',
    title: 'Droit de rétractation : ce que vous devez savoir en tant que consommateurs pendant le Black Friday',
    excerpt: `Le Black Friday c’est la période des bonnes affaires. Cependant, en tant que consommateur, il est essentiel de connaître vos droits notamment en ce qui concerne le droit de rétractation`,
  },
  {
    date: '2024-11-26',
    lang: AppLangs.fr,
    slug: 'dark-patterns',
    veryShortTitle: 'Dark Patterns : Comment éviter les pièges',
    title: 'Dark Patterns : Comment éviter les pièges du E-commerce pendant le Black Friday ?',
    excerpt: `Chaque année, le Black Friday attire des millions de consommateurs à la recherche de bonnes affaires. Mais attention, derrière les offres alléchantes, certaines pratiques trompeuses, appelées Dark Patterns, peuvent fausser votre expérience d’achat.`,
  },
  {
    date: '2024-11-25',
    lang: AppLangs.fr,
    slug: 'ateliers-utilisateurs',
    veryShortTitle: 'Rejoignez nos ateliers utilisateurs',
    title: 'Nous avons besoin de vous : rejoignez nos ateliers utilisateurs SignalConso !',
    excerpt: `Vous avez entre 18 et 30 ans et vous avez déjà utilisé SignalConso plusieurs fois ? Rejoignez nos ateliers utilisateurs pour nous aider à améliorer notre application !`,
  },
  {
    date: '2024-11-22',
    lang: AppLangs.fr,
    slug: 'abonnements-caches-black-friday',
    veryShortTitle: 'Abonnements cachés (Black Friday)',
    title: 'Attention aux abonnements cachés pendant le Black Friday !',
    excerpt: `Pendant le Black Friday, certains sites peuvent proposer des "offres d'essai gratuit" et autres promotions alléchantes pour vous abonner à un service sans que vous en ayez conscience. Ces abonnements cachés sont souvent dissimulés derrière une offre gratuite ou une petite case à cocher, avec l’espoir que vous ne remarquerez pas les frais mensuels? Voici comment les repérer, éviter les pièges et faire valoir vos droits.`,
  },
  {
    date: '2024-11-19',
    lang: AppLangs.fr,
    slug: 'fausse-promo-black-friday',
    veryShortTitle: 'Fausses promotions (Black Friday)',
    title: 'Fausses promotions : vos droits en tant que consommateur (Black Friday)',
    excerpt: `Le Black Friday, c’est bientôt ! Ce grand rendez-vous commercial promet de belles promotions, mais attention, certaines offres ne sont pas aussi alléchantes qu’elles ne le paraissent. Chaque année, certaines enseignes gonflent les prix juste avant le Black Friday pour afficher ensuite des "réductions" trompeuses. Face à ces pratiques, soyez vigilant et n’hésitez pas à signaler les abus pour que ces pratiques trompeuses ne gâchent pas la fête !`,
  },
  {
    date: '2024-11-15',
    lang: AppLangs.fr,
    slug: 'livraison-black-friday',
    veryShortTitle: 'Problème de livraison (Black Friday)',
    title: 'Problèmes de livraison : comment les éviter et faire valoir vos droits pendant le Black Friday ?',
    excerpt: `Le Black Friday c'est l'occasion de faire de bonnes affaires, mais c'est aussi la période de l'année où les commandes et les retards de livraison explosent. Entre attentes prolongées, colis abîmés ou non reçus, il est important de savoir comment anticiper les problèmes de livraison et quels sont vos droits en cas de souci.`,
  },
  {
    date: '2024-11-12',
    lang: AppLangs.fr,
    slug: 'sav-black-friday',
    veryShortTitle: 'Problème de SAV (Black Friday)',
    title: 'Problèmes avec un SAV : comment faire valoir vos droits pendant le Black Friday',
    excerpt: `Après les achats du Black Friday, il est fréquent que des produits présentent des défauts ou que des accessoires manquent. En cas de problème, le service après-vente (SAV) est votre interlocuteur principal. Voici les bons réflexes pour éviter les difficultés de SAV et faire valoir vos droits.`,
  },
  {
    date: '2024-11-04',
    lang: AppLangs.fr,
    slug: 'faux-avis',
    veryShortTitle: 'Faux avis clients en ligne',
    title: 'Faux avis clients en ligne : que faire avec SignalConso ?',
    excerpt: `Les avis clients en ligne sont devenus un facteur déterminant dans nos choix d’achat, qu’il s’agisse d’un produit, d’un restaurant ou d’un service. Cependant, de plus en plus de faux avis polluent les plateformes.`,
  },
  {
    date: '2024-10-28',
    lang: AppLangs.fr,
    slug: 'halloween-confiseries',
    veryShortTitle: 'Halloween : Attention aux dangers des confiseries !',
    title: 'Halloween : Attention aux dangers des confiseries !',
    excerpt: `Halloween, c'est le moment préféré des enfants pour remplir leurs paniers de friandises. Mais même si l'ambiance est festive, il est important de prêter attention à la sécurité des confiseries.`,
  },
  {
    date: '2024-10-21',
    lang: AppLangs.fr,
    slug: 'lanceur-d-alerte',
    veryShortTitle: "Lanceur d'alerte : un rôle essentiel",
    title: "Lanceur d'alerte : un rôle essentiel pour protéger les consommateurs et l'intérêt général !",
    excerpt: `Savez-vous que vous pouvez contribuer directement à la protection des consommateurs en devenant lanceur d'alerte ? Ce statut permet à toute personne, salariée ou non, de signaler des infractions graves ou des risques qui menacent l’intérêt général, notamment dans le domaine de la consommation.`,
  },
  {
    date: '2024-10-14',
    lang: AppLangs.fr,
    slug: 'proces-sfam',
    veryShortTitle: 'La SFAM face à la Justice',
    title: 'Des téléconseillers formés à tromper : La SFAM face à la Justice',
    excerpt: `L'affaire SFAM a provoqué un véritable séisme dans le secteur des assurances. De nombreux consommateurs ont dénoncé des pratiques commerciales trompeuses, pointant du doigt des prélèvements non autorisés et des refus de remboursement.`,
  },
  {
    date: '2024-10-04',
    lang: AppLangs.fr,
    slug: 'baux-precaires',
    veryShortTitle: 'Magasins éphémères et arnaques',
    title: 'Ventes dans les magasins éphémères : attention aux arnaques !',
    excerpt: `Les magasins éphémères se multiplient dans des lieux temporaires comme des hôtels ou centres commerciaux. Ils promettent de superbes affaires, mais attention aux pièges ! Voici les principales arnaques à surveiller et comment les éviter.`,
  },
  {
    date: '2024-10-04',
    lang: AppLangs.fr,
    slug: 'journee-aveugles-malvoyants',
    veryShortTitle: 'Journée des aveugles et malvoyants',
    title:
      "Journée nationale des aveugles et malvoyants : Faciliter l'accès des chiens guides et d'assistance dans les lieux publics",
    excerpt: `Le 4 octobre, à l'occasion de la Journée nationale des aveugles et malvoyants, il est important de rappeler les droits des personnes en situation de handicap accompagnées de chiens guides ou d'assistance.`,
  },
  {
    date: '2024-10-03',
    lang: AppLangs.fr,
    slug: 'deux-sites-frauduleux-bloques',
    veryShortTitle: 'Sites frauduleux bloqués',
    title: 'Deux sites de vente en ligne frauduleux bloqués grâce à vos signalements !',
    excerpt: `La vigilance des consommateurs a une nouvelle fois prouvé son efficacité. Grâce aux signalements effectués par des usagers sur SignalConso, deux sites de vente en ligne frauduleux ont été identifiés et bloqués.`,
  },
  {
    date: '2024-10-02',
    lang: AppLangs.fr,
    slug: 'consommation-durable',
    veryShortTitle: 'Consommation durable',
    title: 'Consommation durable : Agissez pour un avenir meilleur !',
    excerpt: `Vous connaissez déjà SignalConso pour signaler des problèmes comme des produits défectueux ou des prix mal affichés. Mais saviez-vous que vous pouvez aussi l’utiliser pour encourager une consommation plus durable ?`,
  },
  {
    date: '2024-09-19',
    lang: AppLangs.fr,
    slug: 'erreur-de-prix-en-caisse',
    veryShortTitle: 'Erreur de prix en caisse',
    title: 'Erreur de prix en caisse : Comment réagir et s’en prémunir ?',
    excerpt: `Lors de vos courses, vous avez peut-être déjà constaté une différence entre le prix affiché en rayon et celui enregistré en caisse. Cette situation est plus courante qu’on ne pourrait le penser et peut causer une frustration légitime.`,
  },
  {
    date: '2024-07-11',
    lang: AppLangs.fr,
    slug: 'faux-sites-de-vente-thesee',
    veryShortTitle: 'Faux sites de vente',
    title: 'Faux sites de vente : appel à victimes du parquet de Nanterre et de la Police Nationale',
    title2: 'Enquête sur des escroqueries de faux sites de vente : plus de 20 000 victimes',
    excerpt: `Si vous avez été victime de l’un des sites cités dans cet article, vous pouvez déposer plainte en ligne sur THESEE.`,
  },
  {
    date: '2024-06-26',
    lang: AppLangs.fr,
    slug: 'rappel-airbag-takata',
    veryShortTitle: 'Rappel airbags Takata',
    title: "Information sur les rappels de voiture en raison d'airbags Takata défectueux",
    title2: 'Comment savoir si vous êtes concerné ? Quelle est la marche à suivre ?',
    excerpt: `Depuis mai 2024, en raison d'un défaut majeur dans les airbags, des millions de véhicules sont actuellement rappelés à travers le monde. Ces airbags, fabriqués par Takata, présentent un risque sérieux pour la sécurité des occupants.`,
  },
  {
    date: '2024-06-25',
    lang: AppLangs.fr,
    slug: 'signalconso-mobile-app-v2',
    veryShortTitle: `L'application mobile évolue`,
    title: 'L’application SignalConso évolue : tour d’horizon des nouvelles fonctionnalités',
    excerpt: `Disponible sur iOS et Google Play, celle-ci fait peau neuve pour proposer de toutes nouvelles fonctionnalités afin d’accompagner vos démarches toujours plus loin. On fait le point.`,
  },
  {
    date: '2024-05-24',
    lang: AppLangs.fr,
    slug: 'signalconso-reduflation',
    veryShortTitle: '"Shrinkflation"',
    title: "Réduflation ou shrinkflation: obligation d'informer les consommateurs dès le 1er juillet !",
    excerpt: `Réduflation et shrinkflation sont des termes issus de la contraction de "réduction" et "inflation" (et en anglais « shrink » qui signifie rétrécir ou réduire, et inflation). Ils désignent des pratiques commerciales visant à masquer la diminution de la quantité de produits tout en maintenant voire en augmentant leurs prix.`,
  },
  {
    date: '2024-04-23',
    lang: 'fr',
    slug: 'magasins-ephemeres',
    veryShortTitle: 'Magasins éphémères',
    title: `Mise en garde- pratiques commerciales trompeuses : vente de meubles dans des magasins éphémères`,
    excerpt: `Convaincu par le discours commercial du vendeur ainsi que les remises importantes et les facilités de paiement proposées, vous avez acheté un ou plusieurs produits. Vous regrettez votre achat, mais vous êtes dans l’incapacité de contacter le vendeur.`,
  },
  {
    date: '2024-04-18',
    lang: 'fr',
    slug: 'amf',
    veryShortTitle: 'Trading en ligne',
    title: `Attention aux investissements de trading en ligne : soyez vigilant`,
    excerpt: `Avant d’investir, il est indispensable de consulter la liste noire des sociétés et sites non autorisés publiée sur le site de l'autorité des marchés financiers (AMF).`,
  },
  {
    date: '2024-04-11',
    lang: 'fr',
    slug: 'objets-occasion-reconditionnes',
    veryShortTitle: 'Objects d`occasion',
    title: `Objets d’occasion, reconditionnés : quelles garanties pour l’acheteur ?`,
    excerpt: `Connaissez-vous les garanties qui couvrent ces achats ? Contre quels défauts vous protègent-elles et pour combien de temps ? D’ailleurs, quelles différences entre un produit neuf, d’occasion et reconditionné ? On vous explique.`,
  },
  {
    date: '2024-03-18',
    lang: 'fr',
    slug: 'faux-sites-administratifs',
    veryShortTitle: 'Faux sites administratifs',
    title: `Faux sites administratifs, attention aux arnaques!`,
    excerpt: `La plupart des démarches administratives sont gratuites, pourtant de nombreux sites les font payer de manière frauduleuse.`,
  },
  {
    date: '2024-02-05',
    lang: 'fr',
    slug: 'conseils-de-consommation-pour-des-vacances-dhiver-sereines',
    veryShortTitle: 'Vacances d`hiver',
    title: `Conseils de consommation pour des vacances d'hiver sereines`,
    excerpt: `Les vacances d’hiver 2024 sont proches. Pour qu’elles soient sereines, la DGCCRF vous fournit quelques conseils de consommation relatifs aux voyages, séjours et sorties de loisirs.`,
  },
  {
    date: '2024-01-17',
    lang: 'fr',
    slug: 'acheter-sur-internet-en-toute-securite',
    veryShortTitle: 'Acheter sur internet',
    title: `Acheter sur internet en toute sécurité : conseils SignalConso`,
    excerpt: `Lorsque vous commandez en ligne, vous effectuez un achat à distance encadré par le Code de la consommation (art. L221-1) qui impose des obligations au vendeur en ligne et donne des droits au consommateur.`,
  },
  {
    date: '2024-01-03',
    lang: 'fr',
    slug: 'amelioration-de-laccessibilite-de-la-plateforme-signalconso',
    veryShortTitle: "Amélioration de l'accessibilité",
    title: `Amélioration de l'accessibilité de la plateforme SignalConso !`,
    excerpt: `L'accessibilité numérique consiste à rendre les contenus et services numériques compréhensibles et utilisables par les personnes en situation de handicap.`,
  },
  {
    date: '2023-12-20',
    lang: 'fr',
    slug: 'signalement-par-code-barres',
    veryShortTitle: 'Signalement par code-barres',
    title: "Faire son signalement à l'aide du code-barres du produit alimentaire est désormais possible !",
    // used for SEO description
    // used for the preview in /actualites
    excerpt: `Fini les difficultés pour identifier le produit alimentaire pour lequel vous souhaitez déposer un signalement ! SignalConso a développé une nouvelle fonctionnalité de recherche par saisie du code-barres (GTIN) du produit.`,
  },
  {
    date: '2023-09-13',
    lang: 'fr',
    slug: 'resilier-contrats-en-ligne',
    veryShortTitle: 'Résilier contrats en ligne',
    title: 'Résilier ses contrats conclus sur internet est désormais très facile !',
    excerpt: `Fini les lettres recommandées avec accusé de réception pour mettre fin à son contrat d'assurance, d'abonnement à un opérateur téléphonique ou à une salle de sport ! Les contrats pouvant être conclus par Internet peuvent maintenant être résiliés par Internet.`,
  },
  {
    date: '2023-09-08',
    lang: 'en',
    slug: 'signalconso-mobile-app-available',
    veryShortTitle: 'SignalConso mobile app',
    title: 'Signal conso available on mobile app!',
    excerpt: `Discover now the new mobile application SignalConso, which makes your reports as a consumer even easier and simplifies your processes.`,
  },
  {
    date: '2023-09-08',
    lang: AppLangs.fr,
    slug: 'signalconso-disponible-en-anglais',
    veryShortTitle: 'SignalConso en anglais',
    title: 'SignalConso en anglais afin d’être accessibles aux touristes lors de la coupe du monde de rugby 2023 🏈',
    excerpt: `SignalConso : l’application mobile et le site traduits en anglais afin d’être accessibles aux touristes lors de la coupe du monde de rugby 2023. `,
  },
  {
    date: '2023-09-08',
    lang: AppLangs.en,
    slug: 'signalconso-available-in-english',
    veryShortTitle: 'SignalConso in English',
    title: 'SignalConso translated into English to be accessible to tourists during the 2023 Rugby World Cup 🏈',
    excerpt: `SignalConso: the mobile application and the site translated into English to be accessible to tourists during the 2023 Rugby World Cup.`,
  },
  {
    date: '2023-08-04',
    lang: AppLangs.fr,
    slug: 'signalconso-une-accessibilite-renforcee-pour-tous-les-consommateurs',
    veryShortTitle: 'Accessibilité renforcée',
    title: 'SignalConso : une accessibilité renforcée pour tous les consommateurs',
    excerpt: `SignalConso : une accessibilité renforcée pour tous les consommateurs`,
  },
  {
    date: '2023-06-08',
    lang: AppLangs.fr,
    slug: 'site-dgccrf-votre-avis-nous-interesse',
    veryShortTitle: 'Avis sur le site DGCCRF',
    title: 'Le site internet de la DGCCRF : votre avis nous intéresse !',
    excerpt: `La DGCCRF travaille à améliorer son site internet pour mieux répondre aux besoins des consommateurs et des professionnels. Pour nous aider à vous satisfaire au maximum, nous vous invitons à remplir un petit questionnaire en ligne.`,
  },
  {
    date: '2023-05-30',
    lang: AppLangs.fr,
    slug: 'signalconso-desormais-disponible-en-application-mobile',
    title: 'SignalConso, désormais disponible en application mobile !',
    veryShortTitle: 'Application mobile',
    excerpt: `Découvrez dès maintenant la nouvelle application mobile SignalConso, qui rend vos signalements en tant que consommateur
    encore plus faciles et simplifie vos démarches.`,
  },
] as const

const isDemo = appConfig.showOutilsInternes

export const getNewsArticleData = () => {
  const currentDate = new Date()
  return initialNewsArticlesData.filter(article => new Date(article.date) <= currentDate || isDemo)
}

export const isPreview = (article: NewsArticle) => {
  return new Date(article.date) > new Date()
}
