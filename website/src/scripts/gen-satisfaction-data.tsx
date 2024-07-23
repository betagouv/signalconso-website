import axios from 'axios'
import fs from 'fs'
import path from 'path'
import z from 'zod'

const jsonOutputFile = path.join('./src/generate_stat_data/satisfaction.json')

type SatisfactionData = {
  valeur: number
  date_de_mise_a_jour: string
}

const apiResponseSchema = z.object({
  results: z
    .array(
      z.object({
        // attention on a reçu ici parfois des nombres,
        // parfois des nombres stringifiés
        valeur: z.coerce.number(),
        date_de_mise_a_jour: z.string(),
      }),
    )
    .nonempty(),
})

async function fetchData(): Promise<SatisfactionData> {
  const apiUrl: string =
    'https://opendata.plus.transformation.gouv.fr/api/explore/v2.1/catalog/datasets/export-resultats/records?where=%22Taux%20de%20satisfaction%20des%20usagers%22%20AND%20%22IND-27%22&order_by=date_de_mise_a_jour%20desc&limit=1'
  console.log(`>> Call to ${apiUrl}`)
  const response = await axios.get<unknown>(apiUrl)
  const responseTyped = apiResponseSchema.parse(response.data)
  return responseTyped.results[0]
}

async function updateJsonFile(): Promise<void> {
  const newData = await fetchData()
  fs.writeFileSync(jsonOutputFile, JSON.stringify(newData, null, 2), 'utf8')
  console.log('Fichier JSON mis à jour.')
}

updateJsonFile()
