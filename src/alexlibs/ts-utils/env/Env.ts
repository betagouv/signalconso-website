type Func<A, R> = (a1: A) => R
type FuncInitial<R> = (a1?: string) => R

interface Pipe {
  (): Func<string, string | undefined>
  <R>(f1: FuncInitial<R>): Func<string, R>
  <A, R>(f1: FuncInitial<A>, f2: Func<A, R>): Func<string, R>
  <A, B, R>(f1: FuncInitial<A>, f2: Func<A, B>, f3: Func<B, R>): Func<string, R>
  <A, B, C, R>(f1: FuncInitial<A>, f2: Func<A, B>, f3: Func<B, C>, f4: Func<C, R>): Func<string, R>
  <R>(...funcs: Function[]): Func<string, R>
}

export const env =
  (env: {[key: string]: string | undefined} = process.env): Pipe =>
  (...funcs: any[]) =>
  (envname: string) => {
    try {
      const envValue = env[envname]
      if (funcs.length === 0) {
        return envValue
      }
      if (funcs.length === 1) {
        return funcs[0](envValue)
      }
      return funcs.reduce(
        (a: Function, b: Function) =>
          (...args: any[]) =>
            b(a(...args)),
      )(envValue)
    } catch (e: any) {
      throw new Error(`[utils/Env] ${envname}: ${e.message}`)
    }
  }
