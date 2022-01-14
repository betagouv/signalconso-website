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
    anErrorOccurred: 'Une erreur s\'est produite.',
    minimize: 'Minimize',
    required: 'Requis',
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
    clear: 'Clear',
    cron: 'Cron',
    removeAsk: 'Supprimer ? ',
    thisWillBeRemoved: (_: string) => `La pièce jointe <b>${_}</b> sera définitivement supprimée.`,
    exportInXLS: 'Exporter en XLS',
    removeAllFilters: 'Supprimer les filtres',
    removeReportDesc: (siret: string) => `Le signalement ${siret} sera supprimé. Cette action est irréversible.`,
    download: 'Télécharger',
    remainingTime: 'Temps restant',
    forgottenPassword: 'Mot de passe oublié',
    forgottenPasswordDesc: 'Vous recevrez un email vous permettant de créer un nouveau mot de passe.',
    createNewPassword: 'Créer un nouveau mot de passe',
    speed: 'Speed',
    key: 'Key',
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
    identification: 'Identification du pays',
    address: 'Adresse',
    activateMyAccount: 'Activer mon compte',
    createMyAccount: 'Créer mon compte',
    atLeast8Characters: '8 caractères minimum',
    invalidEmail: 'Email invalide',
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
    step_problem: `Problème`,
    step_description: `Description`,
    step_company: `Entreprise`,
    step_consumer: `Consommateur`,
    step_confirm: `Confirmation`,
    timeFromTo: (from: number, to: number) => `De ${from}h à ${to}h`,
    detailsTextAreaTransmittable: `Ce texte sera <b>lu par l'entreprise</b>. La répression des fraudes pourra également le consulter. Si vous ne souhaitez pas que l'entreprise connaisse votre identité, <b>ne citez rien de personnel</b>.`,
    detailsTextAreaNotTransmittable: `Ce texte sera lu <b>uniquement par la répression des fraudes.</b>`,
    detailsTextAreaEmployeeConsumer: `Rien ne sera communiqué à votre employeur.`,
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
    logoAltSignalconso: `Logo SignalConso / Retour à la page d'accueil`,
    logoAltGouv: `Logo gouvernement`,
    limitTo500chars: `500 caractères maximum?`
  },
}
