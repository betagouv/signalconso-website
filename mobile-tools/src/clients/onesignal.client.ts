import {Config} from '../config/config.js'

export const sendToOneSignal = async (tags: string[], count: number) => {
  const filters = tags
    .flatMap(tag => {
      return [{field: 'tag', key: tag, relation: 'exists'}, {operator: 'OR'}]
    })
    .slice(0, -1)

  console.log('Generated one signal filters', filters)

  const frContent =
    count > 1 ? `${count} nouveaux produits rappelés hier` : `Un nouveau produit a été rappelé dans la catégorie ${tags[0]}`
  const enContent = count > 1 ? `${count} new products recalled yesterday` : `One new product has been recalled in ${tags[0]}`

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Basic ${Config.oneSignaleApiKey}`,
    },
    body: JSON.stringify({
      app_id: Config.oneSignalAppId,
      contents: {
        fr: frContent,
        en: enContent,
      },
      headings: {
        fr: '📢 Nouvelle alerte de produit dangereux',
        en: '📢 Dangerous product alert',
      },
      target_channel: 'push',
      filters: filters,
    }),
  }

  const pushResponse = await fetch(Config.oneSignalUrl, fetchOptions)

  const body = await pushResponse.json()

  console.log(`Push response status : ${pushResponse.status} with body`, body)

  return pushResponse
}
