import {AppConfig, appConfig} from '../core/appConfig'
import {Matomo} from '../plugins/matomo'
import {Router} from 'next/router'
import {Eularian} from '../plugins/eularian'

export class Analytic {
  static readonly init = ({
    appConfig,
    matomo,
    eularian,
  }: {
    appConfig: AppConfig
    matomo: Matomo | undefined
    eularian: Eularian | undefined
  }) => {
    return new Analytic(appConfig, matomo, eularian)
  }

  private log = (...args: (string | undefined)[]) => {
    console.debug('[Analytic]', ...args)
  }

  private constructor(private appConfig: AppConfig, private matomo: Matomo | undefined, private eularian: Eularian | undefined) {
    Router.events.on('routeChangeComplete', (path: string): void => {
      this.log('[routeChangeComplete]', path)
      if (!this.appConfig.isDev) {
        matomo?.trackPage(path)
        eularian?.send(path)
      }
    })
  }

  readonly trackPage = (path: string, title?: string) => {
    this.log('[trackPage]', path, title)
    if (!this.appConfig.isDev) {
      this.matomo?.trackPage(path, title)
    }
  }

  readonly trackEvent = (category: EventCategories, action: AnalyticAction, name?: any, value?: any) => {
    this.log('[trackEvent]', category, action, name, value)
    if (!appConfig.isDev) {
      try {
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
  companySearch = "Identification de l'établissement",
  authentication = 'Authentification',
  account = 'Compte utilisateur',
  companyAccess = "Accès de l'entreprise",
  contractualDispute = 'Litige contractuel',
}

export enum ReportEventActions {
  outOfBounds = "Affichage d'un message problème hors périmètre",
  information = "Consultation du détail d'un message d'information",
  secondaryCategories = 'Affichage des autres problèmes',
  validateCategory = "Sélection d'une catégorie",
  validateSubcategory = "Sélection d'une sous catégorie",
  employee = "Consommateur employé de l'entreprise",
  notEmployee = "Consommateur non employé de l'entreprise",
  validateDetails = 'Validation de la description',
  validateCompany = "Validation de l'établissement",
  validateConsumer = 'Validation du consommateur',
  validateConfirmation = "Validation de l'envoi d'un signalement",
  reportSendSuccess = "Envoi d'un signalement",
  reportSendFail = "Echec de l'envoi d'un signalement",
  keywordsDetection = 'Mots-clés détectés',
  informationFromKeywordsDetection = "Consultation du détail d'un message d'information suite à la détection de mots-clés",
  contactualReport = 'Litige contractuel',
}

export enum CompanySearchEventActions {
  search = 'Recherche',
  select = 'Sélection dans la liste de résultats',
  searchByIdentity = 'Recherche par SIRET / SIREN / RCS',
  searchByUrl = 'Recherche par URL',
}

export enum ContractualDisputeActions {
  consult = 'Consultation',
  downloadTemplate = 'Téléchargement lettre type',
}

export enum ContractualDisputeNames {
  step = 'Démarche',
}

export enum AuthenticationEventActions {
  success = 'Authentification réussie',
  role = 'Rôle de la personne authentifiée',
  fail = 'Authentification en échec',
  forgotPasswordSuccess = 'Mot de passe oublié - envoi du mail',
  forgotPasswordFail = 'Mot de passe oublié - erreur technique',
  resetPasswordSuccess = 'Réinitialistation du mot de passe',
  resetPasswordFail = 'Réinitialistation du mot de passe - erreur technique',
}

export enum AccountEventActions {
  changePasswordSuccess = 'Changement mdp réussi',
  changePasswordFail = 'Changement mdp en échec',
  registerUser = "Inscription d'un utilisateur",
}

export enum CompanyAccessEventActions {
  addCompanyToAccount = "Ajout d'une entreprise à un compte",
  activateCompanyCode = "Activation d'une entreprise",
}
