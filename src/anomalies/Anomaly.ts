export type CategoryNode = Anomaly | Subcategory

interface CategoryNodeBase {
  subcategories?: Subcategory[]
  title: string
  id: string
  subcategoriesTitle?: string
}

export type Anomaly = CategoryNodeBase & {
  // Stored in DB, should not change
  category: string
  // URL path
  path: string
  // used for the display order on the HP
  // and to generate the ids of the subcategories
  description: string
  seoTitle: string
  seoDescription: string
  img: string
  hidden?: boolean
  isHiddenDemoCategory?: boolean
  isSpecialOpenFoodFactsCategory?: boolean
  // text or question introducing the choice between the subcategories
}

type CompanyKindQuestion = {
  label: string
  options: CompanyKindQuestionOption[]
}

type CompanyKindQuestionOption = {
  label: string
  companyKind: CompanyKinds
}

type SubcategoryBase = CategoryNodeBase & {
  // ex: "3.2.1.3.1.1.1"
  // Not in the yaml, they are generated recursively
  // Seem to be used in the JS as a unique identifier for the inputs values in the forms
  // the main label
  // text or question introducing the choice between the next subcategories
  // only makes sense if there are subcategories
  tags?: ReportTagAllowedInYaml[]
  desc?: string
  reponseconsoCode?: string
  ccrfCode?: string[]
  companyKind?: CompanyKinds
  companyKindQuestion?: CompanyKindQuestion
  categoryOverride?: string
  // Temporary, to control the display of one specific subcategory through a feature flag
  isAccessibiliteSubcategory?: boolean
}

// A typical subcategory
export type StandardSubcategory = SubcategoryBase & {
  fileLabel?: string
  detailInputs?: DetailInput[]
}

// a subcategory that blocks the user
// you can't do a signalement in this subcategory
export type SubcategoryWithInfoWall = SubcategoryBase & {
  blockingInfo: InfoWall
}

export type Subcategory = StandardSubcategory | SubcategoryWithInfoWall

export const reportTagsAllowedInYaml = [
  'Hygiene',
  'ProduitDangereux',
  'DemarchageADomicile',
  'Ehpad',
  'DemarchageTelephonique',
  'DemarchageInternet',
  'AbsenceDeMediateur',
  'Influenceur',
  'ReponseConso',
  'ProduitIndustriel',
  'ProduitAlimentaire',
  'CompagnieAerienne',
  'Resiliation',
  'TransitionEcologique',
] as const
export type ReportTagAllowedInYaml = (typeof reportTagsAllowedInYaml)[number]

export const reportTags = ['LitigeContractuel', 'Internet', 'OpenFoodFacts', ...reportTagsAllowedInYaml] as const
export type ReportTag = (typeof reportTags)[number]

export const companyKinds = [
  'SIRET',
  'WEBSITE',
  'MERCHANT_WEBSITE',
  'TRANSPORTER_WEBSITE',
  'PHONE',
  'LOCATION',
  'SOCIAL',
  'PRODUCT',
  'PRODUCT_OPENFF',
  'TRAIN',
] as const
export type CompanyKinds = (typeof companyKinds)[number]
export type SpecificWebsiteCompanyKinds = Extract<CompanyKinds, 'MERCHANT_WEBSITE' | 'TRANSPORTER_WEBSITE'>

export const socialNetworks = [
  'SNAPCHAT',
  'INSTAGRAM',
  'FACEBOOK',
  'YOUTUBE',
  'TIKTOK',
  'TWITTER',
  'TWITCH',
  'LINKEDIN',
  'OTHER',
] as const
export type SocialNetworks = (typeof socialNetworks)[number]

export const trains = [
  'INOUI_INTERCITES',
  'OUIGO',
  'TER',
  'TRANSILIEN',
  'EUROSTAR',
  'TGV_LYRIA',
  'TGV_ITALIE',
  'TRENITALIA',
  'RENFE',
  'ICE',
  'TRAIN_DE_NUIT',
] as const
export type Trains = (typeof trains)[number]

export const ters = [
  'SUD',
  'AUVERGNE_RHONE_ALPES',
  'BOURGOGNE_FRANCHE_COMTE',
  'BRETAGNE',
  'CENTRE_VAL_DE_LOIRE',
  'GRAND_EST',
  'HAUTS_DE_FRANCE',
  'NOUVELLE_AQUITAINE',
  'NORMANDIE',
  'OCCITANIE',
  'PACA',
  'PAYS_DE_LA_LOIRE',
] as const
export type Ters = (typeof ters)[number]

export const nightTrains = ['INTERCITE_DE_NUIT', 'AUTRE_TRAIN_DE_NUIT'] as const
export type NightTrains = (typeof nightTrains)[number]

export interface InfoWall {
  title?: string
  content?: string
  questions?: QuestionAndAnswer[]
  subTitle?: string
  notAFraudMessage?: boolean
}

export interface QuestionAndAnswer {
  question: string
  desc?: string
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
  optional?: boolean // if missing, means false
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
