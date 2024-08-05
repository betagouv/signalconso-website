import fs from 'fs'
import path from 'path'

const files = [
  {
    input: path.resolve('./anomalies/json/anomalies_fr.json'),
    output: path.resolve('./anomalies/json/minimized-anomalies_fr.json'),
  },
  {
    input: path.resolve('./anomalies/json/anomalies_en.json'),
    output: path.resolve('./anomalies/json/minimized-anomalies_en.json'),
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

files.forEach(({input, output}) => {
  const obj = JSON.parse(fs.readFileSync(input, {encoding: 'utf-8'}))
  const minimizedJson = obj.filter((_: any) => !_.isHiddenDemoCategory).map(extractWantedPropsFromSubcategories)
  fs.writeFileSync(output, JSON.stringify(minimizedJson, null))
})
