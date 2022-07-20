// allow to track the current path down the hierarchy
// so we can do proper logs
type Path = (string | number)[]

// Looks at a specific value within an arborescence of arrays/objects/etc.
//
// The assertXXX methods perform some checks on the type of the value
//
// The intoXXX methods allow to go deeper into the tree, returning a new TreeWalker
// focused on a child value
//
// Thus you can traverse a whole tree and check the type of everything
export class AnomalyTreeWalker {
  root: any
  path: Path = []
  value: any // value within the root, at the current path

  constructor(root: any, path: Path = []) {
    this.root = root
    this.path = path
    this.value = this.root
    this.path.forEach(key => {
      this.value = this.value[key]
    })
  }

  // Returns a new TreeWalker, focused on something one more level down the tree
  into(key: string | number): AnomalyTreeWalker {
    return new AnomalyTreeWalker(this.root, [...this.path, key])
  }

  // Returns undefined if the key does not exist
  // thus you can use "?." operator to keep performing checks
  // but not throw anything if the key didn't exist
  intoMaybe(key: string | number): AnomalyTreeWalker | undefined {
    const w = this.into(key)
    if (w.value === undefined) {
      return undefined
    }
    return w
  }

  // Same thing for nullable fields
  intoNullable(key: string | number): AnomalyTreeWalker | null {
    const w = this.into(key)
    if (w.value === null) {
      return null
    }
    return w
  }

  intoUndefinedOrNullable(key: string | number): AnomalyTreeWalker | undefined | null {
    const w = this.into(key)
    if (w.value === null || w.value === undefined) {
      return w.value
    }
    return w
  }

  // Return TreeWalkers focused on each child of an array or object
  intoChilds(): AnomalyTreeWalker[] {
    return Object.keys(this.value).map(key => {
      const _key = isArray(this.value) ? parseInt(key, 10) : key
      return this.into(_key)
    })
  }

  assertIsObject() {
    if (!isObject(this.value)) {
      throw this.err(`should be an object ${this.printActualValue()}`)
    }
    return this
  }

  assertIsNumber() {
    if (typeof this.value !== 'number') {
      throw this.err(`should be a number ${this.printActualValue()}`)
    }
  }

  assertIsBoolean() {
    if (typeof this.value !== 'boolean') {
      throw this.err(`should be a boolean ${this.printActualValue()}`)
    }
  }

  assertIsString() {
    if (typeof this.value !== 'string') {
      throw this.err(`should be a string ${this.printActualValue()}`)
    }
  }

  assertIsAllowedString(possibleValues: string[]) {
    this.assertIsString()
    if (!possibleValues.includes(this.value)) {
      throw this.err(`should be one of ${possibleValues.join(', ')} ${this.printActualValue()}`)
    }
  }

  assertIsArray() {
    if (!isArray(this.value)) {
      throw this.err(`should be an array ${this.printActualValue()}`)
    }
    return this
  }

  assertIsArrayWith(childAssertions: (treewalker: AnomalyTreeWalker) => void) {
    this.assertIsArray()
    this.intoChilds().forEach(childAssertions)
  }

  assertIsArrayOfString() {
    this.assertIsArray()
    this.intoChilds().forEach(_ => _.assertIsString())
  }

  assertIsArrayOfAllowedStrings(possibleValues: string[]) {
    this.assertIsArray()
    this.intoChilds().forEach(_ => _.assertIsAllowedString(possibleValues))
  }

  err(message: string) {
    let contextLog: string[] = []
    let contextProcessed: Path = []
    // try to log the titles, it's easier to read
    for (const key of this.path) {
      if (typeof key === 'string') {
        contextLog.push(key)
      } else {
        const value = new AnomalyTreeWalker(this.root, [...contextProcessed, key]).value
        let name: string | undefined = undefined
        if (value && isObject(value)) {
          const category = value.category as unknown
          if (category && typeof category == 'string') {
            name = category
          } else {
            const title = value.title as unknown
            if (title && typeof title == 'string') {
              name = title
            }
          }
        }
        contextLog.push(name ? `"${name}" (n°${key + 1})` : `n°${key + 1}`)
      }
      contextProcessed.push(key)
    }
    return new Error(`at path:\n${contextLog.map(_ => ` > ${_}`).join('\n')}\n ===> ${message}`)
  }

  printActualValue() {
    const str = this.value === undefined ? 'undefined' : JSON.stringify(this.value)
    const shortened = str.length > 100 ? str.substring(0, 100) + '...' : str
    return `\n(got ${shortened})`
  }
}

const isArray = Array.isArray
const isObject = (_: unknown) => typeof _ === 'object' && _ !== null && !isArray(_)
