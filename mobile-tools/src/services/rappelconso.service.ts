import {fetchRappelConso} from '../clients/rappelconso.client.js'
import {sendToOneSignal} from '../clients/onesignal.client.js'
import {RappelConso} from '../models/model.js'

const fetchYesterdayRappelConso = (): Promise<RappelConso> => {
  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayAsString = yesterday.toISOString().split('T')[0]
  return fetchRappelConso(yesterdayAsString, today, 20)
}

export const fetchAndExtractRappelConso = async () => {
  const rappelConsoResult = await fetchYesterdayRappelConso()

  const count = rappelConsoResult.results.length

  const subCategoryTitles = [...new Set(rappelConsoResult.results.map(item => item.sous_categorie_de_produit))]

  const tags = categories
    .filter(category => category.sub_categories.filter(subCategory => subCategoryTitles.includes(subCategory.title)).length > 0)
    .map(category => category.category_tag)

  if (tags.length === 0) {
    console.log(`No category found for yesterday. Nothing to do.`)
    return Promise.resolve()
  } else {
    console.log(`Categories found for yesterday: ${tags} for ${count} rappels`)
    return sendToOneSignal(tags, count)
  }
}

const categories = [
  {
    category_title: 'Alimentation',
    category_tag: 'alimentation',
    sub_categories: [
      {title: 'Additifs alimentaires', tag: 'additifs-alimentaires'},
      {title: 'Alcool et vin', tag: 'alcool-et-vin'},
      {title: 'Aliments diététiques et nutrition', tag: 'aliments-dietétiques-et-nutrition'},
      {title: 'Aliments pour animaux domestiques', tag: 'aliments-pour-animaux-domestiques'},
      {title: "Aliments pour animaux d'élevage", tag: 'aliments-pour-animaux-d-elevage'},
      {title: 'Aliments pour bébés', tag: 'aliments-pour-bebes'},
      {
        title: "Beurres d'origine végétale, graisses margarines et huiles",
        tag: 'beurres-origine-vegetale-graisses-margarines-huiles',
      },
      {title: 'Boissons non alcoolisées', tag: 'boissons-non-alcoolisees'},
      {title: 'Cacao, café et thé', tag: 'cacao-cafe-et-the'},
      {title: 'Céréales et produits de boulangerie', tag: 'cereales-et-produits-de-boulangerie'},
      {title: 'Eaux', tag: 'eaux'},
      {title: 'Escargots et grenouilles', tag: 'escargots-et-grenouilles'},
      {title: 'Fruits et légumes', tag: 'fruits-et-legumes'},
      {title: 'Herbes et épices', tag: 'herbes-et-epices'},
      {title: 'Lait et produits laitiers', tag: 'lait-et-produits-laitiers'},
      {title: 'Miel et gelée royale', tag: 'miel-et-gelee-royale'},
      {title: 'Noix et graines', tag: 'noix-et-graines'},
      {title: "Oeufs et produits à base d'oeufs", tag: 'oeufs-et-produits-a-base-d-oeufs'},
      {title: 'Plats préparés et snacks', tag: 'plats-prepares-et-snacks'},
      {title: "Produits de la pêche et d'aquaculture", tag: 'produits-de-la-peche-et-d-aquaculture'},
      {title: 'Produits sucrés', tag: 'produits-sucres'},
      {title: 'Soupes, sauces et condiments', tag: 'soupes-sauces-et-condiments'},
      {title: 'Viandes', tag: 'viandes'},
      {title: 'Autres', tag: 'autres'},
    ],
  },
  {
    category_title: 'Alimentation Bébés-enfants',
    category_tag: 'alimentation-bebe-enfants',
    sub_categories: [
      {title: 'Aliments pour bébés', tag: 'aliments-pour-bebes'},
      {title: 'Céréales et produits de boulangerie', tag: 'cereales-et-produits-de-boulangerie'},
      {title: 'Lait et produits laitiers', tag: 'lait-et-produits-laitiers'},
      {title: 'Eaux', tag: 'eaux'},
      {title: 'Cacao, café et thé', tag: 'cacao-cafe-et-the'},
      {title: 'Produits sucrés', tag: 'produits-sucres'},
    ],
  },
  {
    category_title: 'Automobile et moyens de déplacement',
    category_tag: 'automobile-et-moyens-de-deplacement',
    sub_categories: [
      {title: 'Automobiles, motos, scooters', tag: 'automobiles-motos-scooters'},
      {
        title: 'Vélos, bicyclettes, vélos à assistance électrique',
        tag: 'velos-bicyclettes-velos-a-assistance-electrique',
      },
      {title: 'Engins de déplacement personnel', tag: 'engins-de-deplacement-personnel'},
      {title: 'Autres moyens de déplacement', tag: 'autres-moyens-de-deplacement'},
      {title: 'Pneus', tag: 'pneus'},
      {title: "Tous types d'accessoires", tag: 'tous-types-d-accessoires'},
    ],
  },
  {
    category_title: 'Bébés-enfants (hors alimentaire)',
    category_tag: 'bebes-enfants-hors-alimentaire',
    sub_categories: [
      {title: 'Articles pour enfants et puériculture', tag: 'articles-pour-enfants-et-puericulture'},
      {title: 'Jouets', tag: 'jouets'},
      {title: 'Matériels scolaires', tag: 'materiels-scolaires'},
    ],
  },
  {
    category_title: 'Hygiène-Beauté',
    category_tag: 'hygiene-beaute',
    sub_categories: [
      {title: 'Cosmétiques', tag: 'cosmetiques'},
      {title: 'Produits d’hygiène (cotons, intime, papiers)', tag: 'produits-d-hygiene-cotons-intime-papiers'},
      {title: 'Dispositifs médicaux grand public', tag: 'dispositifs-medicaux-grand-public'},
      {title: 'Produits de tatouage', tag: 'produits-de-tatouage'},
    ],
  },
  {
    category_title: 'Vêtements, Mode, EPI',
    category_tag: 'vetements-mode-epi',
    sub_categories: [
      {title: 'Vêtements, textiles, accessoires de mode', tag: 'vetements-textiles-accessoires-de-mode'},
      {title: 'Bijouterie', tag: 'bijouterie'},
      {title: 'Equipements de Protection Individuels', tag: 'equipements-de-protection-individuels'},
    ],
  },
  {
    category_title: 'Sports-loisirs',
    category_tag: 'sports-loisirs',
    sub_categories: [
      {title: 'Equipements de sports et de loisirs', tag: 'equipements-de-sports-et-de-loisirs'},
      {title: 'Articles pyrotechniques', tag: 'articles-pyrotechniques'},
      {title: 'Gadgets', tag: 'gadgets'},
    ],
  },
  {
    category_title: 'Maison-Habitat',
    category_tag: 'maison-habitat',
    sub_categories: [
      {title: 'Articles de décoration', tag: 'articles-de-decoration'},
      {title: 'Articles imitant les denrées alimentaires', tag: 'articles-imitant-les-denrees-alimentaires'},
      {title: 'Appareils à gaz', tag: 'appareils-a-gaz'},
      {title: 'Appareils à pression', tag: 'appareils-a-pression'},
      {title: 'Mobilier', tag: 'mobilier'},
      {title: 'Papiers, cartons', tag: 'papiers-cartons'},
      {title: 'Produits chimiques', tag: 'produits-chimiques'},
      {title: 'Produits de construction', tag: 'produits-de-construction'},
      {title: 'Matériel de cuisine (sauf électroménager)', tag: 'materiel-de-cuisine-sauf-electromenager'},
    ],
  },
  {
    category_title: 'Appareils électriques, Outils',
    category_tag: 'appareils-electriques-outils',
    sub_categories: [
      {title: 'Appareils électriques, électroménager', tag: 'appareils-electriques-electromenager'},
      {title: 'Machines', tag: 'machines'},
      {title: 'Outils à main', tag: 'outils-a-main'},
    ],
  },
  {
    category_title: 'Equipements de communication',
    category_tag: 'equipements-de-communication',
    sub_categories: [{title: 'Equipements de communication, média', tag: 'equipements-de-communication-media'}],
  },
]
