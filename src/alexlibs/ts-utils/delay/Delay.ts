export const delay =
  <T>(ms: number) =>
  (t: T): Promise<T> =>
    new Promise(resolve => setTimeout(() => resolve(t), ms))

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
