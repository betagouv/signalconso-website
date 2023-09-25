declare const window: any

interface InitSettings {
  url?: string
  siteId?: string
  jsTrackerFile?: string
  phpTrackerFile?: string
  excludeUrlsPatterns?: RegExp[]
}

export class Matomo {
  static readonly init = (params: InitSettings): Matomo => {
    return new Matomo(params)
  }

  private constructor(private params: InitSettings) {
    window._paq = window._paq !== null ? window._paq : []
    if (!params.url || !params.siteId) {
      console.warn('Matomo disabled, please provide matomo url')
      return
    }
    this.push(['trackPageView'])
    this.push(['enableLinkTracking'])
    this.push(['setTrackerUrl', `${params.url}/piwik.php`])
    this.push(['setSiteId', params.siteId])
    this.push(['setCookieDomain', '*.conso.gouv.fr'])
    this.push(['setDomains', '*.conso.gouv.fr'])
    const scriptElement = document.createElement('script')
    const refElement = document.getElementsByTagName('script')[0]
    scriptElement.type = 'text/javascript'
    scriptElement.async = true
    scriptElement.defer = true
    scriptElement.src = `${params.url}/piwik.js`
    if (refElement.parentNode) {
      refElement.parentNode.insertBefore(scriptElement, refElement)
    }
  }

  readonly push = (args: (number[] | string[] | number | string)[]): void => {
    if (!window._paq) {
      window._paq = []
    }
    window._paq.push(args)
  }

  readonly trackPage = (path: string, title?: string) => {
    // Wait the next tick to make sure the page title had been updated
    setTimeout(() => {
      this.push(['setDocumentTitle', title ?? window.document.title])
      this.push(['setCustomUrl', window.location.origin + path])
      this.push(['trackPageView'])
    }, 0)
  }
}
