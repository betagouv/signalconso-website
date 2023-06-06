import {formatDistance, formatDuration as formatDurationFns} from 'date-fns'

const invalidDate = '-'

const isDateValid = (d?: Date): boolean => {
  return !!d && d instanceof Date && !isNaN(d.getTime())
}

const formatDate = (d?: Date): string => {
  if (!isDateValid(d)) return invalidDate
  return d!.toLocaleDateString()
}

const formatTime = (d?: Date): string => {
  if (!isDateValid(d)) return invalidDate
  return d!.toLocaleTimeString()
}

const formatDateTime = (d?: Date): string => {
  if (!isDateValid(d)) return invalidDate
  return formatDate(d) + ' ' + formatTime(d)
}

const dateFromNow = (d?: Date): string | undefined => {
  return d ? formatDistance(d, new Date(), {addSuffix: true}) : undefined
}

const formatLargeNumber = (n?: number): string => {
  return n !== undefined && n !== null ? n.toLocaleString('fr-FR') : '-'
}

const formatDuration = formatDurationFns

export const fr = {
  formatDate,
  formatTime,
  formatDateTime,
  dateFromNow,
  formatDuration,
  formatLargeNumber,
  messages: {
    titleAndDescriptions: {
      cookies: {
        title: 'Politique de cookies',
        description: 'Description de la politique de cookies',
      },
      appMobile: {
        // TODO
        title: '',
        description: '',
      },
      commentCaMarche: {
        title: 'Comment ça marche ? - SignalConso',
        description:
          "Vous signalez votre problème en remplissant le formulaire en ligne. Notre équipe contacte l'entreprise afin de l'informer de votre signalement. L'entreprise peut procéder spontanément aux corrections utiles, sans sanction. Votre signalement est enregistré à la répression des fraudes (DGCCRF).",
      },
      accessibilite: {
        title: 'Accessibilité - SignalConso',
        description: "Rapport d'accessibilité SignalConso",
      },
      contact: {
        title: 'Titre de la page Contact',
        description: 'Description de la page Contact',
      },
      contractualDispute: {
        title: "Résolution d'un problème individuel (litige) - SignalConso",
        description: 'Démarches conseillées par SignalConso pour résoudre un problème individuel (litige) avec une entreprise ',
      },
    },
    introApple: 'App Store',
    introBetween: 'ou le ',
    introGoogle: 'Play Store',
    articleAppMobile: {
      capturesEcran: "Captures d'écran de l'application",
      intro1:
        "Découvrez dès maintenant la nouvelle application mobile SignalConso, qui rend vos signalements en tant que consommateur encore plus faciles et simplifie vos démarches. Téléchargez gratuitement l'application sur l'",
      intro2: 'et profitez des mêmes fonctionnalités que celles offertes par notre site internet.',
      fonctionnalites:
        'Grâce à cette application, vous pouvez signaler rapidement tout problème lié à votre consommation (livraison, prix, qualité, contrat, etc.) et obtenir des informations sur vos droits en seulement quelques clics.',
      statistiques:
        "Avec plus de 320 000 utilisateurs et plus de 500 000 signalements depuis son lancement en 2020 par Bruno Le Maire, Ministre de l'Économie, des Finances et de la Souveraineté industrielle et numérique, SignalConso a su répondre aux attentes des consommateurs. Au cours des 12 derniers mois, pas moins de 195 000 signalements ont été déposés, dont 75 000 pour des achats en ligne, 23 000 pour des achats en magasin, 18 000 pour des travaux de rénovation et 14 000 liés aux voyages et aux loisirs. Les sites internet représentent plus de 43 % des signalements, couvrant des problématiques telles que la qualité des produits, les délais de livraison, les conditions de garantie, de rétractation ou de remboursement, ainsi que les défauts de mentions légales, etc.",
      accessibilite:
        "SignalConso est une application facilement accessible qui répond à un véritable besoin en matière de résolution des litiges de consommation au quotidien. Même si tous les consommateurs ne voient pas leurs problèmes résolus, 8 sur 10 recommandent SignalConso sur Services Publics +, la plateforme dédiée à l'amélioration des services publics.",
      cta: "N'attendez plus, mettez SignalConso dans votre poche et faites valoir vos droits en tant que consommateur en toute simplicité !",
      banner: 'Bannière de présentation de SignalConso',
    },
    cookies: {
      gestionTitre: 'Gestion des cookies',
      banniereTitre: 'Cette interface en ligne n’affiche pas de bannière de consentement aux cookies, pourquoi ?',
      banniereContenu:
        'C’est vrai, vous n’avez pas eu à cliquer sur un bloc qui recouvre la moitié de la page pour dire que vous êtes d’accord avec le dépôt de cookies — même si vous ne savez pas ce que ça veut dire !',
      respectLoiContenu:
        'Rien d’exceptionnel, pas de passe-droit lié à un .gouv.fr. Nous respectons simplement la loi, qui dit que certains outils de suivi d’audience, correctement configurés pour respecter la vie privée, sont exemptés d’autorisation préalable.',
      cookiesTechniquesTitre: 'Les cookies techniques mis en place nous permettent :',
      cookiesTechniquesContenu:
        "D’obtenir des statistiques anonymes sur la fréquentation de l'interface en ligne (tout logiciel ou application, y compris un site internet, une section de site internet ou une application mobile) afin de faire de l'analyse de contenu et détecter d'éventuels problèmes de navigation;",
      definitionTitre: 'Cookies',
      definition:
        "Définition : Le cookie est un petit fichier texte enregistré par le navigateur de votre ordinateur, tablette ou smartphone. Le cookie, enregistré sur votre ordinateur lorsque vous consultez l'interface en ligne SignalConso, permet de conserver des données utilisateur décrites ci-dessous afin de faciliter la navigation et de permettre certaines fonctionnalités.",
      natureTitre: "Nature des cookies déposés sur l'interface en ligne SignalConso:",
      natureContenu:
        "Nous n'utilisons que des cookies techniques qui permettent et facilitent votre navigation. Certains sont indispensables et ne sauraient être supprimés sans affecter gravement l’accès à l'interface en ligne et la navigation, d’autres auraient pour conséquence une navigation dégradée.",
      listeTitre: 'Liste des cookies déposés',
      listeDescription: "Les cookies d'analyse de mesure d'audience (Eulerian / Matomo):",
      nomCookie: 'Nom du cookie',
      finalite: 'Finalité',
      dureeConservation: 'Durée de conservation',
      finaliteEulerian: 'Cookie Eulerian',
      dureeConservationEulerian: '13 mois',
      finaliteMatomo: 'Matomo',
      dureeConservationMatomo1: '13 mois',
      dureeConservationMatomo2: '6 mois',
      dureeConservationMatomo3: '30 minutes',
      mieuxServirContenu:
        'Afin de mieux vous servir et d’améliorer l’expérience utilisateur sur notre interface en ligne, nous mesurons son audience grâce à une solution utilisant la technologie des cookies.',
      donneesCollecteesContenu:
        'Les données collectées permettent de fournir uniquement des données statistiques anonymes de fréquentation (le nombre de pages vues, le nombre de visites, leur fréquence de retour, …).',
      outilEulerian:
        "Nous utilisons l‘outil de mesure d’audience Eulerian. Cet outil est dispensé du recueil de consentement de l'internaute relatif au dépôt des cookies Analytics, l'autorité française de protection des données (CNIL) ayant accordé une exemption au cookie Web Analytics d’Eulerian ",
      outilEulerianLink: 'en savoir plus',
      anonymisation:
        "Aucune des données personnelles ne sont exploitées par l'interface en ligne SignalConso. Cela signifie que votre adresse IP, par exemple, est anonymisée avant d’être enregistrée. Il est donc impossible d’associer vos visites sur cette interface en ligne à votre personne.",
      cookiesEulerian:
        "Les noms des cookies utilisés sont pour Eulerian Etuix. Leur durée de conservation est de 13 mois. Elles ne sont pas cédées à des tiers ni utilisées à d'autres fins.",
      outilMatomo:
        'Il en est de même pour l’outil de mesure d’audience de Matomo qui permet de conserver l’historique des données de statistiques anonymes de fréquentation récoltées depuis le lancement de SignalConso',
      cookiesMatomo:
        "Les noms des cookies utilisés sont pour Matomo _pk_session, _pk_id, _pk_ref. Leur durée va de de 30 mn à 13 mois. Elles ne sont pas cédées à des tiers ni utilisées à d'autres fins.",
      renseignementsSuiviAudience:
        'Pour plus de renseignements sur la gestion de la vie privée sur Signal Conso, vous pouvez également consulter la rubrique ',
      renseignementsSuiviAudienceLink: "suivi d'audience et vie privée",
      accepterRefuserTitre: 'Comment accepter ou refuser les cookies:',
      parametrerNavigateurContenu1:
        "Vous avez la possibilité de paramétrer leur navigateur pour supprimer les cookies déjà installés sur leur terminal, pour être invités à accepter ou refuser l’installation de cookies au cas par cas ou pour accepter ou refuser automatiquement tous les cookies pour certaines interfaces en ligne ou pour toutes les interfaces en ligne. Toutefois, le refus d’utilisation des cookies peut empêcher certaines fonctionnalités de l'interface en ligne de fonctionner.",
      parametrerNavigateurContenu2:
        'Les paramétrages de gestion des cookies varient selon les navigateurs. Les instructions à ce sujet pour les navigateurs les plus courants sont disponibles en cliquant sur les liens ci-dessous:',
      internetExplorer: 'Internet Explorer',
      internetExplorerInstructions:
        "Dans Internet Explorer, cliquez sur le bouton Outils, puis sur Options Internet. Sous l'onglet Général, sous Historique de navigation, cliquez sur Paramètres. Cliquez sur le bouton Afficher les fichiers. Cliquez sur l'en-tête de colonne Nom pour trier tous les fichiers dans l'ordre alphabétique, puis parcourez la liste jusqu'à ce que vous voyez des fichiers commençant par le préfixe \"Cookie\". (tous les cookies possèdent ce préfixe et contiennent habituellement le nom de l'interface en ligne Web qui a créé le cookie). Sélectionnez le ou les cookies comprenant le nom \"à compléter\" et supprimez-les Fermez la fenêtre qui contient la liste des fichiers, puis cliquez deux fois sur OK pour retourner dans Internet Explorer.",
      edge: 'Microsoft Edge',
      chrome: 'Google Chrome',
      chromeInstructions:
        "Ouvrez Google Chrome. Dans la barre d'outils du navigateur, cliquez sur Plus. Placez votre curseur sur Plus d'outils, puis cliquez sur Effacer les données de navigation. Dans la fenêtre \"Effacer les données de navigation\", cochez les cases Cookies et données d'autres sites ou plug-in et Images et fichiers en cache. Utilisez le menu en haut pour sélectionner la quantité de données que vous souhaitez supprimer. Sélectionnez Depuis le début pour tout supprimer. Cliquez sur Effacer les données de navigation.",
      firefox: 'Mozilla Firefox',
      firefoxInstructions:
        'Allez dans l\'onglet "Outils" du navigateur puis sélectionnez le menu "Options" Dans la fenêtre qui s\'affiche, choisissez "Vie privée" et cliquez sur "supprimer des cookies spécifiques" Repérez les fichiers qui contiennent le nom "à compléter". Sélectionnez-les et supprimez-les.',
      safari: 'Safari',
      safariInstructions:
        'Dans votre navigateur, choisissez le menu Édition > Préférences. Cliquez sur Sécurité. Cliquez sur Afficher les cookies. Sélectionnez les cookies qui contiennent le nom "à compléter" et cliquez sur Effacer ou sur Tout effacer. Après avoir supprimé les cookies, cliquez sur Terminé.',
      plusRenseignementsCNIL:
        'Pour plus de renseignements sur les cookies et la façon de paramétrer votre navigateur, vous pouvez également consulter ',
      plusRenseignementsCNILLink: "l'interface en ligne de la CNIL",
    },
    appMobile: {
      pageTitle: 'SignalConso, désormais disponible en application mobile !',
      introText1:
        "Découvrez dès maintenant la nouvelle application mobile SignalConso, qui rend vos signalements en tant que consommateur encore plus faciles et simplifie vos démarches. Téléchargez gratuitement l'application sur l'",
      introText2: 'et profitez des mêmes fonctionnalités que celles offertes par notre site internet.',
      featureText:
        'Grâce à cette application, vous pouvez signaler rapidement tout problème lié à votre consommation (livraison, prix, qualité, contrat, etc.) et obtenir des informations sur vos droits en seulement quelques clics.',
      statisticsText:
        "Avec plus de 320 000 utilisateurs et plus de 500 000 signalements depuis son lancement en 2020 par Bruno Le Maire, Ministre de l'Économie, des Finances et de la Souveraineté industrielle et numérique, SignalConso a su répondre aux attentes des consommateurs. Au cours des 12 derniers mois, pas moins de 195 000 signalements ont été déposés, dont 75 000 pour des achats en ligne, 23 000 pour des achats en magasin, 18 000 pour des travaux de rénovation et 14 000 liés aux voyages et aux loisirs. Les sites internet représentent plus de 43 % des signalements, couvrant des problématiques telles que la qualité des produits, les délais de livraison, les conditions de garantie, de rétractation ou de remboursement, ainsi que les défauts de mentions légales, etc.",
      accessibilityText:
        "SignalConso est une application facilement accessible qui répond à un véritable besoin en matière de résolution des litiges de consommation au quotidien. Même si tous les consommateurs ne voient pas leurs problèmes résolus, 8 sur 10 recommandent SignalConso sur Services Publics +, la plateforme dédiée à l'amélioration des services publics.",
      conclusionText:
        "N'attendez plus, mettez SignalConso dans votre poche et faites valoir vos droits en tant que consommateur en toute simplicité !",
      screenshotsAlt: "Captures d'écran de l'application",
    },
    commentCaMarche: {
      title: 'Comment ça marche ?',
      step1: {
        title: '1. Vous avez rencontré un problème avec une entreprise ?',
        description1:
          'Vous avez rencontré un problème avec un professionnel, un commerce, en magasin ou sur internet ? En tant que consommateur, vous pouvez le signaler sur la plateforme SignalConso.',
        description2:
          'Vous n’êtes pas sûr que ce soit un problème ? SignalConso vous guide afin de savoir si vous pouvez déposer un signalement. Si ce n’est pas le cas, on vous expliquera pourquoi !',
      },
      step2: {
        title: '2. Déposez un signalement sur SignalConso ou posez une question à la répression des fraudes.',
        description1:
          'Signalez le problème (anonymement ou non) ou posez directement votre question auprès d’un agent de la DGCCRF (la répression des fraudes).',
        description2: 'Dans tous les cas, SignalConso vous oriente et vous conseille.',
      },
      step3: {
        title: '3. L’entreprise et la répression des fraudes sont informées.',
        description1:
          'Si vous avez déposé un signalement, SignalConso contacte l’entreprise afin de l’en informer. L’entreprise peut alors vous répondre et/ou s’améliorer, vous serez informés de son action par un email de SignalConso. Si vous avez choisi de transmettre vos coordonnées à l’entreprise, elle pourra vous contacter directement.',
        description2:
          'Si vous choisissez d’interroger la DGCCRF sur vos droits, une réponse individualisée vous sera adressée par mail par un agent de la DGCCRF.',
      },
      step4: {
        title: '4. La répression des fraudes intervient si nécessaire.',
        description1: 'Votre signalement est enregistré dans la base de données de la DGCCRF.',
        description2:
          'Les signalements deviennent trop nombreux pour une même entreprise ? Le problème est considéré comme grave par les enquêteurs ? La répression des fraudes peut décider de surveiller ou de contrôler une entreprise grâce à votre signalement.',
      },
    },
    accessibilite: {
      pageTitle: "Déclaration d'accessibilité",
      paragraph1:
        "Le ministère de l'Economie, des Finances et de la Relance s’engage à rendre son service accessible, conformément à l’article 47 de la loi n° 2005-102 du 11 février 2005.",
      paragraph2: 'Cette déclaration d’accessibilité s’applique à SignalConso.',
      conformityStatusTitle: 'État de conformité',
      conformityStatusText: `SignalConso est <b>partiellement conforme avec le RGAA 4.0</b>. Partiellement conforme veut dire que certaines sections du contenu ne sont pas entièrement conformes aux standards d'accessibilités.`,
      testResultsTitle: 'Résultats des tests',
      testResultsText: 'L’audit de conformité réalisé par évaluation externe révèle que 78% des critères RGAA sont respectés.',
      nonAccessibleContentTitle: 'Contenus non accessibles',
      nonAccessibleContentText: 'Les contenus listés ci-dessous ne sont pas accessibles pour les raisons suivantes.',
      nonConformityTitle: 'Non conformité',
      nonConformityText:
        'Malgré nos efforts, certains contenus sont inaccessibles. Vous trouverez ci-dessous une liste des limitations connues et des solutions potentielles :',
      monthStats: 'Statistiques mensuelles',
      disproportionateBurdenTitle: 'Dérogations pour charge disproportionnée',
      disproportionateBurdenText1:
        "La validité HTML ne peut être garantie sur l'ensemble des pages néanmoins à notre connaissance cela ne provoque aucun dysfonctionnement des aides techniques. La reprise et la vérification de toutes les pages du site représenteraient une charge de travail disproportionnée par rapport au gain attendu.",
      disproportionateBurdenText2:
        "Les vidéos n'ont pas d'audio description, sous-titres ou transcription textuelle. La cellule ayant en charge la mise en ligne de ces animations n'est pas en mesure actuellement de fournir ces éléments pour l'ensemble de ces vidéos.",
      accessibilityReportTitle: "Accès au rapport d'accessibilité",
      accessibilityReportText: "Vous avez accès au rapport d'accessibilité",
      rebecaPlatform: 'sur la plateforme Rebeca',
      evaluationGridText:
        ", en recherchant \"Rapport d'audit d'accessibilité signal.conso.gouv.fr\". Vous pourrez trouver aussi la grille d'évaluation dans les documents associés.",
      declarationEstablishmentTitle: "Établissement de cette déclaration d'accessibilité",
      declarationEstablishmentText: 'Cette déclaration a été établie le 4 Septembre 2020.',
      usedTechnologiesTitle: 'Technologies utilisées',
      usedTechnologiesText: "L'accessibilité de SignalConso s'appuie sur les technologies suivantes :",
      assistiveTechnologiesTitle:
        'Agents utilisateurs, technologies d’assistance et outils utilisés pour vérifier l’accessibilité',
      assistiveTechnologiesText:
        'Les tests des pages web ont été effectués avec les combinaisons de navigateurs web et lecteurs d’écran suivants :',
      assistiveTechnologiesList1: 'Internet Explorer 11 et JAWS 2018',
      assistiveTechnologiesList2: 'Safari et VoiceOver sur Iphone',
      complianceVerificationPagesTitle: "Pages du site ayant fait l'objet de la vérification de conformité",
      home: 'Accueil',
      quiSommesNous: 'Qui sommes-nous ?',
      commentCaMarche: 'Comment ça marche ?',
      stats: 'Statistiques',
      aide: 'Aide',
      etape1: 'Étape 1 - Le problème',
      etape2: 'Étape 2 - La description',
      etape3: 'Étape 3 - Le commerçant',
      etape4: 'Étape 4 - Le consommateur',
      etape5: 'Étape 5 - Confirmation',
      connexionEspacePro: "Connexion à l'espace pro",
      espaceProSuivi: 'Espace pro - Suivi des signalements',
      espaceProDetail: 'Espace pro - Détail du signalement',
      espaceProEntreprises: 'Espace pro - Mes entreprises',
      espaceProGestionAcces: 'Espace pro - Gestion des accès',
      improvementContactTitle: 'Amélioration et contact',
      improvementContactText:
        'Si vous n’arrivez pas à accéder à un contenu ou à un service, vous pouvez contacter le responsable de SignalConso pour être orienté vers une alternative accessible ou obtenir le contenu sous une autre forme.',
      supportEmail: 'E-mail : support@signal.conso.gouv.fr',
      recourseTitle: 'Voie de recours',
      recourseText:
        'Cette procédure est à utiliser dans le cas suivant : vous avez signalé au responsable du site internet un défaut d’accessibilité qui vous empêche d’accéder à un contenu ou à un des services du portail et vous n’avez pas obtenu de réponse satisfaisante.',
      recourseOptions: 'Vous pouvez :',
      defenseurDesDroits: 'Écrire un message au ',
      defenseurDesDroitsLink: 'Défenseur des droits',
      defenseurDesDroitsDelegue: 'Contacter ',
      defenseurDesDroitsDelegueLink: 'le délégué du Défenseur des droits dans votre région',
      postalAddress: 'Envoyer un courrier par la poste (gratuit, ne pas mettre de timbre) :',
    },
    contact: {
      title: 'Contact',
      problemMessage: 'Vous avez rencontré un problème avec une entreprise et vous souhaitez le signaler ?',
      problemSolution: 'SignalConso est là pour ça ! Naviguez sur notre site et répondez simplement aux questions.',
      technicalIssue: 'Votre question concerne un problème technique rencontré sur SignalConso ?',
      exampleText: 'Par exemple :',
      example1: 'Vous ne trouvez pas le SIRET de l’entreprise que vous voulez signaler',
      example2: 'Vous rencontrez un bug lors de la navigation sur le site',
      example3: 'Vous ne trouvez pas la bonne catégorie pour votre problème',
      emailText: 'Dans ce cas écrivez-nous par email à',
      emailTitle:
        'Vous rencontrez un problème technique avec notre site ? Contactez-nous (ouverture de la messagerie par défaut).',
      alertDescription:
        "Cette adresse courriel n'est pas destinée au dépôt de votre signalement, qui ne pourra alors être exploité. Tout signalement doit exclusivement être déposé en suivant la procédure sur la page d'accueil du site.",
      alertTitle: 'Ne nous envoyez pas votre signalement par email... il ne sera pas lu.',
    },
    litige: {
      title: 'Vos démarches pour être remboursé ou trouver une solution à votre problème',
      step1: {
        label: 'Démarche n°1 : J’écris un courrier à l’entreprise pour demander à résoudre mon problème',
        when: 'Quand ?',
        whenDescription1: 'Le plus tôt possible (conseillé).',
        whenDescription2: 'Je peux aussi attendre de voir si l’entreprise me répond avec SignalConso.',
        toWhom: 'À qui ?',
        toWhomDescription1: 'Auprès du service client de l’entreprise.',
        toWhomDescription2:
          'Je peux trouver l’adresse du service client de l’entreprise dans mon contrat, sur son site internet ou dans les conditions générales de vente.',
        how: 'Comment ?',
        howDescription:
          'En envoyant une lettre recommandée avec accusé de réception, en y joignant les deux documents ci-joints :',
        downloadTitle: 'Ouverture de la lettre type (nouvelle fenêtre)',
        templateText: 'une lettre type à compléter (zones entre [])',
        signalementText: 'mon signalement au format PDF',
        keepCopy: 'Je garde une copie du courrier et la preuve de l’envoi.',
        why: 'Pourquoi ?',
        whyDescription:
          'Ce courrier est la preuve de ma démarche. Il est obligatoire pour entamer d’autres démarches par la suite.',
      },
      step2: {
        label:
          'Démarche n°2 : Je contacte un médiateur de la consommation, c’est-à-dire une personne chargée de régler les problèmes des consommateurs avec les entreprises',
        when: 'Quand ?',
        whenDescription:
          'Deux mois après avoir envoyé mon courrier, si je n’ai pas eu de réponse ou si la réponse ne me satisfait pas.',
        who: 'Qui ?',
        whoDescription:
          'L’entreprise a l’obligation de communiquer le nom du médiateur qu’elle a choisi. Les coordonnées du médiateur sont normalement écrites sur le site internet de l’entreprise ou sur le contrat, bon de commande…',
        how: 'Comment ?',
        howDescription: 'Je remplis le formulaire sur le site internet du médiateur ou je le contacte par voie postale.',
        why: 'Pourquoi ?',
        whyDescription: 'Le médiateur va m’aider à trouver un arrangement avec l’entreprise.',
        cost: 'Combien ça coûte ?',
        costDescription: 'C’est gratuit !',
        whatIfNoMediator: 'Comment faire si je ne trouve pas le nom du médiateur ?',
        newWindow: 'Nouvelle fenêtre',
        whatIfNoMediatorDescription1: 'Je contacte le conciliateur le plus proche de chez moi.',
        whatIfNoMediatorDescription2: 'Je le cherche sur le site ',
        whatIfNoMediatorDescription3: 'Il va m’aider à trouver une solution avec l’entreprise.',
        whatIfNoMediatorDescription4: 'C’est gratuit !',
      },
      step3: {
        label: 'Démarche n°3 : Je vais en justice, c’est-à-dire que je demande un procès au tribunal.',
        warning:
          'Attention, il est obligatoire d’avoir fait la démarche n°2 (médiateur ou conciliateur) avant de saisir le tribunal pour un litige inférieur à 5 000 euros',
        when: 'Quand ?',
        whenDescription: 'Lorsque je n’ai pas trouvé de solution avec le médiateur ou le conciliateur.',
        how: 'Comment ?',
        howConsultPage: 'En consultant la page ',
        newWindow: 'Service public - vos droits (nouvelle fenêtre)',
        why: 'Pourquoi ?',
        whyDescription: 'Pour que le juge du tribunal décide qui est en tort et quelles solutions doivent être mises en place.',
        cost: 'Combien ça coûte ?',
        costDescription:
          'Aller au tribunal est gratuit mais des frais peuvent se rajouter au cours de la procédure (frais d’avocat, frais d’expertise…).',
      },
      callOut: {
        associationCallOutTitle: 'Pour réaliser ces étapes, vous pouvez contacter une association de consommateurs',
        associationCallOutDescription1:
          "Une association de consommateurs pourra vous aider à écrire les courriers de réclamation ou de mise en demeure, contacter l'entreprise directement, vous aider à saisir la justice.",
        associationCallOutDescription2:
          "Pour bénéficier de leur aide, vous devez payer une somme, appelée « adhésion ». Pour connaître le prix de cette adhésion, vous pouvez les contacter directement. En fonction de votre situation, certaines associations peuvent baisser le prix de l'adhésion.",
        associationListTitle: 'Liste des associations de consommateurs officielles : ',
      },
    },
    SocialNetwork: {
      YOUTUBE: 'Youtube',
      FACEBOOK: 'Facebook',
      INSTAGRAM: 'Instagram',
      TIKTOK: 'TikTok',
      TWITTER: 'Twitter',
      LINKEDIN: 'LinkedIn',
      SNAPCHAT: 'Snapchat',
      TWITCH: 'Twitch',
    },
    signalconsoCatchWord: ` Signalez un problème à l’entreprise,<br/>renseignez-vous sur vos droits avec la répression des fraudes&nbsp;! `,
    yes: 'Oui',
    no: 'Non',
    search: 'Rechercher',
    edit: 'Modifier',
    next: 'Suivant',
    nextStep: 'Next step',
    close: 'Fermer',
    confirm: 'Confirmer',
    create: 'Créer',
    end: 'Fin',
    see: 'Voir',
    test: 'Test',
    date: 'Date',
    add: 'Ajouter',
    previous: 'Précédent',
    back: 'Retour',
    count: 'Nombre',
    delete: 'Supprimer',
    deleted: 'Supprimé',
    try: 'Try',
    settings: 'Paramètres',
    status: 'Statut',
    notification: 'Notification',
    notifications: 'Notifications',
    statusEdited: 'Status modifié.',
    save: 'Sauvegarder',
    saved: 'Sauvegardé',
    duplicate: 'Duplicate',
    all: 'Tous',
    anErrorOccurred: "Une erreur s'est produite.",
    minimize: 'Minimize',
    required: 'Requis',
    invalidDate: 'Date invalide',
    cancel: 'Annuler',
    help: 'Aide',
    created_at: 'Créé le',
    validated: 'Validé',
    notValidated: 'Non validé',
    configuration: 'Configuration',
    general: 'General',
    name: 'Nom',
    others: 'Autres',
    description: 'Description',
    deploy: 'Déployer',
    unknown: 'Inconnu',
    new: 'New',
    start: 'Début',
    startUp: 'Démarrer',
    inProgress: 'En cours...',
    cancelAll: `Tout annuler`,
    clear: 'Effacer',
    specify: `Précisez...`,
    removeAsk: 'Supprimer ? ',
    thisWillBeRemoved: (_: string) => `La pièce jointe <b>${_}</b> sera définitivement supprimée.`,
    exportInXLS: 'Exporter en XLS',
    removeAllFilters: 'Supprimer les filtres',
    removeReportDesc: (siret: string) => `Le signalement ${siret} sera supprimé. Cette action est irréversible.`,
    download: 'Télécharger',
    remainingTime: 'Temps restant',
    speed: 'Speed',
    key: 'Key',
    phone: 'Téléphone',
    phoneOptional: 'Téléphone (optionnel)',
    phonePlaceholder: 'ex : 0612345678',
    referenceNumberOptional: 'Numéro de référence (optionnel)',
    referenceNumberDesc:
      'Afin de faciliter le traitement de votre signalement, précisez la référence de votre dossier. Ex : numéro de billet, ou de réservation, de facture, de contrat, de client, ...',
    referenceNumberPlaceholder: 'ex : ZYX987654321',
    genderOptional: 'Civilité (optionnel)',
    value: 'Value',
    invite: 'Inviter',
    activate_all: 'Tout Activer',
    block_all: 'Tout Bloquer',
    parameters: 'Paramètres',
    startedAt: 'Démarré le',
    startedBy: 'Démarré le',
    receivedAt: 'Reçu le',
    endedAt: 'Terminé le',
    anonymous: 'Anonyme',
    active: 'Actif',
    inactive: 'Non actif',
    seeMore: 'Voir plus',
    apiToken: 'Api token',
    login: 'Connexion',
    error: 'Erreur',
    email: 'Email',
    signin: 'Connexion',
    signup: 'Inscription',
    password: 'Mot de passe',
    logout: 'Déconnexion',
    home: 'Accueil',
    consumer: 'Consommateur',
    company: 'Entreprise',
    country: 'Pays',
    countryPlaceholder: 'Ex: Italie',
    identification: 'Identification du pays',
    address: 'Adresse',
    contactAgreement: 'Accord pour contact',
    activateMyAccount: 'Activer mon compte',
    createMyAccount: 'Créer mon compte',
    invalidEmail: 'Veuillez utiliser une adresse email valide et sans accents',
    invalidName: `Veuillez renseigner une valeur sans caractères spéciaux`,
    invalidPhone: 'Téléphone invalide',
    atMost100Chars: '100 caractères maximum',
    firstName: 'Prénom',
    lastName: 'Nom',
    addCompany: `Enregistrer l'entreprise`,
    addACompany: `Enregistrer une entreprise`,
    youReceivedNewLetter: `Vous avez reçu un courrier postal ?`,
    siretOfYourCompany: `SIRET de votre entreprise`,
    siretOfYourCompanyDesc: `Il doit correspondre à la raison sociale indiquée sur le courrier.`,
    siretOfYourCompanyInvalid: `Le SIRET doit comporter 14 chiffres.`,
    activationCode: `Code d'activation`,
    activationCodeDesc: `Code à 6 chiffres indiqué sur le courrier.`,
    activationCodeInvalid: `Le code doit comporter 6 chiffres.`,
    emailDesc: `Adresse email de votre choix.`,
    activityCode: `Code d'activité`,
    days: `jours`,
    selectedPeriod: 'Période sélectionnée',
    department: 'Département',
    url: 'URL',
    departments: 'Départements',
    reports: 'Signalements',
    responseRate: '% réponse',
    report: 'Signalement',
    you: 'Vous',
    step: 'Étape',
    step_problem: `Problème`,
    step_description: `Description`,
    step_company: `Entreprise`,
    step_influencer: `Influenceur`,
    step_consumer: `Consommateur`,
    step_confirm: `Confirmation`,
    step_pageTitle_problem: `Étape : Le problème`,
    step_pageTitle_description: `Description`,
    step_pageTitle_company: `Entreprise`,
    step_pageTitle_consumer: `Consommateur`,
    step_pageTitle_confirm: `Confirmation`,
    timeFromTo: (from: number, to: number) => `De ${from}h à ${to}h`,
    detailsTextAreaTransmittable: `Ce texte sera <b>lu par l'entreprise</b>. La répression des fraudes pourra également le consulter.`,
    detailsTextAreaTransmittableAnonymous: ` Si vous ne souhaitez pas que l'entreprise connaisse votre identité, <b>ne citez rien de personnel</b>.`,
    detailsTextAreaNotTransmittable: `Ce texte sera lu <b>uniquement par la répression des fraudes.</b>`,
    detailsTextAreaEmployeeConsumer: `Rien ne sera communiqué à votre employeur.`,
    pageNotFoundTitle: `Cette adresse n'existe plus.`,
    pageNotFoundHeadTitle: `SignalConso : Page non trouvée`,
    pageNotFoundDesc: `Une nouvelle version de <b>SignalConso</b> est en ligne depuis le 4 avril 2022.<br/> La page que vous recherchez existe probablement toujours,<br/> mais son adresse a changé.`,
    month_: {
      1: 'Janvier',
      2: 'Février',
      3: 'Mars',
      4: 'Avril',
      5: 'Mai',
      6: 'Juin',
      7: 'Juillet',
      8: 'Août',
      9: 'Septembre',
      10: 'Octobre',
      11: 'Novembre',
      12: 'Décembre',
    },
    monthShort_: {
      1: 'Jan',
      2: 'Fév',
      3: 'Mars',
      4: 'Avr',
      5: 'Mai',
      6: 'Juin',
      7: 'Juil',
      8: 'Août',
      9: 'Sept',
      10: 'Oct',
      11: 'Nov',
      12: 'Déc',
    },
    gender: {
      Male: 'M',
      Female: 'Mme',
    },
    unknownGender: 'Non précisé',
    bannerCookie: `Le site SignalConso n'utilise que des cookies techniques exemptés de consentement.`,
    bannerCookieSeeMore: `En savoir plus`,
    apiErrorsCode: {
      'SC-0001': `Une erreur s'est produite`,
      'SC-0002': `L'utilisateur DGCCRF n'existe pas.`,
      'SC-0003': `Le professionnel n'existe pas.`,
      'SC-0004': `L'entreprise n'existe pas.`,
      'SC-0005': `Le site web n'existe pas.`,
      'SC-0006': `L'entreprise est déjà associée à un site.`,
      'SC-0007': `URL invalide.`,
      'SC-0008': `Email DGCCRF invalide.`,
      'SC-0009': `L'utilisateur existe déjà.`,
      'SC-0010': `L'entreprise a déjà été activée.`,
      'SC-0011': `L'entreprise n'existe pas.`,
      'SC-0012': `Le code d'activation est périmé.`,
      'SC-0013': `Le code d'activation est invalide.`,
    },
    problemDoYouWorkInCompany: `Travaillez-vous dans l'entreprise que vous souhaitez signaler ?`,
    problemDoYouWorkInCompanyNo: `Non, je n'y travaille pas`,
    problemIsInternetCompany: `Est-ce que votre problème concerne une entreprise sur internet ?`,
    problemIsInternetCompanyNo: `Non, pas sur internet`,
    problemContractualDisputeFormYes: `Résoudre mon problème personnel avec l'entreprise`,
    problemContractualDisputeFormDesc: `Exemple : recevoir mon colis, être remboursé, obtenir une réponse personnalisée, ...`,
    problemContractualDisputeFormNo: `Signaler un problème pour que l'entreprise s'améliore`,
    problemContractualDisputeFormNoDesc: `Exemple : respect des délais, meilleur affichage des prix, hygiène irréprochable, ...`,
    problemContractualDisputeFormReponseConso: `M’informer sur mes droits auprès de la répression des fraudes`,
    consumerWishFixContractualDispute: `Votre signalement sera transmis à l'entreprise. La répression des fraudes ne s'occupe pas de résoudre les problèmes
    individuels, mais <strong>faire le signalement peut inciter l'entreprise à vous répondre.</strong>`,
    consumerWishCompanyImprovement: `Votre signalement sera transmis à l'entreprise. Vous aurez la possibilité de rester anonyme.`,
    consumerWishGetAnswer: `Un agent vous répondra sous les plus brefs délais.`,
    consumerWishInvestigationIsPossible:
      "La répression des fraudes pourra décider de mener une enquête sur l'entreprise grâce à vos informations.",
    consumerWishInvestigationIsPossible2:
      'Si les signalements sont trop nombreux ou fréquents pour un établissement, les enquêteurs de la répression des fraudes interviendront auprès des professionnels.',
    informationRatingSaved: `Votre avis a bien été enregistré, nous vous en remercions.`,
    informationTitle: `Emmh, nous ne pouvons pas traiter votre signalement.`,
    informationReportOutOfScope: `Nous ne doutons pas que vous ayez réellement rencontré un problème mais... il ne s’agit pas d’une fraude.`,
    informationWasUsefull: `Est-ce que cette information vous a été utile ?`,
    buttonReportProblem: `Signalez un problème`,
    logoAltSignalconso: `Logo SignalConso / Retour à la page d'accueil`,
    logoAltGouv: `Logo gouvernement`,
    invalidSize: (maxSize: number) => `La taille du fichier dépasse les ${maxSize} Mb`,
    invalidFileNameSize: (maxSize: number) => `Le nom du fichier ne doit pas dépasser ${maxSize} caractères`,
    limitTo500chars: `500 caractères maximum`,
    continue: `Continuer`,
    suggestion: `Voulez vous dire :`,
    continueWithWebsite: (website: string) => `Continuer avec ${website}`,
    invalidUrlPattern: `Ça ne ressemble pas à un site internet`,
    noAttachment: 'Aucune pièce jointe.',
    addAttachmentFile: 'Ajouter une pièces jointe',
    attachments: `Pièces jointes`,
    backToHome: `Revenir à l'accueil`,
    city: `Ville`,
    attachmentsDescAnonymous: `Si vous ne souhaitez pas que l'entreprise connaisse votre identité, <b style="color: black">cachez votre nom</b> sur vos pièces jointes.`,
    attachmentsDescAllowedFormat: (formats: string[]) => `Sont acceptés les formats suivants : ${formats.join(', ')}`,
    attachmentsDesc2: `Ajouter une pièce jointe augmente <strong>FORTEMENT</strong> vos chances d’entraîner une mesure corrective&nbsp;!<br/> Vous ne devez pas communiquer de données dites "sensibles" (données bancaires ou médicales).`,
    menu_howItWorks: `Comment ça marche ?`,
    menu_home: `Accueil`,
    menu_help: `Aide`,
    menu_authSpace: `Espace pro`,
    website: 'Site internet',
    canYouIdentifyCompany: `Pouvez-vous identifier l'entreprise  ?`,
    canYouIdentifyCompanyDesc: `SignalConso en a besoin pour la contacter et informer la répression des fraudes.`,
    websitePlaceholder: 'Exemple: https://www.site.fr',
    identifyBy_name: `Par son nom et son code postal`,
    identifyBy_nameDesc: `Entreprise française uniquement`,
    identifyBy_identity: `Par son SIRET ou SIREN ou RCS`,
    identifyBy_none: `Je ne peux pas identifier l'entreprise ou l'entreprise est à l'étranger`,
    identifyBy_noneDesc: `Si vous ne parvenez pas à identifier l'entreprise, vous pouvez continuer votre signalement.
      Il ne sera pas transmis à l'entreprise, sauf si cette dernière est française et identifiable par l'équipe de SignalConso.
      Dans tous les cas les enquêteurs de la répression des fraudes en seront informés.`,
    couldYouPrecise: `Pouvez-vous préciser ?`,
    cantIdentifyCompany: `Comme vous ne pouvez pas identifier l'entreprise, merci de préciser votre localisation afin que nous puissions rediriger votre signalement vers le bon service`,
    cantIdentifyWebsiteCompany: `Comme vous ne pouvez pas identifier l'entreprise liée au site internet, merci de préciser votre localisation afin que nous puissions rediriger votre signalement vers le bon service`,
    cantIdentifyLocationCompany: `Comme vous ne pouvez pas identifier l'entreprise qui est venue à votre domicile, merci de préciser votre localisation afin que nos services puissent tenter de rapprocher ces informations avec celles qu'auraient éventuellement déposées vos voisins, ayant été en contact avec la même entreprise que vous`,
    cantIdentifyPhoneCompany: `Comme vous ne pouvez pas identifier l'entreprise que vous avez eu par téléphone, merci de préciser votre localisation afin que nos services puissent tenter de rapprocher ces informations avec celles qu'auraient éventuellement déposées vos voisins, ayant été en contact avec la même entreprise que vous`,
    companyIdentityLabel: `Numéro SIRET ou SIREN ou RCS de l'entreprise`,
    companyIdentityPlaceholder: `Ex: 83350861700010`,
    postalCode: `Code postal`,
    youCanSearchByCity: `Vous pouvez chercher par ville ou saisir le code postal`,
    aboutCompany: `Informations sur l'entreprise`,
    selectCompany: `Sélectionnez l'entreprise`,
    verify: `Vérifier`,
    isHeadOffice: 'Siège social',
    governmentCompany: 'Administration publique',
    cannotReportGovernmentCompany: 'Impossible de signaler une administration publique.',
    selectCompanyDesc: `Si l'entreprise n'est pas celle recherchée, vous pouvez modifier votre recherche.`,
    isAFrenchCompany: `Est-ce que l'entreprise est en France ?`,
    noItsForeign: `Non, elle est à l'étranger`,
    companyHowToFindCountry: `Comment retrouver le pays d'une entreprise ?`,
    iDontKnown: `Je ne sais pas`,
    phoneNumberHavingCalled: `Numéro de téléphone vous ayant contacté`,
    phoneNumberHavingCalledPlaceholder: `Ex: 06 00 00 00 00`,
    noMatchingCompany: `Aucun établissement ne correspond à la recherche.`,
    youCanOnlyReportFrenchCompanies: `Vous pouvez identifier des entreprises privées établies en France uniquement.`,
    yourStreet: `Votre rue`,
    yourStreetDesc: `Le n° de rue n'est pas nécessaire`,
    yourStreetPlaceholder: `Ex: avenue de Ségur`,
    yourPostalCode: `Votre code postal`,
    yourPostalCodePlaceholder: `Ex: 41110`,
    yourCity: `Votre ville`,
    noOptionsText: `Aucun résultat`,
    loading: `Chargement...`,
    yourCityPlaceholder: `Ex: Lyon`,
    continueReport: `Vous avez un signalement en cours`,
    reportedCompanyName: `Nom ou enseigne de l'entreprise signalée`,
    reportedCompanyNamePlaceholder: `Ex: Boulangerie Petit Jean`,
    companyIdentifiedTitle: `Entreprise identifiée`,
    influencerIdentifiedTitle: `Influenceur ou influenceuse identifié(e)`,
    companyIdentityHelperWhere: `Où trouver ces identifiants ?`,
    companyIdentityHelper: `A quoi correspondent ces identifiants ?`,
    companyIdentityHelperWhereDesc: `
      Vous pouvez retrouver ce numéro sur un devis, une facture ou un ticket de caisse émis par l’entreprise et également dans les mentions légales de son site internet.<br/>
      <b>Comment faire ?</b><br/>
      Descendez en bas de la page internet d’accueil du site en question :
    `,
    companyIdentityHelperWhereDesc2: `
      Cliquez sur le texte « Mentions légales », une nouvelle page va s’ouvrir sur laquelle vous trouverez facilement ce numéro :
    `,
    consumerTitle: `Vos coordonnées nous permettent d'authentifier votre signalement`,
    consumerAskCodeTitle: `Saisissez le code de validation`,
    consumerAskCodeDesc: (email: string) => `Un email vous a été envoyé à l'adresse <b>${email}</b>`,
    consumerCodePlaceholder: `______`,
    consumerEmailMayTakesTime: `L'envoi de l'email peut prendre quelques minutes`,
    consumerInvalidCode: `Code incorrect`,
    consumerResentEmail: `Renvoyer`,
    consumerDummyEmailNotAccepted: `Les adresses éphémères ne sont pas acceptées.`,
    consumerValidationCodeExpired: `Code incorrect, veuillez réessayer.`,
    consumerValidationCodeInvalid: `Code incorrect, veuillez réessayer.`,
    consumerIsEmployee: `
      <strong>Vous déclarez travailler dans l'entreprise que vous allez signaler.</strong>
      <p>
        Votre signalement sera lu <b>uniquement par la répression des fraudes</b>.
        <br/>
        Vos coordonnées sont à destination des enquêteurs uniquement.
        Ils peuvent être amenés à vous contacter afin de vérifier votre identité et votre signalement.
      </p>
      Votre employeur ne sera pas mis au courant de votre signalement.
      <br/>
      Pendant l'enquête, si les enquêteurs ont besoin de révéler votre identité à la justice ou à votre employeur, ils vous demanderont l'autorisation avant.
      <b>Vous pourrez refuser.</b>
    `,
    consumerAnonymousInformation: `Vous restez anonyme, mais l'entreprise ne sera pas en mesure de résoudre votre problème en particulier. Pas de
    remboursement, de réponse personnalisée, ...`,
    confirmationTitle: `Récapitulatif de votre problème`,
    confirmationAlertTransmittable: `Vérifiez votre signalement avant de l’envoyer à l'entreprise et à la répression des fraudes.`,
    confirmationAlert: `Vérifiez votre signalement avant de l’envoyer à la répression des fraudes.`,
    contactAgreementTrueTitle: `Je partage`,
    contactAgreementTrueDesc: `mes coordonnées, et mon numéro de référence, avec l'entreprise afin qu'elle puisse me contacter dans le cadre de mon signalement (<b>uniquement</b>). J'ai conscience que la répression des fraudes n'aura pas accès à ces échanges éventuels et ne pourra donc pas les contrôler.`,
    contactAgreementFalseTitle: `Je ne partage pas`,
    contactAgreementFalseDesc: `mes coordonnées, ni mon numéro de référence, avec l'entreprise. Seule la répression des fraudes pourra en prendre connaissance.`,
    companySelectCountryTitle: `Sélectionnez le pays de l'entreprise`,
    companyWebsiteVendorAlert: `L'entreprise sélectionnée est une place de marché (marketplace), c'est à dire qu'elle propose des produits vendus par des tiers.`,
    companyWebsiteVendorTitle: `Pouvez-vous identifier le vendeur ?`,
    companyWebsiteVendorLabel: `Nom du vendeur tiers`,
    companyWebsiteVendorDesc: (companyName: string) => `Uniquement si le vendeur n'est pas ${companyName}`,
    companyIdentityHelperDesc: `
    SIRET, SIREN et RCS sont des identifiants de l'entreprise.<br/>
    Le SIRET est composé de 14 chiffres, le SIREN est composé de 9 chiffres.<br/>
    Le RCS est composé de:<br/>
      <ul>
        <li>la mention "RCS"</li>
        <li>le nom de la ville d'immatriculation</li>
        <li>une lettre (A ou B)</li>
        <li>le numéro SIREN</li>
      </ul>
    `,
    noMatchingCompanyDesc: `Veuillez modifier votre recherche ou rechercher avec les identifiants de l'entreprise.`,
    howToFindCompanyCountry: ``,
    howToFindCompanyCountryDesc: `
      Rendez-vous sur le site internet de l'entreprise, dans l'une des rubriques suivantes :
      <ul>
        <li>les mentions légales</li>
        <li>les Conditions Générales de Vente (CGV)</li>
        <li>les conditions d'utilisation</li>
      </ul>
      Dans la plupart des cas, vous trouverez l'accès à ces rubriques tout en bas de la page d'accueil du site. L'adresse de l'entreprise devrait être indiquée dans l'une de ces rubriques.<br/>
      Attention, il est possible que deux sociétés différentes soient mentionnées sur ces pages. L'une d'elle correspond à l'hébergeur du site. Ce n'est pas l'adresse de cet hébergeur que l'on cherche.
    `,
    confirmationBtnReponseConso: `Envoyer ma question`,
    confirmationBtn: `Envoyer le signalement`,

    acceptedReportStat: `promesses d'action ont été faites par des entreprises depuis le début de SignalConso`,
    acceptedReportStatName: `Nombre de promesses d'action`,

    reportsCountStat: ` signalements ont été déposés depuis le début de SignalConso`,
    reportsCountStatName: ` Nombre de signalements déposés`,

    transmittedRateStat: ` des signalements ont été transmis à l'entreprise signalée`,
    transmittedRateDescription: `Pourquoi pas 100 % ? Car dans certaines cas (achat en ligne...) les entreprises n'ont pas pu être identifiées par le consommateur`,
    transmittedRateStatName: `% de signalements transmis aux entreprises`,

    readRateStat: ` des signalements transmis ont été lus par les entreprises`,
    readRateDescription: `Pourquoi pas 100 % ? Car SignalConso est facultatif. L'entreprise est libre de créer un compte et de lire le signalement.`,
    readRateStatName: `Signalements lus par les entreprises`,

    respondedRateStat: ` ont eu une réponse de l'entreprise, sur l'ensemble des signalements lus`,
    respondedRateDescription: `Lorsqu'une entreprise reçoit un signalement, elle peut décider de répondre ou non au consommateur.`,
    respondedRateStatName: `% de signalements qui font l'objet d'une réponse d'un entreprise`,

    websiteReportsRateStat: ` des signalements déposés depuis le début de SignalConso concernent une entreprise sur internet`,
    searchCategoryPlaceholder: `Rechercher une catégorie par mot clé (BETA)`,
    noResultFound: `Aucun résultat trouvé.`,
    displayAllAnomalies: `Afficher toutes les catégories`,
    browserCompatMessage: `Votre navigateur web est obsolète. Si vous n'utilisez pas la version la plus récente de votre navigateur, vous risquez de rencontrer certains problèmes lors de l'utilisation de SignalConso.`,
  },
}
