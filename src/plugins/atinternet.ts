import {appConfig} from 'core/appConfig'

declare global {
  interface Window {
    ATInternet: any
  }
}

export interface ATIPageInfo {
  name: string
  level2?: string
  chapter1?: string
  chapter2?: string
  chapter3?: string
  customObject?: any
}

export class Atinternet {
  private constructor(private atTag: any) {}

  static readonly init = (): undefined | Atinternet => {
    try {
      if (!appConfig.atInternet_siteId) {
        console.warn(`ATInternet not configured, disabled`)
        return
      }
      const atTag = new window.ATInternet.Tracker.Tag()
      atTag.privacy.setVisitorMode('cnil', 'exempt')
      return new Atinternet(atTag)
    } catch (e) {
      console.warn(`Unable to load AT internet.`, e)
    }
  }

  readonly send = async (pageInfo: ATIPageInfo) => {
    try {
      await this.atTag?.page.send({level2: 'Visitor', ...pageInfo})
    } catch (err: any) {
      const error = new Error(`[SignalConso] Failed to send data to AT Internet: ${err.message}`)
      error.name = err.name
      throw error
    }
  }
}
