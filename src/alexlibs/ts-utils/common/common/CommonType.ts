export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
      ? ReadonlyArray<DeepPartial<U>>
      : DeepPartial<T[P]>
};

export type Index<T> = {[key: string]: T};

export type PromiseReturn<T> = T extends PromiseLike<infer U> ? U : T

export type PromiseFnResult<T extends (...args: any[]) => Promise<object>> = PromiseReturn<ReturnType<T>>

/**
 * Make some optional properties of an interface required. E.g:
 *
 * interface A {
 *   a: string
 *   b?: string
 *   c?: string
 * }
 *
 * type B = MakeRequired<A, 'b' | 'c'>
 *
 * B is equal to
 * {
 *   a: string,
 *   b: string,
 *   c: string
 * }
 */
export type MakeRequired<T extends object, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>
