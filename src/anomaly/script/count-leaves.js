let anomalies
try {
  anomalies = require('../yml/anomalies.json')
} catch (error) {
  console.error('Merci de générer le fichier anomalies.json au préalable.')
  process.exit()
}

function countLeavesInSubcategory(sub, tag, hasTagInPath) {
  if (tag && sub.hasOwnProperty('tags') && sub.tags.includes(tag)) {
    hasTagInPath = true
  }

  if (sub.hasOwnProperty('subcategories')) {
    return sub.subcategories.reduce(
      (counter, currentSubcategory) => counter + countLeavesInSubcategory(currentSubcategory, tag, hasTagInPath),
      0,
    )
  } else {
    if (!tag || (tag && hasTagInPath)) {
      return 1
    } else {
      return 0
    }
  }
}

function countLeavesInCategory(category, tag) {
  if (!category.hasOwnProperty('subcategories')) {
    return 0
  }

  return category.subcategories.reduce(
    (counter, currentSubcategory) => counter + countLeavesInSubcategory(currentSubcategory, tag),
    0,
  )
}

function countLeavesInCategoriesList(categoriesList, tag) {
  return categoriesList
    .filter(_ => !_.hidden || _.hidden === false)
    .reduce((counter, currentCategory) => counter + countLeavesInCategory(currentCategory, tag), 0)
}

function getTagFromCmdLineArgument() {
  return process.argv[2]
}

console.log(`Nombre total de feuilles: ${countLeavesInCategoriesList(anomalies.list)}`)

const tag = getTagFromCmdLineArgument()
if (tag) {
  console.log(`Nombre de feuilles avec tag "${tag}" dans chemin: ${countLeavesInCategoriesList(anomalies.list, tag)}`)
}
