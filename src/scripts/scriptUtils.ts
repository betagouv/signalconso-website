// Sort an object keys, recursively
// So that we can compare the JSONs
export function sortObjectKeys(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeys)
  }
  if (typeof obj === 'object' && obj !== null) {
    const keys = Object.keys(obj).sort()
    const res: any = {}
    keys.forEach(k => {
      const value = obj[k]
      res[k] = sortObjectKeys(value)
    })
    return res
  }
  return obj
}
