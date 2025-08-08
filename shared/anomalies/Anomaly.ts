export type CategoryNode = Anomaly | Subcategory

interface CategoryNodeBase {
  subcategories?: Subcategory[]
  title: string
  id: string
  subcategoriesTitle?: string
  postReportHelper?: PostReportHelper
  askIfEmployeeConsumer?: boolean // Default (if not set) is false. Can be overridden at each level (like companyKind)
}

export interface PostReportHelper {
  title?: string
  content?: string
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
  specialCategory?: SpecialCategory
  // text or question introducing the choice between the subcategories
  isExternal?: boolean // Define if the is category is an external link
}

export const specialCategories = ['OpenFoodFacts', 'RappelConso']
export type SpecialCategory = (typeof specialCategories)[number]

export type CompanyKindQuestion = {
  label: string
  options: CompanyKindQuestionOption[]
}

type CompanyKindQuestionOption = {
  label: string
  companyKind: CompanyKind
}

type SubcategoryBase = CategoryNodeBase & {
  subcategory: string
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
  companyKind?: CompanyKind
  companyKindQuestion?: CompanyKindQuestion
  categoryOverride?: string
}

// A typical subcategory
export type StandardSubcategory = SubcategoryBase & {
  fileLabel?: string
  attachmentDesc?: string
  //Customize consumer client reference input
  customizedClientReferenceInput?: ClientReferenceInput
  customizedCompanyIdentificationTitle?: string
  detailInputs?: DetailInput[]
}

interface ClientReferenceInput {
  label?: string
  placeholder?: string
  description?: string
}

// a subcategory that blocks the user
// you can't do a signalement in this subcategory
export type SubcategoryWithInfoWall = SubcategoryBase & {
  blockingInfo: InfoWall
}

export type Subcategory = StandardSubcategory | SubcategoryWithInfoWall

export const reportTagsNotTransmittableToPro = ['BauxPrecaire'] as const

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
  'ProduitPerime',
  'CommandeEffectuee',
  'ImpressionTicket',
  'QuantiteNonConforme',
  'AppelCommercial',
  'Prix',
  'AlimentationMaterielAnimaux',
  'Telecom',
  'Shrinkflation',
  ...reportTagsNotTransmittableToPro,
] as const
export type ReportTagAllowedInYaml = (typeof reportTagsAllowedInYaml)[number]

export const reportTags = ['LitigeContractuel', 'Internet', 'OpenFoodFacts', 'RappelConso', ...reportTagsAllowedInYaml] as const
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
  'PRODUCT_POINT_OF_SALE',
  'PRODUCT_OPENFF',
  'PRODUCT_RAPPEL_CONSO',
  'TRAIN',
  'STATION',
] as const
export type CompanyKind = (typeof companyKinds)[number]
export type SpecificWebsiteCompanyKind = Extract<CompanyKind, 'MERCHANT_WEBSITE' | 'TRANSPORTER_WEBSITE'>
export type SpecificProductCompanyKind = Extract<CompanyKind, 'PRODUCT' | 'PRODUCT_POINT_OF_SALE'>

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
export type SocialNetwork = (typeof socialNetworks)[number]

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
export type Train = (typeof trains)[number]

export const ters = [
  'AUVERGNE_RHONE_ALPES',
  'BOURGOGNE_FRANCHE_COMTE',
  'BRETAGNE',
  'CENTRE_VAL_DE_LOIRE',
  'GRAND_EST',
  'HAUTS_DE_FRANCE',
  'NOUVELLE_AQUITAINE',
  'NORMANDIE',
  'OCCITANIE',
  'PAYS_DE_LA_LOIRE',
  'SUD_PACA',
] as const
export type Ter = (typeof ters)[number]

export const nightTrains = ['INTERCITE_DE_NUIT', 'NIGHTJET'] as const
export type NightTrain = (typeof nightTrains)[number]

export interface InfoWall {
  title?: string
  content?: string
  questions?: QuestionAndAnswer[]
  subTitle?: string
  reportOutOfScopeMessage?: boolean
  redirect?: RedirectToCategory[]
}

export interface RedirectToCategory {
  title: string
  categoryPath: string
  description?: string
  subcategorySlugs?: string[]
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
  TAKATA = 'TAKATA', // TEMPORARY, to be removed when the Takata issue is gone
  RADIO = 'RADIO',
  CHECKBOX = 'CHECKBOX',
  TEXTAREA = 'TEXTAREA',
}
export const allowedInputTypesInYaml = Object.values(DetailInputType).filter(_ => _ !== DetailInputType.TEXTAREA)

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

export type DetailInputTakata = DetailInputBase & {
  type: DetailInputType.TAKATA
}

export type DetailInput =
  | DetailInputText
  | DetailInputTextarea
  | DetailInputDate
  | DetailInputDateNotInFuture
  | DetailInputRadio
  | DetailInputCheckbox
  | DetailInputTimeslot
  | DetailInputTakata
