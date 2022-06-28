export const delay =
  <T>(ms: number) =>
  (t: T): Promise<T> =>
    new Promise(resolve => setTimeout(() => resolve(t), ms))
