declare const ATInternet: any

export interface ATIPageInfo {
  name: string
  level2?: string
  chapter1?: string
  chapter2?: string
  chapter3?: string
  customObject?: any
}

export class Atinternet {
  static readonly init = (): undefined | {send: (pageInfo: ATIPageInfo) => Promise<void>} => {
    try {
      const atTag = new ATInternet.Tracker.Tag()
      atTag.privacy.setVisitorMode('cnil', 'exempt')
      return atTag.page
    } catch (e) {
      console.warn(`Unable to load AT internet.`, e)
    }
  }
}
