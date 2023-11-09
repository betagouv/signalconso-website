import {usePathname, useSearchParams} from 'next/navigation'
import {useEffect} from 'react'
import {appConfig} from '../core/appConfig'
import {Eularian} from '../plugins/eularian'
import {Matomo} from '../plugins/matomo'

export class Analytic {
  static readonly init = ({matomo, eularian}: {matomo: Matomo | undefined; eularian: Eularian | undefined}) => {
    return new Analytic(matomo, eularian)
  }

  private log = (...args: (string | undefined)[]) => {
    console.debug('[Analytic]', ...args)
  }

  private constructor(
    private matomo: Matomo | undefined,
    private eularian: Eularian | undefined,
  ) {}

  readonly onPageChange = (path: string) => {
    this.log('[onPageChange]', path)
    if (!appConfig.isDev) {
      this.matomo?.trackPage(path)
      this.eularian?.send(path)
    }
  }

  readonly trackPage = (path: string, title?: string) => {
    this.log('[trackPage]', path, title)
    if (!appConfig.isDev) {
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

export function PageChangesListener({analytic}: {analytic: Analytic}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  useEffect(() => {
    const path = `${pathname}?${searchParams}`
    analytic?.onPageChange(path)
  }, [pathname, searchParams])
  return null
}

export type AnalyticAction =
  | ReportEventActions
  | CompanySearchEventActions
  | ConsumerShareReviewEventActions
  | 'Recherche par mot clé'

export enum EventCategories {
  report = 'Signalement',
  consumerReview = 'Avis consommateur',
  companySearch = "Identification de l'établissement",
  categorySearch = 'Recherche de catégories',
  barcodeSearch = 'Recherche de code-barres',
}

export enum ReportEventActions {
  outOfBounds = "Affichage d'un message problème hors périmètre",
  validateCategory = "Sélection d'une catégorie",
  validateProblem = 'Validation du problème',
  validateDetails = 'Validation de la description',
  validateCompany = "Validation de l'établissement",
  validateConsumer = 'Validation du consommateur',
  validateConfirmation = "Validation de l'envoi d'un signalement",
  reportSendSuccess = "Envoi d'un signalement",
  reportSendFail = "Echec de l'envoi d'un signalement",
  consumerWish = 'Type de signalement',
}

export enum CompanySearchEventActions {
  search = 'Recherche',
  searchByIdentity = 'Recherche par SIRET / SIREN / RCS',
  searchByGTIN = 'Recherche par GTIN (code-barres)',
  searchByUrl = 'Recherche par URL',
  searchedWebsiteDown = 'Site web recherché introuvable',
  editWebsite = 'Edition du site web',
}

export enum ConsumerShareReviewEventActions {
  twitter = 'Partage sur Twitter',
  facebook = 'Partage sur Facebook',
  servicePublicPlus = 'Partage sur Service-public.fr',
}
