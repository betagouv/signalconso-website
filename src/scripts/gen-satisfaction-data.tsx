import axios from 'axios'
import fs from 'fs'
import path from 'path'

// chemin du .json
const jsonOutputDir = path.resolve('./src/generate_stat_data')
const jsonOutputFile = path.join(jsonOutputDir, 'satisfaction.json')

interface DataStructure {
  [key: string]: any
}
// appel API
async function fetchData(): Promise<DataStructure> {
  const apiUrl: string =
    'https://opendata.plus.transformation.gouv.fr/api/explore/v2.1/catalog/datasets/export-resultats/records?where=%22Taux%20de%20satisfaction%20des%20usagers%22%20AND%20%22IND-27%22&order_by=date_de_mise_a_jour%20desc&limit=1'
  try {
    const response = await axios.get<DataStructure>(apiUrl)
    return response.data
  } catch (error: any) {
    console.error("Erreur lors de l'appel API:", error)
    throw error
  }
}
// verifier si les nouvelle données et les anciennes sont pareil
function isDataDifferent(newData: DataStructure, existingData: DataStructure): boolean {
  return JSON.stringify(newData) !== JSON.stringify(existingData)
}
// pour mettre a jour le .json
async function updateJsonFile(): Promise<void> {
  let existingData: DataStructure = {}

  // Vérifier si le fichier JSON existe et voir les données existantes
  if (fs.existsSync(jsonOutputFile)) {
    existingData = JSON.parse(fs.readFileSync(jsonOutputFile, 'utf8'))
  }

  // Récupérer les nouvelles données
  const newData = await fetchData()

  // Vérifier si les données ont changé
  const dataNeedsUpdate: boolean = !fs.existsSync(jsonOutputFile) || isDataDifferent(newData, existingData)

  // Creer ou mettre à jour le fichier JSON si nécessaire
  if (dataNeedsUpdate) {
    fs.writeFileSync(jsonOutputFile, JSON.stringify(newData, null, 2), 'utf8')
    console.log('Fichier JSON mis à jour.')
  } else {
    console.log('Aucune mise à jour nécessaire.')
  }
}

// Appeler la fonction pour mettre à jour le fichier JSON
;(async () => {
  try {
    await updateJsonFile()
  } catch (error) {
    console.error('Erreur lors de la mise à jour des stats de satisfaction utilisateurs ', error)
  }
})()
