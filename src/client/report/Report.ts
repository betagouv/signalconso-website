import {Address, ReportTag, Subcategory, UploadedFile} from '../../model'
import {Gender} from './ReportDraft'

export const ReportingDateLabel = 'Date du constat'
export const ReportingTimeslotLabel = 'Heure du constat'
export const DescriptionLabel = 'Description'

export interface Report {
  id: string
  gender?: Gender
  category: string
  subcategories: Subcategory[]
  tags: ReportTag[]
  companyId: string
  companyName: string
  companyAddress: Address
  companySiret?: string
  websiteURL?: string
  vendor?: string
  phone?: string
  details: DetailInputValue[]
  firstName: string
  lastName: string
  email: string
  consumerPhone?: string
  consumerReferenceNumber?: string
  employeeConsumer: boolean
  contactAgreement: boolean
  creationDate: Date
  status: ReportStatus
  reponseconsoCode: string[]
  ccrfCode: string[]
}

export interface DetailInputValue {
  label: string
  value: string
}

export interface ReportSearchResult {
  report: Report
  files: UploadedFile[]
}

export enum ReportStatus {
  NA = 'NA',
  LanceurAlerte = 'LanceurAlerte',
  TraitementEnCours = 'TraitementEnCours',
  Transmis = 'Transmis',
  PromesseAction = 'PromesseAction',
  Infonde = 'Infonde',
  NonConsulte = 'NonConsulte',
  ConsulteIgnore = 'ConsulteIgnore',
  MalAttribue = 'MalAttribue',
}

export enum ReportStatusPro {
  NonConsulte = 'NonConsulte',
  ARepondre = 'ARepondre',
  Cloture = 'Cloture',
}

export class Report {
  static readonly closedStatus = [
    ReportStatus.PromesseAction,
    ReportStatus.Infonde,
    ReportStatus.NonConsulte,
    ReportStatus.ConsulteIgnore,
    ReportStatus.MalAttribue,
  ]

  static readonly transmittedStatus = [
    ReportStatus.TraitementEnCours,
    ReportStatus.Transmis,
    ReportStatus.PromesseAction,
    ReportStatus.Infonde,
    ReportStatus.NonConsulte,
    ReportStatus.ConsulteIgnore,
    ReportStatus.MalAttribue,
  ]

  static readonly readStatus = [
    ReportStatus.Transmis,
    ReportStatus.PromesseAction,
    ReportStatus.Infonde,
    ReportStatus.MalAttribue,
    ReportStatus.ConsulteIgnore,
  ]

  static readonly respondedStatus = [ReportStatus.PromesseAction, ReportStatus.Infonde, ReportStatus.MalAttribue]

  static readonly isClosed = (status: ReportStatus) => {
    return Report.closedStatus.includes(status)
  }

  private static readonly mapStatusPro: {[key in ReportStatus]: () => ReportStatusPro} = {
    [ReportStatus.NA]: () => {
      throw new Error(`Invalid status`)
    },
    [ReportStatus.LanceurAlerte]: () => {
      throw new Error(`Invalid status`)
    },
    [ReportStatus.TraitementEnCours]: () => ReportStatusPro.NonConsulte,
    [ReportStatus.Transmis]: () => ReportStatusPro.ARepondre,
    [ReportStatus.PromesseAction]: () => ReportStatusPro.Cloture,
    [ReportStatus.Infonde]: () => ReportStatusPro.Cloture,
    [ReportStatus.NonConsulte]: () => ReportStatusPro.Cloture,
    [ReportStatus.ConsulteIgnore]: () => ReportStatusPro.Cloture,
    [ReportStatus.MalAttribue]: () => ReportStatusPro.Cloture,
  }

  private static mapStatusProInverted: {[key in ReportStatusPro]: () => ReportStatus[]} = Object.entries(
    Report.mapStatusPro,
  ).reduce((acc, [status, statusProFn]) => {
    try {
      const statusPro = statusProFn()
      const prevStatus = acc[statusPro] ? acc[statusPro]() : []
      acc[statusPro] = () => [...prevStatus, status as ReportStatus]
      return acc
    } catch {
      return acc
    }
  }, {} as {[key in ReportStatusPro]: () => ReportStatus[]})

  static readonly getStatusProByStatus = (status: ReportStatus): ReportStatusPro => Report.mapStatusPro[status]()

  static readonly getStatusByStatusPro = (status: ReportStatusPro): ReportStatus[] => Report.mapStatusProInverted[status]()

  static readonly isGovernmentCompany = (_?: {activityCode?: string}): boolean => _?.activityCode?.startsWith('84.') ?? false
}
