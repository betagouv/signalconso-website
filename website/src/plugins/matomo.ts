import {appConfig} from '@/core/appConfig'

declare const window: any

export class Matomo {
  static readonly init = (): Matomo => {
    return new Matomo()
  }

  private constructor() {
    const _paq = (window._paq = window._paq || [])
    const url = 'https://stats.beta.gouv.fr/'
    _paq.push(['trackPageView'])
    _paq.push(['enableLinkTracking'])
    _paq.push(['setTrackerUrl', url + 'matomo.php'])
    _paq.push(['setSiteId', '61'])
    _paq.push(['setCookieDomain', 'signal.conso.gouv.fr'])
    _paq.push(['setDomains', 'signal.conso.gouv.fr'])
    _paq.push(['HeatmapSessionRecording::enable'])
    const script = document.createElement('script')
    script.async = true
    script.src = url + 'matomo.js'
    const head = document.getElementsByTagName('script')[0]
    head.parentNode?.insertBefore(script, head)
  }

  readonly push = (args: (number[] | string[] | number | string | undefined)[]): void => {
    if (appConfig.enableMatomo) {
      if (!window._paq) {
        window._paq = []
      }
      window._paq.push(args)
    }
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
