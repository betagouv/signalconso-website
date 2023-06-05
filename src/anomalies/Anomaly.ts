export type Anomaly = {
  // Stored in DB, should not change
  category: string
  // URL path
  path: string
  // used for the display order on the HP
  // and to generate the ids of the subcategories
  id: string
  title: string
  description: string
  seoTitle: string
  seoDescription: string
  img: string
  hidden?: boolean
  isHiddenDemoCategory?: boolean
  // text or question introducing the choice between the subcategories
  subcategoriesTitle?: string
  subcategories: Subcategory[]
  companyKindQuestion?: CompanyKindQuestion
}

type CompanyKindQuestion = {
  label: string
  options: CompanyKindQuestionOption[]
}

type CompanyKindQuestionOption = {
  label: string
  companyKind: CompanyKinds
}

type SubcategoryBase = {
  // ex: "3.2.1.3.1.1.1"
  // Not in the yaml, they are generated recursively
  // Seem to be used in the JS as a unique identifier for the inputs values in the forms
  id: string
  // the main label
  title: string
  // text or question introducing the choice between the next subcategories
  // only makes sense if there are subcategories
  subcategoriesTitle?: string
  subcategories?: Subcategory[]
  tags?: ReportTagAllowedInYaml[]
  desc?: string
  reponseconsoCode?: string[] | null
  ccrfCode?: string[]
  companyKind?: CompanyKinds
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
  'Bloctel',
  'Influenceur',
  'ReponseConso',
  'Internet',
  'ProduitIndustriel',
  'ProduitAlimentaire',
  'CompagnieAerienne',
] as const
export type ReportTagAllowedInYaml = typeof reportTagsAllowedInYaml[number]

export const reportTags = ['LitigeContractuel', ...reportTagsAllowedInYaml] as const
export type ReportTag = typeof reportTags[number]

export const companyKinds = ['SIRET', 'WEBSITE', 'PHONE', 'LOCATION', 'SOCIAL'] as const
export type CompanyKinds = typeof companyKinds[number]

export const socialNetworks = ['SNAPCHAT', 'INSTAGRAM', 'FACEBOOK', 'YOUTUBE', 'TIKTOK', 'TWITTER', 'TWITCH', 'LINKEDIN'] as const
export type SocialNetworks = typeof socialNetworks[number]

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
