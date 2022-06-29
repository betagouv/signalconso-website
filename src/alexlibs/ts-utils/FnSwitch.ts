interface FnSwitch {
  <T extends string | number, R = any>(value: T, cases: {[key in T]: ((_: T) => R) | R}): R

  <T extends string | number, R = any>(value: T, cases: Partial<{[key in T]: ((_: T) => R) | R}>, defaultCase: (_: T) => R): R
}

export const fnSwitch: FnSwitch = (value, cases, defaultCase?) => {
  const res = cases[value]
  if (!res && !defaultCase) {
    throw new Error(`
      [fnSwtich] ${value} does not match any of theses cases ${Object.keys(cases).join(', ')}
      and defaultCase parameter is not provided.
    `)
  }
  return (typeof res === 'function' ? res(value) : res) ?? (defaultCase as any)!(value)
}
