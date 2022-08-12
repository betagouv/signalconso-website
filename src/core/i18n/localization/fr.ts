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
    // signalconsoCatchWord: `Signaler un problème à <b>l&apos;entreprise</b> <br/> en toute transparence avec <b>la répression des fraudes</b> !`,
    // signalconsoCatchWord: `Signaler un problème à l&apos;entreprise<br/> en toute transparence avec la répression des fraudes !`,
    signalconsoCatchWord: ` Signalez un problème à <b>l’entreprise</b>,<br/>renseignez-vous sur vos droits avec <b>la répression des fraudes</b> ! `,
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
    invalidPhone: 'Téléphone invalide',
    atMost100Chars: '100 caractères maximum',
    firstName: 'Prénom',
    lastName: 'Nom',
    addCompany: `Enregister l'entreprise`,
    addACompany: `Enregister une entreprise`,
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
    step_consumer: `Consommateur`,
    step_confirm: `Confirmation`,
    step_pageTitle_problem: `Étape : Le problème`,
    step_pageTitle_description: `Description`,
    step_pageTitle_company: `Entreprise`,
    step_pageTitle_consumer: `Consommateur`,
    step_pageTitle_confirm: `Confirmation`,
    timeFromTo: (from: number, to: number) => `De ${from}h à ${to}h`,
    detailsTextAreaTransmittable: `Ce texte sera <b>lu par l'entreprise</b>. La répression des fraudes pourra également le consulter.`,
    detailsTextAreaTransmittableAnonymous: `Si vous ne souhaitez pas que l'entreprise connaisse votre identité, <b>ne citez rien de personnel</b>.`,
    detailsTextAreaNotTransmittable: `Ce texte sera lu <b>uniquement par la répression des fraudes.</b>`,
    detailsTextAreaEmployeeConsumer: `Rien ne sera communiqué à votre employeur.`,
    pageNotFoundTitle: `Cette adresse n'existe plus.`,
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
    bannerCookie: `Le site Signal Conso n'utilise que des cookies techniques exemptés de consentement.`,
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
    problemContractualDisputeTitle: `Ce problème est un litige`,
    problemContractualDisputeDesc: `C'est-à-dire un problème individuel entre l’entreprise et vous. La répression des fraudes ne s’occupe pas directement de résoudre des problèmes individuels.`,
    problemContractualDisputeInfoTitle: `Pourquoi faire un signalement ?`,
    problemContractualDisputeInfo: `
      <ul>
        <li>
          <strong>Pour augmenter vos chances de trouver une solution avec l'entreprise:</strong>
          50% des professionnels apportent une réponse au signalement.
        </li>
        <li>
          <strong>Pour l’acte citoyen:</strong>
          les enquêteurs de la répression des fraudes ne vont pas résoudre directement votre problème mais pourront lancer une enquête
          auprès de l’entreprise grâce à vos informations.
        </li>
        <li>
          <strong>Pour faire les bonnes démarches:</strong>
          SignalConso vous guide dans la marche à suivre pour trouver une solution ou obtenir réparation.
        </li>
      </ul>
    `,
    informationRatingSaved: `Votre avis a bien été enregistré, nous vous en remercions.`,
    informationTitle: `Emmh, nous ne pouvons pas traiter votre signalement.`,
    informationReportOutOfScope: `Nous ne doutons pas que vous ayez réellement rencontré un problème mais... il ne s’agit pas d’une fraude.`,
    informationWasUsefull: `Est-ce que cette information vous a été utile ?`,
    buttonReportProblem: `Signaler un problème`,
    logoAltSignalconso: `Logo SignalConso / Retour à la page d'accueil`,
    logoAltGouv: `Logo gouvernement`,
    invalidSize: (maxSize: number) => `La taille du fichier dépasse les ${maxSize} Mb`,
    invalidFileNameSize: (maxSize: number) => `Le nom du fichier ne doit pas dépasser ${maxSize} caractères`,
    limitTo500chars: `500 caractères maximum`,
    continue: `Continuer`,
    invalidUrlPattern: `Ça ne ressemble pas à un site internet`,
    noAttachment: 'Aucune pièce jointe.',
    addAttachmentFile: 'Ajouter une pièces jointe',
    attachments: `Pièces jointes`,
    backToHome: `Revenir à l'accueil`,
    city: `Ville`,
    attachmentsDescAnonymous: `Si vous ne souhaitez pas que l'entreprise connaisse votre identité, <b>cachez votre nom</b> sur vos pièces jointes.`,
    attachmentsDesc2: `Ajouter une pièce jointe augmente de 83 % la chance d'entrainer une mesure corrective ! Vous ne devez pas communiquer de données dites "sensibles" (données bancaires ou médicales).`,
    menu_howItWorks: `Comment ça marche ?`,
    menu_home: `Accueil`,
    menu_help: `Centre d'aide`,
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
    cantIdentifyCompany: `Comme vous ne pouvez pas identifier l'entreprise qui est venue à votre domicile, merci de préciser votre localisation afin que nos services puissent tenter de rapprocher ces informations avec celles qu'auraient éventuellement déposées vos voisins, ayant été en contact avec la même entreprise que vous`,
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
    phoneNumberHavingCalled: `Numéro de téléphone vous ayant appelé`,
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
    consumerEmailMayTakesTime: `L'envoie de l'email peut prendre quelques minutes`,
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
  },
}
