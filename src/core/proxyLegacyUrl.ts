export class ProxyLegacyUrl {

  private static readonly dashboardRoutes = {
    reportedWebsites: '/moderation-url-entreprises',
    reportedCompanyWebsites: '/moderation-url-entreprises/site-internet',
    reportedWebsites_unknown: '/moderation-url-entreprises/sites-internet/non-identifies',
    reportedPhone: '/suivi-des-telephones',
    reports: '/suivi-des-signalements',
    subscriptions: '/abonnements',
    report: (id: string = ':id') => `/suivi-des-signalements/report/${id}`,
    exports: '/mes-telechargements',
    companies: '/entreprises',
    companiesPro: '/mes-entreprises',
    activatePro: (siret: string = ':siret') => `/entreprise/rejoindre/${siret}`,
    companyAccesses: (siret: string = ':siret') => `/entreprise/acces/${siret}`,
    companies_toActivate: '/entreprises/a-activer',
    companies_registered: '/entreprises/les-plus-signalees',
    users: '/admin/invitation-ccrf',
    users_pending: '/admin/invitation-ccrf/pending',
    users_all: '/admin/invitation-ccrf/all',
    settings: '/parametres',
    register: '/activation',
    registerBis: '/entreprise/activation',
    login: '/connexion',
    emailValidation: '/connexion/validation-email',
    resetPassword: (token: string = ':token') => `/connexion/nouveau-mot-de-passe/${token}`,
    modeEmploiDGCCRF: '/mode-emploi-dgccrf',
    consumerReview: (reportId: string = ':reportId') => `/suivi-des-signalements/${reportId}/avis`,
  }

  private static readonly routesMapping: {[key: string]: {redirectTo: (string | ((...args: string[]) => string))}} = {
    '/mode-emploi-dgccrf': {redirectTo: this.dashboardRoutes.modeEmploiDGCCRF,},
    '/mes-telechargements': {redirectTo: this.dashboardRoutes.reports,},
    '/admin/invitation-ccrf': {redirectTo: this.dashboardRoutes.users,},
    '/compte/mot-de-passe': {redirectTo: this.dashboardRoutes.settings,},
    '/entreprise/acces/([^\/]*?)': {redirectTo: siret => this.dashboardRoutes.companyAccesses(siret)},
    '/entreprise/acces/:siret/invitation': {redirectTo: ''},
    '/mes-entreprises': {redirectTo: this.dashboardRoutes.companiesPro},
    '/entreprises': {redirectTo: this.dashboardRoutes.companies},
    '/entreprises/les-plus-signalees': {redirectTo: this.dashboardRoutes.companies_registered},
    '/entreprises/recherche': {redirectTo: this.dashboardRoutes.companies_registered},
    '/entreprises/a-activer': {redirectTo: this.dashboardRoutes.companies_toActivate},
    '/suivi-des-telephones': {redirectTo: this.dashboardRoutes.reportedPhone},
    '/suivi-des-signalements/([^\/]*?)/avis': {redirectTo: reportId => this.dashboardRoutes.consumerReview(reportId)},
    '/suivi-des-signalements': {redirectTo: this.dashboardRoutes.reports},
    '/suivi-des-signalements/pro': {redirectTo: this.dashboardRoutes.reports},
    '/suivi-des-signalements/admin': {redirectTo: this.dashboardRoutes.reports},
    '/suivi-des-signalements/dgccrf': {redirectTo: this.dashboardRoutes.reports},
    '/suivi-des-signalements/report/([^\/]*?)': {redirectTo: id => this.dashboardRoutes.report(id)},
    '/abonnements': {redirectTo: this.dashboardRoutes.subscriptions},
    '/moderation-url-entreprises': {redirectTo: this.dashboardRoutes.reportedWebsites},
    '/sites-internet/non-identifies': {redirectTo: this.dashboardRoutes.reportedWebsites_unknown},
    '/login': {redirectTo: this.dashboardRoutes.login},
    '/connexion': {redirectTo: this.dashboardRoutes.login},
    '/dgccrf': {redirectTo: this.dashboardRoutes.login},
    '/connexion/validation-email': {redirectTo: this.dashboardRoutes.emailValidation},
    '/connexion/perte-mot-de-passe': {redirectTo: this.dashboardRoutes.login},
    '/connexion/perte-mot-de-passe/dgccrf': {redirectTo: this.dashboardRoutes.login},
    '/connexion/nouveau-mot-de-passe/:token': {redirectTo: this.dashboardRoutes.resetPassword},
    '/compte/inscription': {redirectTo: this.dashboardRoutes.register},
    '/entreprise/rejoindre/([^\/]*?)': {redirectTo: this.dashboardRoutes.activatePro},
    '/dgccrf/rejoindre': {redirectTo: this.dashboardRoutes.register},
    'entreprise/activation': {redirectTo: this.dashboardRoutes.registerBis},
    'activation': {redirectTo: this.dashboardRoutes.register},
  }

  static readonly getRedirection = (
    currentPath: string,
    match: [string, {redirectTo: (string | ((...args: string[]) => string))}]
  ): string => {
    const [matchedRoute, redirection] = match
    if (typeof redirection.redirectTo === 'function') {
      const args = this.getArgs(currentPath, matchedRoute)
      return redirection.redirectTo(...args!)
    } else {
      return redirection.redirectTo
    }
  }

  static readonly findMatch = (currentRoute: string): [string, {redirectTo: (string | ((...args: string[]) => string))}] | undefined => {
    return Object.entries(this.routesMapping).find(([route, redirect]) => {
      const regexp = new RegExp(route)
      return regexp.test(`^${currentRoute}$`)
    })
  }

  private static readonly getArgs = (currentPath: string, pattern: string): string[] | undefined => {
    return currentPath.match(new RegExp(`^${pattern}$`))?.slice(1)
  }
}
