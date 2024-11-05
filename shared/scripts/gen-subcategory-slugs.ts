import path from 'path'
import slugify from 'slugify'
import {dirContentSorted, isFile, readFileYaml, throwIfNotDir, throwIfNotExists, writeFileYaml} from "./scriptUtils";


const rootDir = path.resolve('./anomalies/yml')

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
  const excludedFileNames = [...(options.excludedFileName ? [options.excludedFileName] : [])]
  // Rename everything with its proper name
  dirContentSorted(_path, {excludedFileNames}).map((subpath) => {
    if (isFile(subpath)) {
      const content = readFileYaml(subpath)

      if (!content.category && !content.subcategory) {
        // there's a total max length of 256 for the whole path on windows...
        content.subcategory = slugify(content.title, {strict: true, replacement: '_'}).slice(0, 100)
        writeFileYaml(subpath, content)
      }
    }
  })
  // Recurse
  dirContentSorted(_path, {excludedFileNames}).map(subpath => {
    if (!isFile(subpath)) {
      sanitizeDirContents(subpath)
    }
  })
}

sanitizeAnomaliesFilenames('fr')
