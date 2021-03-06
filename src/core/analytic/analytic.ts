import {AppConfig, appConfig} from '../../conf/appConfig'
import {Matomo} from '../plugins/matomo'
import {Atinternet} from '../plugins/atinternet'
import {Router} from 'next/router'

export class Analytic {
  static readonly init = ({
    appConfig,
    matomo,
    atInternet,
  }: {
    appConfig: AppConfig
    matomo: Matomo | undefined
    atInternet: Atinternet | undefined
  }) => {
    return new Analytic(appConfig, matomo, atInternet)
  }

  private log = (...args: (string | undefined)[]) => {
    console.debug('[Analytic]', ...args)
  }

  private constructor(
    private appConfig: AppConfig,
    private matomo: Matomo | undefined,
    private atInternet: Atinternet | undefined,
  ) {
    Router.events.on('routeChangeComplete', (path: string): void => {
      this.log('[routeChangeComplete]', path)
      if (!this.appConfig.isDev) {
        matomo?.trackPage(path)
        atInternet?.send({name: path})
      }
    })
  }

  readonly trackPage = (path: string, title?: string) => {
    this.log('[trackPage]', path, title)
    if (!this.appConfig.isDev) {
      this.matomo?.trackPage(path, title)
      this.atInternet?.send({level2: 'Visitor', name: path})
    }
  }

  readonly trackEvent = (category: EventCategories, action: AnalyticAction, name?: any, value?: any) => {
    this.log('[trackEvent]', category, action, name, value)
    if (!appConfig.isDev) {
      try {
        this.atInternet?.send({
          level2: 'Visitor',
          name: category,
          chapter1: action,
          chapter2: name,
          customObject: {
            value,
          },
        })
        this.matomo?.push(['trackEvent', category, action, name, value])
      } catch (e: any) {
        console.error('[Analytic]', e)
        if (!(e instanceof ReferenceError)) {
          throw e
        }
      }
    }
  }
}

export type AnalyticAction =
  | AuthenticationEventActions
  | ReportEventActions
  | CompanySearchEventActions
  | ContractualDisputeActions
  | AccountEventActions
  | CompanyAccessEventActions

export enum EventCategories {
  report = 'Signalement',
  companySearch = "Identification de l'??tablissement",
  authentication = 'Authentification',
  account = 'Compte utilisateur',
  companyAccess = "Acc??s de l'entreprise",
  contractualDispute = 'Litige contractuel',
}

export enum ReportEventActions {
  outOfBounds = "Affichage d'un message probl??me hors p??rim??tre",
  information = "Consultation du d??tail d'un message d'information",
  secondaryCategories = 'Affichage des autres probl??mes',
  validateCategory = "S??lection d'une cat??gorie",
  validateSubcategory = "S??lection d'une sous cat??gorie",
  employee = "Consommateur employ?? de l'entreprise",
  notEmployee = "Consommateur non employ?? de l'entreprise",
  validateDetails = 'Validation de la description',
  validateCompany = "Validation de l'??tablissement",
  validateConsumer = 'Validation du consommateur',
  validateConfirmation = "Validation de l'envoi d'un signalement",
  reportSendSuccess = "Envoi d'un signalement",
  reportSendFail = "Echec de l'envoi d'un signalement",
  keywordsDetection = 'Mots-cl??s d??tect??s',
  informationFromKeywordsDetection = "Consultation du d??tail d'un message d'information suite ?? la d??tection de mots-cl??s",
  contactualReport = 'Litige contractuel',
}

export enum CompanySearchEventActions {
  search = 'Recherche',
  select = 'S??lection dans la liste de r??sultats',
  searchByIdentity = 'Recherche par SIRET / SIREN / RCS',
  searchByUrl = 'Recherche par URL',
}

export enum ContractualDisputeActions {
  consult = 'Consultation',
  downloadTemplate = 'T??l??chargement lettre type',
}

export enum ContractualDisputeNames {
  step = 'D??marche',
}

export enum AuthenticationEventActions {
  success = 'Authentification r??ussie',
  role = 'R??le de la personne authentifi??e',
  fail = 'Authentification en ??chec',
  forgotPasswordSuccess = 'Mot de passe oubli?? - envoi du mail',
  forgotPasswordFail = 'Mot de passe oubli?? - erreur technique',
  resetPasswordSuccess = 'R??initialistation du mot de passe',
  resetPasswordFail = 'R??initialistation du mot de passe - erreur technique',
}

export enum AccountEventActions {
  changePasswordSuccess = 'Changement mdp r??ussi',
  changePasswordFail = 'Changement mdp en ??chec',
  registerUser = "Inscription d'un utilisateur",
}

export enum AccountEventNames {
  userAlreadyRegistered = 'Compte d??j?? existant',
}

export enum CompanyAccessEventActions {
  addCompanyToAccount = "Ajout d'une entreprise ?? un compte",
  activateCompanyCode = "Activation d'une entreprise",
}

export enum ActionResultNames {
  success = 'Succ??s',
  fail = 'Echec',
}
