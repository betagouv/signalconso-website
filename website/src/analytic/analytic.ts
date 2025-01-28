import {appConfig} from '@/core/appConfig'
import {extractFromGeoArea, GeoArea} from '@/model/GeoArea'
import {usePathname, useSearchParams} from 'next/navigation'
import {useEffect} from 'react'
import {CompanyKind} from 'shared/anomalies/Anomaly'
import {Eularian} from '../plugins/eularian'
import {Matomo} from '../plugins/matomo'

export class Analytic {
  static readonly init = () => {
    const matomo = appConfig.enableMatomo ? Matomo.init() : undefined
    const eularian = appConfig.enableEularian ? Eularian.init() : undefined
    return new Analytic(matomo, eularian)
  }

  private log = (...args: unknown[]) => {
    console.debug('[Analytic]', ...args)
  }

  private matomoPush = (args: (number[] | string[] | number | string | undefined)[]) => {
    this.log(...args)
    this.matomo?.push(args)
  }

  private constructor(
    private matomo: Matomo | undefined,
    private eularian: Eularian | undefined,
  ) {}

  readonly onPageChange = (path: string) => {
    this.log('[onPageChange]', path)
    this.matomo?.trackPage(path)
    this.eularian?.send(path)
  }

  readonly trackEvent = (category: EventCategories, action: AnalyticAction, name?: string, value?: string) => {
    this.matomoPush(['trackEvent', category, action, name, value])
  }

  readonly trackSearch = (
    inputs: {q: string; geoArea?: GeoArea},
    searchCategory: 'companysearch_smart' | 'companysearch_nameandgeoarea' | 'companysearch_name' | 'companysearch_siret',
    nbResults: number,
  ) => {
    const {q, geoArea} = inputs
    const {postalCode, departmentCode} = extractFromGeoArea(geoArea)
    const trackedSearch = `${postalCode ? `[${postalCode}] ` : ''}${departmentCode ? `[${departmentCode}] ` : ''}${q}`
    // https://developer.matomo.org/guides/tracking-javascript-guide#internal-search-tracking
    this.matomoPush(['trackSiteSearch', trackedSearch, searchCategory, nbResults])
  }

  readonly setTrackedCompanyKind = (companyKind: CompanyKind) => {
    const customDimensionId = 1
    // https://developer.matomo.org/guides/tracking-javascript-guide#custom-dimensions
    // This doesn't send anything
    // but should set the custom dimension "companykind" for the events after it
    this.matomoPush(['setCustomDimension', customDimensionId, companyKind])
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
  consumerEngagementReview = "Avis consommateur sur l'engagement",
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
