import {ReportTag} from 'anomalies/Anomaly'
import {Address} from './Address'

export interface Report {
  tags: ReportTag[]
  companyAddress: Address
  companySiret?: string
  websiteURL?: string
  employeeConsumer: boolean
  contactAgreement: boolean
}

export interface DetailInputValue {
  label: string
  value: string
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
