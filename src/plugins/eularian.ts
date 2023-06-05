declare const window: any
export class Eularian {
  static readonly init = (): Eularian => {
    return new Eularian()
  }

  private constructor() {
    window.EA_push = window.EA_push !== null ? window.EA_push : []
  }

  readonly send = (path: string): void => {
    try {
      if (!window.EA_push) {
        window.EA_push = []
      }
      window.EA_push(['path', path])
    } catch (e: any) {
      console.error('[Eularian Analytic]', e)
      if (!(e instanceof ReferenceError)) {
        throw e
      }
    }
  }
}
