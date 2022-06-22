const hashArgs = (args: any[]) => {
  let res = ''
  args.forEach(arg => {
    if (typeof arg == 'string' || typeof arg == 'boolean' || typeof arg == 'number') res += ('|' + arg)
    else if (typeof arg === 'function') res += '|fun'
    else res += ('|' + JSON.stringify(arg))
  })
  return res
}

export const lazy = <T, P extends Array<any>>(fn: ((...p: P) => T)): (...p: P) => T => {
  const cache = new Map<string, T>()
  return (...p: P) => {
    const argsHashed = hashArgs(p)
    const cachedValue = cache.get(argsHashed)
    if (cachedValue === undefined) {
      const value = fn(...p)
      cache.set(argsHashed, value)
      return value
    }
    return cachedValue
  }
};
