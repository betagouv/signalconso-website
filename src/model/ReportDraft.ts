import {UploadedFile} from './UploadedFile'
import {DetailInputValue} from './Report'
import {ifDefined} from '../utils/utils'
import {CompanyKinds, ReportTag, Subcategory} from 'anomalies/Anomaly'
import {Address} from './Address'
import {ApiReportDraft} from './reportsFromApi'

export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export interface ReportDraftConsumer {
  firstName: string
  lastName: string
  email: string
  phone?: string
  referenceNumber?: string
  gender?: Gender
}

export interface CompanyDraft {
  siret: string
  name: string
  brand?: string
  address: Address
  website?: string
  phone?: string
  activityCode?: string
  isHeadOffice: boolean
  isPublic: boolean
  isOpen: boolean
}

export interface ReportDraft {
  category: string
  subcategories: Subcategory[]
  companyDraft: CompanyDraft
  details: DetailInputValue[]
  uploadedFiles?: UploadedFile[]
  consumer: ReportDraftConsumer
  employeeConsumer?: boolean
  contactAgreement: boolean
  vendor: string
  ccrfCode?: string[]
  reponseconsoCode?: string[]
  tags?: ReportTag[]
  contractualDispute?: boolean
  forwardToReponseConso?: boolean
  companyKind?: CompanyKinds
}

export class ReportDraft {
  static readonly getCompanyKindFomSubcategories = (r: ReportDraft): CompanyKinds | undefined => {
    return r.subcategories?.reverse().find(_ => !!_.companyKind)?.companyKind
  }

  static readonly isTransmittableToPro = (r: Pick<ReportDraft, 'employeeConsumer' | 'tags'>): boolean => {
    return (
      !r.employeeConsumer &&
      !(r.tags ?? []).find(_ => [ReportTag.ReponseConso, ReportTag.ProduitDangereux, ReportTag.Bloctel].includes(_))
    )
  }

  static readonly toApi = (draft: ReportDraft): ApiReportDraft => {
    return {
      ...draft,
      details: draft.details,
      gender: draft.consumer.gender,
      subcategories: draft.subcategories.map(_ => _.title),
      firstName: draft.consumer.firstName,
      lastName: draft.consumer.lastName,
      email: draft.consumer.email,
      consumerPhone: draft.consumer.phone,
      consumerReferenceNumber: draft.consumer.referenceNumber,
      fileIds: draft.uploadedFiles?.map(file => file.id) ?? [],
      companyName: draft.companyDraft.name,
      companyAddress: draft.companyDraft.address,
      companySiret: draft.companyDraft.siret,
      companyIsHeadOffice: draft.companyDraft.isHeadOffice,
      companyIsPublic: draft.companyDraft.isPublic,
      companyIsOpen: draft.companyDraft.isOpen,
      companyActivityCode: draft.companyDraft.activityCode,
      websiteURL: draft.companyDraft.website,
      phone: draft.companyDraft.phone,
      // pretty sure these fields aren't actually optional in the draft
      employeeConsumer: draft.employeeConsumer ?? false,
      tags: draft.tags ?? [],
    }
  }
}
