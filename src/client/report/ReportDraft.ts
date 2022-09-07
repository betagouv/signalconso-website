import {UploadedFile} from '../file/UploadedFile'
import {DetailInputValue} from './Report'
import {Address, CompanyKinds, ReportTag, Subcategory} from '../../model'
import {map} from '../../alexlibs/ts-utils'
import {uniqBy} from 'core/lodashNamedExport'

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

  static readonly tags = (r: ReportDraft): ReportTag[] => {
    const tags = (r.subcategories ?? []).flatMap(_ => _.tags ?? [])
    if (ReportDraft.getCompanyKindFomSubcategories(r) === CompanyKinds.WEBSITE) {
      tags.push(ReportTag.Internet)
    }
    if (!r.forwardToReponseConso) {
      return tags.filter(_ => _ !== ReportTag.ReponseConso)
    }
    return tags
  }

  static readonly isTransmittableToPro = (r: Pick<ReportDraft, 'employeeConsumer' | 'tags'>): boolean => {
    return (
      !r.employeeConsumer &&
      !(r.tags ?? []).find(_ => [ReportTag.ReponseConso, ReportTag.ProduitDangereux, ReportTag.Bloctel].includes(_))
    )
  }

  static readonly toApi = (draft: ReportDraft): any => {
    return {
      ...draft,
      details: draft.details,
      gender: draft.consumer.gender,
      subcategories: map(draft.subcategories, subcategories => subcategories.map(_ => _.title ?? _)),
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
      companyIsOpen: draft.companyDraft.isOpen,
      companyActivityCode: draft.companyDraft.activityCode,
      websiteURL: draft.companyDraft.website,
      phone: draft.companyDraft.phone,
    }
  }
}
