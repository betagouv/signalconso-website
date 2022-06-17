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
  private constructor(private atTag: any) {}

  static readonly init = (): undefined | Atinternet => {
    try {
      const atTag = new ATInternet.Tracker.Tag()
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
