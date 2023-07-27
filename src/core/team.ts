import {AppLang, AppLangs} from '../i18n/localization/AppLangs'

export interface TeamMember {
  name: string
  role: string[]
  avatar: string
}

const trad = (lang: AppLang) => {
  const t = {
    en: {
      function: {
        headOfProduct: 'Head of product',
        headOfProductIntern: 'Head of product (intern)',
        bussinesDev: 'Business developer',
        bussinesCoach: 'Business coach',
        dev: 'Software developer',
      },
      dgccrfJob: {
        inspector: 'DGCCRF inspector',
        civilServant: 'Civil servant',
      },
    },
    fr: {
      function: {
        headOfProduct: 'Chef de produit',
        headOfProductIntern: 'Chef de produit stagiaire',
        bussinesDev: 'Chargé de déploiement',
        bussinesCoach: "Coach Startup d'État",
        dev: 'Développeur informatique',
      },
      dgccrfJob: {
        inspector: 'Inspecteur DGCCRF',
        civilServant: "Attaché d'administration de l'état",
      },
    },
  }

  return lang ? t[lang] : t[AppLangs.fr]
}

export const team = (lang: AppLang) => {
  const t = trad(lang)

  return {
    current: [
      {
        name: 'Guillaume Rossmann',
        role: [t.function.headOfProduct, t.dgccrfJob.inspector],
        avatar: 'avatar-guillaumerossmann.png',
      },
      {
        name: 'Aline Gauthier',
        role: [t.function.headOfProductIntern],
        avatar: 'avatar-aline.png',
      },
      {
        name: 'Ingrid Godefroy',
        role: [t.function.bussinesDev],
        avatar: 'avatar-ingridgodefroy.png',
      },
      {
        name: 'Guillaume de Gérando',
        role: [t.function.bussinesDev, t.dgccrfJob.civilServant],
        avatar: 'avatar-guillaumedegerando.png',
      },
      {
        name: 'Nathaniel Richand',
        role: [t.function.bussinesCoach],
        avatar: 'avatar-nathanielrichand.png',
      },
      {
        name: 'Saïd Sedoud',
        role: [t.function.dev],
        avatar: 'avatar-saidsedoud.png',
      },
      {
        name: 'Emmanuel Letailleur',
        role: [t.function.dev],
        avatar: 'avatar-emmanuel.png',
      },
      {
        name: 'Charles Dufour',
        role: [t.function.dev],
        avatar: 'avatar-charles.png',
      },
      {
        name: 'Nicolas Serra',
        role: [t.function.dev],
        avatar: 'avatar-nicolas.png',
      },
    ],
    former: [
      {
        name: 'Alexandre Annic',
        role: [t.function.dev],
        avatar: 'avatar-alexandreannic.png',
      },
      {
        name: 'Quentin Kurtz',
        role: [t.function.bussinesDev],
        avatar: 'avatar-quentinkurtz.png',
      },
      {
        name: 'Jérôme Rivals',
        role: [t.function.dev],
        avatar: 'avatar-jerome.png',
      },
      {
        name: 'Julien Rayneau',
        role: [t.function.bussinesCoach],
        avatar: 'avatar-julien.png',
      },
      {
        name: 'Magali Marcel',
        role: [t.function.headOfProduct, t.dgccrfJob.inspector],
        avatar: 'avatar-magali.png',
      },
      {
        name: 'Valentine Michaud',
        role: [t.function.bussinesDev],
        avatar: 'avatar-valentine.png',
      },
      {
        name: 'Jules Garavelli',
        role: [t.function.bussinesDev],
        avatar: 'avatar-jules.png',
      },
      {
        name: 'Grégoire Aubert',
        role: [t.function.bussinesDev],
        avatar: 'avatar-gregoire.png',
      },
      {
        name: 'Agnès Mayanobe',
        role: [t.function.bussinesDev, t.dgccrfJob.inspector],
        avatar: 'avatar-agnes.png',
      },
      {
        name: 'Thomas Chaumeny',
        role: [t.function.dev],
        avatar: 'avatar-thomas.png',
      },
      {
        name: 'Pierre-Olivier Mauguet',
        role: [t.function.dev],
        avatar: 'avatar-pierre-olivier.png',
      },
      {
        name: 'Franck Coufourier',
        role: [t.function.dev],
        avatar: 'avatar-franck.png',
      },
      {
        name: 'Alexandre Michel',
        role: [t.function.bussinesDev],
        avatar: 'avatar-alexandre.png',
      },
    ],
  }
}
