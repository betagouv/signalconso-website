import fs from 'fs'
import mapValues from 'lodash/mapValues'
import path from 'path'
import {checkAnomaliesYaml} from '../anomalies/checks/checkAnomaliesJson'
import {createDirIfNeeded, dirContentSorted, exists, isFile, readFileYaml, sortObjectKeys, throwIfNotExists} from './scriptUtils'

const rootDir = (lang: 'fr' | 'en') => path.resolve(`./anomalies/yml/${lang}`)
const jsonOutputDir = path.resolve('./anomalies/json')
const jsonOutputFile = (lang: 'fr' | 'en') => path.resolve(jsonOutputDir, 'anomalies' + '_' + lang + '.json')
const INDEX_YAML = '_index.yaml'

// Attempt to read the new file tree structure from 'yml' folder
// and resolve imports
function readAnomaliesFromYmlFileTree(lang: 'fr' | 'en') {
  console.log('Reading everything in', rootDir(lang))
  const anomalyDirs = dirContentSorted(rootDir(lang), {excludedFileNames: ['_imports']})
  const anomalies = anomalyDirs.map(_ => {
    return resolveImportsRecursively(buildSubcategoryFromFileOrFolder(_), rootDir(lang))
  })
  checkAnomaliesYaml(anomalies)
  console.log(`The YAML is valid`)
  addUniqueId(anomalies)
  createDirIfNeeded(jsonOutputDir)
  console.log(`Generating JSON file ${jsonOutputFile(lang)}`)
  fs.writeFileSync(jsonOutputFile(lang), JSON.stringify(sortObjectKeys(anomalies), null, 2))
}

// Read a file or a folder
// Returns a Subcategory
// except it can use 'customimport', so it's not exactly the correct type
function buildSubcategoryFromFileOrFolder(_path: string): any {
  // console.log('Reading ', _path)
  throwIfNotExists(_path)
  if (isFile(_path)) {
    return readFileYaml(_path)
  }
  // It's a directory
  // Read _index.yaml
  const indexFile = path.join(_path, INDEX_YAML)
  throwIfNotExists(indexFile, `Missing file ${INDEX_YAML} in ${_path}`)
  if (!isFile(indexFile)) {
    throw new Error(`${indexFile} is supposed to be a file, not a directory`)
  }
  const indexYaml: any = readFileYaml(indexFile)
  // Read the rest (each file or folder turns into a subcat of this subcat)
  const otherFilesOrSubdirs = dirContentSorted(_path, {excludedFileNames: [INDEX_YAML]})
  const subSubcats = otherFilesOrSubdirs.map(subpath => {
    return buildSubcategoryFromFileOrFolder(subpath)
  })
  // Then merge
  const subcat = {
    ...indexYaml,
    subcategories: subSubcats,
  }
  return subcat
}

// Read a file or folder (within _imports)
// Build the object or array that we're supposed to import
//
// The logic is slightly different from the main method, if it's a folder :
//  - we don't expect an _index.yaml
//  - we build an array of subcategories for each file/subdir
//    (instead of building the subcategory above)
function buildImportableFromFileOrFolder(_path: string): any {
  // console.log('Reading ', _path)
  if (!exists(_path)) {
    throw new Error(`Nothing at path ${_path}`)
  }
  if (isFile(_path)) {
    return readFileYaml(_path)
  } else {
    // Read the rest (each file or folder turns into a subcat of this subcat)
    const filesOrSubdirs = dirContentSorted(_path)
    const subcats = filesOrSubdirs.map(subpath => {
      // recurse with the other method
      return buildSubcategoryFromFileOrFolder(subpath)
    })
    return subcats
  }
}

function resolveImportsRecursively(obj: any, rootDir: string): any {
  if (Array.isArray(obj)) {
    return obj.map(_ => resolveImportsRecursively(_, rootDir))
  }
  if (typeof obj === 'object' && obj !== null) {
    // It's an object
    // Resolve imports
    const {customimport, ...rest} = obj
    let imported = {}
    if (customimport) {
      checkCustomImportIsValid(customimport)
      // console.log('Resolving import of ', customimport)
      const fullImportPath = path.join(rootDir, customimport)
      imported = buildImportableFromFileOrFolder(fullImportPath)
    }
    if (Array.isArray(imported)) {
      return imported.map(_ => resolveImportsRecursively(_, rootDir))
    } else {
      const obj2 = Array.isArray(imported) ? imported : {...rest, ...imported}
      // Then recurse
      const obj3 = mapValues(obj2, v => {
        return resolveImportsRecursively(v, rootDir)
      })
      return obj3
    }
  }
  return obj
}

function checkCustomImportIsValid(customimport: string) {
  // make sure that there is not funny import path
  const validPaths = ['_imports/subcategories/', '_imports/blockingInfo/', '_imports/detailInputs/', '_imports/postreporthelper/']
  if (!validPaths.some(_ => customimport.startsWith(_))) {
    throw new Error(`Import of "${customimport}" is invalid, it should start with one of these ${validPaths.join(', ')}`)
  }
}

function addUniqueId(obj: any, depth = 0, prefix?: string): void {
  let index = 1
  obj.forEach((entry: any) => {
    const id = `${prefix ? prefix + '.' : ''}${entry.id || index++}`
    entry.id = id
    if (entry.subcategories) {
      addUniqueId(entry.subcategories, depth + 1, id)
    }
  })
}

readAnomaliesFromYmlFileTree('fr')
readAnomaliesFromYmlFileTree('en')
