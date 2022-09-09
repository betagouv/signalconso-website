export interface Category {
  // ex: 2.2.1.3.1.1.1
  // For the Anomaly we write them in the yaml
  // For the subcategories, they are generated recursively
  id: string
  // for the Anomaly, this is the html <title> on its page
  // for the subcategories, this is the main label
  title: string
  // text or question introducing the choice between the next subcategories
  // only makes sense if there are subcategories
  subcategoriesTitle?: string
  subcategories?: Subcategory[]
}

export interface Anomaly extends Category {
  category: string
  description: string
  seoDescription?: string
  path: string
  sprite: string
  hidden?: boolean
  isHiddenDemoCategory?: boolean
}

export interface SubcategoryBase extends Category {
  tags?: ReportTag[]
  example?: string
  reponseconsoCode?: string[] | null
  ccrfCode?: string[]
  companyKind?: CompanyKinds
}

export type Subcategory = SubcategoryInput | SubcategoryInformation

export interface SubcategoryInput extends SubcategoryBase {
  fileLabel?: string
  detailInputs?: DetailInput[]
}

export interface SubcategoryInformation extends SubcategoryBase {
  information: Information
}

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

interface DetailInputBase {
  label: string
  type: DetailInputType
  optional?: boolean
}

export type DetailInputText = DetailInputBase & {
  type: DetailInputType.TEXT
  placeholder?: string
}
export type DetailInputTextarea = DetailInputBase & {
  type: DetailInputType.TEXTAREA
  placeholder?: string
}
export type DetailInputDate = DetailInputBase & {
  type: DetailInputType.DATE
  defaultValue?: 'SYSDATE'
}
export type DetailInputDateNotInFuture = DetailInputBase & {
  type: DetailInputType.DATE_NOT_IN_FUTURE
  defaultValue?: 'SYSDATE'
}
export type DetailInputRadio = DetailInputBase & {
  type: DetailInputType.RADIO
  options: string[]
}
export type DetailInputCheckbox = DetailInputBase & {
  type: DetailInputType.CHECKBOX
  options: string[]
}
export type DetailInputTimeslot = DetailInputBase & {
  type: DetailInputType.TIMESLOT
}

export type DetailInput =
  | DetailInputText
  | DetailInputTextarea
  | DetailInputDate
  | DetailInputDateNotInFuture
  | DetailInputRadio
  | DetailInputCheckbox
  | DetailInputTimeslot
