export interface PageDefinition {
  title: string
  description: string
}

export type PageDefinitions = typeof pageDefinitions

export const pageDefinitions = {
  default: {
    title: 'SignalConso, un service public pour les consommateurs',
    description:
      "Signalez un problème au commerçant (magasins, commerces de proximité, cafés et restaurants...) et à la répression des fraudes : pratique d'hygiène, nourriture / boissons, matériel / objet, prix / paiement, publicité, services associés à l'achat.",
  },
  quiSommesNous: {
    title: 'Qui sommes-nous ? - SignalConso',
    description:
      "SignalConso est un service proposé par la DGCCRF (Direction Générale de la Concurrence, de la Consommation et de la Répression des Fraudes) au travers d'une Startup d’État. Il permet à la fois de comprendre ses droits en tant que consommateurs et d’être aidé pour les faire respecter.",
  },
  notfound: {
    title: '404 Page non trouvée - SignalConso',
    description:
      "SignalConso est un service proposé par la DGCCRF (Direction Générale de la Concurrence, de la Consommation et de la Répression des Fraudes) au travers d'une Startup d’État. Il permet à la fois de comprendre ses droits en tant que consommateurs et d’être aidé pour les faire respecter.",
  },
  unavailable: {
    title: 'Page en maintenance - SignalConso',
    description:
      "SignalConso est un service proposé par la DGCCRF (Direction Générale de la Concurrence, de la Consommation et de la Répression des Fraudes) au travers d'une Startup d’État. Il permet à la fois de comprendre ses droits en tant que consommateurs et d’être aidé pour les faire respecter.",
  },
  commentCaMarche: {
    title: 'Comment ça marche ? - SignalConso',
    description:
      "Vous signalez votre problème en remplissant le formulaire en ligne. Notre équipe contacte l'entreprise afin de l'informer de votre signalement. L'entreprise peut procéder spontanément aux corrections utiles, sans sanction. Votre signalement est enregistré à la répression des fraudes (DGCCRF).",
  },
  centreAide: {
    title: "Centre d'aide - SignalConso",
    description: "Consultez l'aide et les questions fréquentes sur SignalConso",
  },
  accessibilite: {
    title: 'Accessibilité - SignalConso',
    description: "Rapport d'accessibilité SignalConso",
  },
  planDuSite: {
    title: 'Plan du site - SignalConso',
    description: 'Plan du site',
  },
  conditionsGeneralesUtilisation: {
    title: "Conditions générales d'utilisation - SignalConso",
    description: "Consultez les conditions générales d'utilisation",
  },
  stats: {
    title: 'Statistiques - SignalConso',
    description: 'Consultez les statistiques de SignalConso',
  },
  suiviEtViePrivee: {
    title: "Suivi d'audience et vie privée - SignalConso",
    description: "Consultez les informations concernant le suivi d'audience et le respect de la vie privée sur SignalConso",
  },
  cookies: {
    title: 'Gestion des cookies - SignalConso',
    description: 'Consultez les informations concernant la gestion des cookies sur SignalConso',
  },
  contact: {
    title: 'Contact - SignalConso',
    description: 'Trouvez le bon interlocuteur à contacter sur SignalConso',
  },
  report_problem: {
    title: 'Le problème - SignalConso',
    description: 'Précisez le problème associé à votre signalement sur SignalConso',
  },
  report_details: {
    title: 'La description - SignalConso',
    description: 'Apportez des détails à votre signalement sur SignalConso',
  },
  report_company: {
    title: "L'entreprise - SignalConso",
    description: "Identifiez l'entreprise concernée par votre signalement sur SignalConso",
  },
  report_consumer: {
    title: 'Le consommateur - SignalConso',
    description: 'Renseignez vos coordonnées pour authentifier votre signalement sur SignalConso',
  },
  report_confirmation: {
    title: 'Confirmation - SignalConso',
    description: 'Confirmez votre signalement sur SignalConso',
  },
  report_information: {
    title: 'Information - SignalConso',
    description: "Page d'information concernant votre signalement sur SignalConso",
  },
  contractualDispute: {
    title: "Résolution d'un problème individuel (litige) - SignalConso",
    description: 'Démarches conseillées par SignalConso pour résoudre un problème individuel (litige) avec une entreprise ',
  },
  anomaly: {
    title: 'Arborescence',
    description: "Arborescence du dépot d'un signalement",
  },
}
