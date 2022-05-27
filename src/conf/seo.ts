export interface Seo {
  [key: string]: {
    title: string
    description: string
  }
}

const anomaly: Seo = {
  MAG: {
    title: `Signalez un achat en magasin ou sur internet à la répression des fraudes`,
    description: `Vous avez eu un problème de prix, sur une promotion ou de qualité. Vous n'avez pas reçu votre commande ou celle-ci est abîmée, le service client n'est pas joignable ou insatisfaisant…`,
  },
  TEL: {
    title: `Signalez un problème de forfait à la répression des fraudes`,
    description: `Votre opérateur vous a facturé des options non souscrites, votre abonnement mobile ou box est en augmentation ou a été reconduit abusivement, vous avez un doute sur les frais de résiliation.`,
  },
  INTERNET: {
    title: `Signalez un problème d'arnaque en ligne à la répression des fraudes`,
    description: `Vous avez été victime d'une publicité trompeuse sur internet, vous souhaitez signaler un influenceur sponsorisé qui n'indique pas sa rémunération par une marque…`,
  },
  SANT: {
    title: `Signalez un problème avec un professionnel de santé à la répression des fraudes`,
    description: `Vous avez eu un reste à charge trop élevé, un non-respect du 100% santé, n'avez pas eu de devis par votre clinique, hôpital, opticien ou les effets mis en avant en parapharmacie sont trompeurs…`,
  },
  TRAV: {
    title: `Signalez un problème de travaux ou rénovation à la répression des fraudes`,
    description: `Vous avez fait intervenir un artisan (serrurier, plombier, isolation, pompe à chaleur, chaudière, prime rénov, fenêtre, …) et vous avez un souci de délais d'exécution, de devis, malfaçon, …`,
  },
  CR: {
    title: `Signalez un problème avec un café / restaurant à la répression des fraudes`,
    description: `Les descriptions sont incorrectes (origine, fait maison, allergènes, hallal). L'établissement est sale, insalubre, problème de fraîcheur, d'hygiène, intoxication ou problème à la commande / livraison`,
  },
  SERV: {
    title: `Signalez un problème avec un service / prestation à la répression des fraudes`,
    description: `Vous avez un problème avec un organisme de formation, coiffeur, esthéticien, tatoueur, ménage, déménageur, aide à domicile, garde ou accompagnement d'enfants…`,
  },
  ELEC: {
    title: `Signalez un problème d'eau, gaz ou électricité à la répression des fraudes`,
    description: `Vous avez un problème de contrat, de prélèvement, une facture excessive, un dépassement de consommation ou vous avez eu une fuite d'eau, de canalisation.`,
  }
}

export const seo = {
  anomaly,
}
