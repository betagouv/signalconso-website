export interface SubcategoryBase extends Category {
  description?: string
  tags?: ReportTag[]
  example?: string
  reponseconsoCode?: string[] | null
  ccrfCode?: string[]
}

export interface Anomaly extends Category {
  category: string
  seoDescription?: string
  path: string
  description?: string | null
  sprite?: string
  cssClass?: string
  hidden?: boolean
  information?: Information
  breadcrumbTitle?: string
}

export type Subcategory = SubcategoryInput | SubcategoryInformation

export enum ReportTag {
  LitigeContractuel = 'LitigeContractuel',
  Hygiene = 'Hygiene',
  ProduitDangereux = 'ProduitDangereux',
  DemarchageADomicile = 'DemarchageADomicile',
  Ehpad = 'Ehpad',
  DemarchageTelephonique = 'DemarchageTelephonique',
  AbsenceDeMediateur = 'AbsenceDeMediateur',
  Bloctel = 'Bloctel',
  Influenceur = 'Influenceur',
  ReponseConso = 'ReponseConso',
  Internet = 'Internet',
  ProduitIndustriel = 'ProduitIndustriel',
  ProduitAlimentaire = 'ProduitAlimentaire',
  CompagnieAerienne = 'CompagnieAerienne',
}

export enum CompanyKinds {
  SIRET = 'SIRET',
  WEBSITE = 'WEBSITE',
  PHONE = 'PHONE',
  LOCATION = 'LOCATION',
  INFLUENCEUR = 'INFLUENCEUR',
}

export interface Category {
  id: string
  title: string
  subcategoriesTitle?: string
  subcategories?: Subcategory[]
  companyKind?: CompanyKinds
}

export interface SubcategoryInput extends SubcategoryBase {
  detailTitle?: string
  fileLabel?: string
  detailInputs?: DetailInput[]
}

export interface SubcategoryInformation extends SubcategoryBase {
  information: Information
}

export interface Information {
  title?: string
  content?: string
  actions?: Action[]
  subTitle?: string
  outOfScope?: boolean
}

export interface Action {
  question: string
  example?: string
  answer: string
}

export enum DetailInputType {
  TEXT = 'TEXT',
  DATE_NOT_IN_FUTURE = 'DATE_NOT_IN_FUTURE',
  DATE = 'DATE',
  TIMESLOT = 'TIMESLOT',
  RADIO = 'RADIO',
  CHECKBOX = 'CHECKBOX',
  TEXTAREA = 'TEXTAREA',
}

export interface DetailInput {
  label: string
  /** @deprecated */
  rank?: number
  type: DetailInputType
  placeholder?: string
  options?: string[]
  defaultValue?: 'SYSDATE'
  example?: string
  optionnal?: boolean
}
