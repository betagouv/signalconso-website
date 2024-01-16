import axios from 'axios'
import fs from 'fs'
import path from 'path'

// chemin du .json
const jsonOutputDir = path.resolve('./src/generate_stat_data')
const jsonOutputFile = path.join(jsonOutputDir, 'satisfaction.json')

interface DataStructure {
  valeur: number
  date_de_mise_a_jour: string
}
// appel API
async function fetchData(): Promise<DataStructure> {
  const apiUrl: string =
    'https://opendata.plus.transformation.gouv.fr/api/explore/v2.1/catalog/datasets/export-resultats/records?where=%22Taux%20de%20satisfaction%20des%20usagers%22%20AND%20%22IND-27%22&order_by=date_de_mise_a_jour%20desc&limit=1'
  try {
    const response = await axios.get<{results: Array<DataStructure>}>(apiUrl)
    const fullData = response.data.results[0]

    // Extraire uniquement les champs nécessaires
    const data: DataStructure = {
      valeur: fullData.valeur,
      date_de_mise_a_jour: fullData.date_de_mise_a_jour,
    }
    // Vérification des types
    if (typeof data.valeur !== 'number' || typeof data.date_de_mise_a_jour !== 'string') {
      throw new Error('Type de données incorrect')
    }

    return data
  } catch (error: any) {
    console.error("Erreur lors de l'appel API:", error)
    throw error
  }
}

// pour mettre a jour le .jsonj
async function updateJsonFile(): Promise<void> {
  // Récupérer les nouvelles données
  const newData = await fetchData()

  // Écrire les nouvelles données dans le fichier JSON
  fs.writeFileSync(jsonOutputFile, JSON.stringify(newData, null, 2), 'utf8')
  console.log('Fichier JSON mis à jour.')
}

// Appeler la fonction pour mettre à jour le fichier JSON
updateJsonFile()
