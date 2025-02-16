import path from 'path'
import slugify from 'slugify'
import {
  dirContentSorted,
  isFile,
  padTo2,
  readFileYaml,
  renameFileOrDir,
  throwIfNotDir,
  throwIfNotExists,
  throwIfNotFile,
} from './scriptUtils'

const rootDir = path.resolve('./anomalies/yml')
const INDEX_YAML = '_index.yaml'

// Walks the hierarchical file/directories structure
// Rename all files/folders automatically (adjust names and numbers)
function sanitizeAnomaliesFilenames(lang: 'fr' | 'en') {
  const root = rootDir + '/' + lang
  console.log('Renaming file/folder names if needed in ', root)
  sanitizeDirContents(root, {excludedFileName: '_imports'})
  dirContentSorted(path.join(root, '_imports', 'subcategories')).forEach(subcategoriesSubDir => {
    sanitizeDirContents(subcategoriesSubDir)
  })
}

function sanitizeDirContents(_path: string, options: {excludedFileName?: string} = {}) {
  throwIfNotExists(_path)
  throwIfNotDir(_path)
  const excludedFileNames = [INDEX_YAML, ...(options.excludedFileName ? [options.excludedFileName] : [])]
  // Rename everything with its proper name
  dirContentSorted(_path, {excludedFileNames}).map((subpath, idx) => {
    const title = findTitleForPath(subpath)
    const newIdx = padTo2(idx + 1)
    const newTitle = slugify(title, {strict: true, replacement: '_'})
      // there's a total max length of 256 for the whole path on windows...
      .slice(0, 15)
    const extension = isFile(subpath) ? '.yaml' : ''
    const newName = `${newIdx}_${newTitle}${extension}`
    renameFileOrDir(subpath, newName)
  })
  // Recurse
  dirContentSorted(_path, {excludedFileNames}).map(subpath => {
    if (!isFile(subpath)) {
      sanitizeDirContents(subpath)
    }
  })
}

function findTitleForPath(_path: string) {
  throwIfNotExists(_path)
  if (isFile(_path)) {
    // it's a leaf yaml file
    return readTitleInYamlFile(_path)
  } else {
    // it's a dir, it should have an _index.yaml with a title
    const indexPath = path.join(_path, INDEX_YAML)
    throwIfNotExists(indexPath, `Missing ${INDEX_YAML} in ${_path}`)
    throwIfNotFile(indexPath)
    return readTitleInYamlFile(indexPath)
  }
}

function readTitleInYamlFile(_path: string) {
  const {title} = readFileYaml(_path)
  if (!title) {
    throw new Error(`This file needs a "title": ${_path}`)
  }
  if (typeof title !== 'string') {
    throw new Error(`"Title" is not a string in ${path}`)
  }
  return title
}

sanitizeAnomaliesFilenames('fr')
sanitizeAnomaliesFilenames('en')
