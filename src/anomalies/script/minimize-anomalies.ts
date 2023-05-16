import fs from 'fs'
import path from 'path'

const files = [
  {
    input: 'anomalies.json',
    output: 'minimized-anomalies.json',
  },
]

const extractWantedPropsFromSubcategories = (obj: any) => {
  if (obj.subcategories && obj.subcategories.length !== 0) {
    const res = obj.subcategories.map(extractWantedPropsFromSubcategories)
    return {category: obj.category, id: obj.id, title: obj.title, tags: obj.tags, subcategories: res}
  } else {
    return {category: obj.category, id: obj.id, title: obj.title, tags: obj.tags}
  }
}

const root = path.join(__dirname, '..', 'yml')
files.forEach(file => {
  const obj = JSON.parse(fs.readFileSync(path.join(root, file.input), {encoding: 'utf-8'}))
  const minimizedJson = obj.map(extractWantedPropsFromSubcategories)
  const outputFile = path.join(root, file.output)
  fs.writeFileSync(outputFile, JSON.stringify(minimizedJson, null))
})
