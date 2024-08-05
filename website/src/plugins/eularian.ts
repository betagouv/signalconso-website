declare const window: any
export class Eularian {
  static readonly init = (): Eularian => {
    return new Eularian()
  }

  private constructor() {}

  readonly send = (path: string): void => {
    try {
      window.EA_push(['path', path])
    } catch (e: any) {
      console.error('[Eularian Analytic]', e)
    }
  }
}
