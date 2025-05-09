// allow to track the current path down the hierarchy
// so we can do proper logs
type Path = (string | number)[]

export type ObjectSpec = {[key: string]: (walker: AnomalyTreeWalker) => void}

// Looks at a specific value within an arborescence of arrays/objects/etc.
//
// The assertXXX methods perform some checks on the type of the value
//
// The intoXXX methods allow to go deeper into the tree, returning a new TreeWalker
// focused on a child value
//
// Thus you can traverse a whole tree and check the type of everything
//
// --- NOTE : all of this homemade code should instead be done with a library like "zod"
// --- which would avoid the duplication between the declared types and the checking
// --- When I (Emmanuel) wrote this code, I wasn't aware of libraries like "zod"
export class AnomalyTreeWalker {
  root: any
  path: Path = [] // current path within the root
  value: any // value within the root, at the current path

  constructor(root: any, path: Path = []) {
    this.root = root
    this.path = path
    this.value = this.root
    this.path.forEach(key => {
      this.value = this.value[key]
    })
  }

  assertRedirectExists() {
    this.assertIsArrayWith((_) => _.assertRedirectToCategoryExists())
  }

  assertRedirectToCategoryExists() {
    this.into('title').assertIsString()
    this.into('categoryPath').assertIsString()
    this.into('subcategorySlugs').ifDefined()?.assertIsArrayOfString()
    this.into('description').ifDefined()?.assertIsString()

    const categoryPath = this.value.categoryPath as string
    const subcategorySlugs = this.value.subcategorySlugs as string[] | undefined

    const index = this.root.findIndex((v: any) => v.path === categoryPath) ?? -1
    if (index === -1) {
      throw this.err(`Category ${this.value} does not exist`)
    }

    if (subcategorySlugs) {
      let currentValue = this.root[index]
      subcategorySlugs.forEach((slug) => {
        const index = currentValue.subcategories.findIndex((v: any) => v.subcategory === slug) ?? -1
        if (index === -1) {
          throw this.err(`Path ${subcategorySlugs.join(" -> ")} is invalid, nothing found at '${slug}'`)
        }
        currentValue = currentValue.subcategories[index]

      })
    }
  }

  // Returns a new TreeWalker, focused on something one more level down the tree
  into(key: string | number): AnomalyTreeWalker {
    return new AnomalyTreeWalker(this.root, [...this.path, key])
  }

  // You can chain this with the ".?" operator to do some assertions
  // only if the value is defined
  ifDefined(): AnomalyTreeWalker | undefined {
    if (this.value === undefined) {
      return undefined
    }
    return this
  }

  ifNotNull(): AnomalyTreeWalker | null {
    if (this.value === null) {
      return null
    }
    return this
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

  // This one checks each key according to the given spec
  // and also makes sure that no unknown key is present
  // So the spec MUST fully describe the object
  assertIsObjectWith(spec: ObjectSpec) {
    this.assertIsObject()
    const allKeys = Object.keys(this.value)
    const allowedKeys = Object.keys(spec)
    for (const k of allKeys) {
      if (!allowedKeys.includes(k)) {
        throw this.err(`unexpected field "${k}", allowed fields are ${allowedKeys.join(', ')} ${this.printActualValue()}`)
      }
    }
    Object.entries(spec).forEach(([key, assertions]) => {
      assertions(this.into(key))
    })
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

  assertIsSlug() {
    if (typeof this.value !== 'string' || !this.value.match(/^(([a-z])+)$/i)) {
      throw this.err(`should be a simple string without spaces ${this.printActualValue()}`)
    }
  }

  assertIsAllowedString(possibleValues: readonly string[]) {
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

  assertIsArrayOfAllowedStrings(possibleValues: readonly string[]) {
    this.assertIsArray()
    this.intoChilds().forEach(_ => _.assertIsAllowedString(possibleValues))
  }

  err(message: string) {
    let pathLog: string[] = []
    let pathProcessedSoFar: Path = []
    // Try to log the titles, it's easier to read
    for (const key of this.path) {
      if (typeof key === 'string') {
        pathLog.push(key)
      } else {
        // Try to log the titles, it's easier to read
        const value = new AnomalyTreeWalker(this.root, [...pathProcessedSoFar, key]).value
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
        pathLog.push(name ? `"${name}" (n°${key + 1})` : `n°${key + 1}`)
      }
      pathProcessedSoFar.push(key)
    }
    return new Error(`at path:\n${pathLog.map(_ => ` > ${_}`).join('\n')}\n ===> ${message}`)
  }

  printActualValue() {
    const str = this.value === undefined ? 'undefined' : JSON.stringify(this.value)
    const shortened = str.length > 100 ? str.substring(0, 100) + '...' : str
    return `\n(got ${shortened})`
  }
}

const isArray = Array.isArray
const isObject = (_: unknown) => typeof _ === 'object' && _ !== null && !isArray(_)
