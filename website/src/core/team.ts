import imgAgnes from '@/img/avatars/avatar-agnes.png'
import imgAlexandre from '@/img/avatars/avatar-alexandre.png'
import imgAlexandreannic from '@/img/avatars/avatar-alexandreannic.png'
import imgAline from '@/img/avatars/avatar-aline.png'
import imgCharles from '@/img/avatars/avatar-charles.png'
import imgEmmanuel from '@/img/avatars/avatar-emmanuel.png'
import imgFranck from '@/img/avatars/avatar-franck.png'
import imgGregoire from '@/img/avatars/avatar-gregoire.png'
import imgGuillaumedegerando from '@/img/avatars/avatar-guillaumedegerando.png'
import imgGuillaumerossmann from '@/img/avatars/avatar-guillaumerossmann.png'
import imgHakimsedoud from '@/img/avatars/avatar-hakimsedoud.png'
import imgIngridgodefroy from '@/img/avatars/avatar-ingridgodefroy.png'
import imgJerome from '@/img/avatars/avatar-jerome.png'
import imgJules from '@/img/avatars/avatar-jules.png'
import imgJulien from '@/img/avatars/avatar-julien.png'
import imgMagali from '@/img/avatars/avatar-magali.png'
import imgNathanielrichand from '@/img/avatars/avatar-nathanielrichand.png'
import imgNicolas from '@/img/avatars/avatar-nicolas.png'
import imgPierre from '@/img/avatars/avatar-pierre-olivier.png'
import imgQuentinkurtz from '@/img/avatars/avatar-quentinkurtz.png'
import imgSaidsedoud from '@/img/avatars/avatar-saidsedoud.png'
import imgThomas from '@/img/avatars/avatar-thomas.png'
import imgValentine from '@/img/avatars/avatar-valentine.png'
import {StaticImageData} from 'next/image'
import {AppLang, AppLangs} from '../i18n/localization/AppLangs'

export type TeamMember = {
  name: string
  role: string[]
  avatar: StaticImageData
}
type Team = {
  current: TeamMember[]
  former: TeamMember[]
}

const trad = (lang: AppLang) => {
  const t = {
    en: {
      function: {
        headOfProduct: 'Product manager',
        headOfProductIntern: 'Product manager (intern)',
        bussinesDev: 'Business developer',
        bussinesCoach: 'Product coach',
        dev: 'Software developer',
        devIntern: 'Software developer (intern)',
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
        devIntern: 'Développeur informatique stagiaire',
      },
      dgccrfJob: {
        inspector: 'Inspecteur DGCCRF',
        civilServant: "Attaché d'administration de l'État",
      },
    },
  }

  return lang ? t[lang] : t[AppLangs.fr]
}

export function getTeam(lang: AppLang): Team {
  const t = trad(lang)
  return {
    current: [
      {
        name: 'Guillaume Rossmann',
        role: [t.function.headOfProduct, t.dgccrfJob.inspector],
        avatar: imgGuillaumerossmann,
      },
      {
        name: 'Aline Gauthier',
        role: [t.function.headOfProduct],
        avatar: imgAline,
      },
      {
        name: 'Ingrid Godefroy',
        role: [t.function.bussinesDev],
        avatar: imgIngridgodefroy,
      },
      {
        name: 'Guillaume de Gérando',
        role: [t.function.bussinesDev, t.dgccrfJob.civilServant],
        avatar: imgGuillaumedegerando,
      },
      {
        name: 'Nathaniel Richand',
        role: [t.function.bussinesCoach],
        avatar: imgNathanielrichand,
      },
      {
        name: 'Saïd Sedoud',
        role: [t.function.dev],
        avatar: imgSaidsedoud,
      },
      {
        name: 'Emmanuel Letailleur',
        role: [t.function.dev],
        avatar: imgEmmanuel,
      },
      {
        name: 'Charles Dufour',
        role: [t.function.dev],
        avatar: imgCharles,
      },
      {
        name: 'Nicolas Serra',
        role: [t.function.dev],
        avatar: imgNicolas,
      },
    ],
    former: [
      {
        name: 'Hakim Sedoud',
        role: [t.function.devIntern],
        avatar: imgHakimsedoud,
      },
      {
        name: 'Alexandre Annic',
        role: [t.function.dev],
        avatar: imgAlexandreannic,
      },
      {
        name: 'Quentin Kurtz',
        role: [t.function.bussinesDev],
        avatar: imgQuentinkurtz,
      },
      {
        name: 'Jérôme Rivals',
        role: [t.function.dev],
        avatar: imgJerome,
      },
      {
        name: 'Julien Rayneau',
        role: [t.function.bussinesCoach],
        avatar: imgJulien,
      },
      {
        name: 'Magali Marcel',
        role: [t.function.headOfProduct, t.dgccrfJob.inspector],
        avatar: imgMagali,
      },
      {
        name: 'Valentine Michaud',
        role: [t.function.bussinesDev],
        avatar: imgValentine,
      },
      {
        name: 'Jules Garavelli',
        role: [t.function.bussinesDev],
        avatar: imgJules,
      },
      {
        name: 'Grégoire Aubert',
        role: [t.function.bussinesDev],
        avatar: imgGregoire,
      },
      {
        name: 'Agnès Mayanobe',
        role: [t.function.bussinesDev, t.dgccrfJob.inspector],
        avatar: imgAgnes,
      },
      {
        name: 'Thomas Chaumeny',
        role: [t.function.dev],
        avatar: imgThomas,
      },
      {
        name: 'Pierre-Olivier Mauguet',
        role: [t.function.dev],
        avatar: imgPierre,
      },
      {
        name: 'Franck Coufourier',
        role: [t.function.dev],
        avatar: imgFranck,
      },
      {
        name: 'Alexandre Michel',
        role: [t.function.bussinesDev],
        avatar: imgAlexandre,
      },
    ],
  }
}
