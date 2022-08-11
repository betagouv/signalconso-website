export const isServerSide = () => typeof window === 'undefined'

// transform an object by running a function to transform each of its values
export const mapValues = <A extends string, B, C>(
  obj: {[key in A]: B},
  mappingFunction: (value: B, index: number) => C,
): {[key in A]: C} => {
  const res: any = {}
  Object.keys(obj).forEach((key, index) => {
    res[key] = mappingFunction(obj[key as A], index)
  })
  return res
}
