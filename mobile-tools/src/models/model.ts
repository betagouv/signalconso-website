export interface DGCCRFActuRSSFeed {
  title: string
  link: string
  description: string
  items: DGCCRFActuRssItem[]
}

export interface DGCCRFActuRssItem {
  title?: string
  link?: string
  description?: string
  date?: string
  guid?: string
}

export interface RappelConso {
  total_count: number
  results: RappelConsoItem[]
}

export interface RappelConsoItem {
  nom_de_la_marque_du_produit: string
  categorie_de_produit: string
  sous_categorie_de_produit: string
  date_de_publication: string
}
