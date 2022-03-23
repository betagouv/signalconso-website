import {default as Router} from 'next/router'

declare const window: any

interface InitSettings {
  url?: string;
  siteId?: string;
  jsTrackerFile?: string;
  phpTrackerFile?: string;
  excludeUrlsPatterns?: RegExp[];
}


const startsWith = (str: string, needle: string) => {
  return str.substring(0, needle.length) === needle
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
    this.push(['setTrackerUrl', `${params.url}/${params.phpTrackerFile}`])
    this.push(['setSiteId', params.siteId])
    this.push(['setCookieDomain', '*.conso.gouv.fr'])
    this.push(['setDomains', '*.conso.gouv.fr'])

    /**
     * for initial loading we use the location.pathname
     * as the first url visited.
     * Once user navigate across the site,
     * we rely on Router.pathname
     */
    const scriptElement = document.createElement('script')
    const refElement = document.getElementsByTagName('script')[0]
    scriptElement.type = 'text/javascript'
    scriptElement.async = true
    scriptElement.defer = true
    scriptElement.src = `${params.url}/${params.jsTrackerFile}`
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

  private previousPath: string = ''

  readonly trackRouteChangeStart = (path: string) => {
    // We use only the part of the url without the querystring to ensure piwik is happy
    // It seems that piwik doesn't track well page with querystring
    const [pathname] = path.split('?')

    if (this.previousPath) {
      this.push(['setReferrerUrl', `${this.previousPath}`])
    }
    this.push(['setCustomUrl', pathname])
    this.push(['deleteCustomVariables', 'page'])
    this.previousPath = pathname
  }

  readonly trackRouteChangeComplete = (path: string) => {
    // In order to ensure that the page title had been updated,
    // we delayed this.pushing the tracking to the next tick.
    setTimeout(() => {
      const {q} = Router.query
      this.push(['setDocumentTitle', document.title])
      if (startsWith(path, '/recherche') || startsWith(path, '/search')) {
        this.push(['trackSiteSearch', q ?? ''])
      } else {
        this.push(['trackPageView'])
      }
    }, 0)
  }
}
