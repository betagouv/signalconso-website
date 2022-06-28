type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]

type _Enum = {[key: string]: any}

export class Enum {
  static readonly entries = <T extends _Enum>(t: T): Entries<T> => {
    return Object.entries(t)
  }

  static readonly keys = <T extends _Enum>(t: T): (keyof T)[] => {
    return Enum.entries(t).map(([key]) => key)
  }

  static readonly values = <T extends _Enum>(t: T): T[keyof T][] => {
    return Object.values(t)
  }
}
