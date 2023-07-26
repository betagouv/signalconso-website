import {appConfig} from 'core/appConfig'
import {BaseApiClient} from './BaseApiClient'
import {WebsiteCompanySearchResult} from '../model/Company'
import {Country} from '../model/Country'
import {FileOrigin, UploadedFile} from '../model/UploadedFile'
import {CreatedReport} from '../model/CreatedReport'
import {ReportDraft} from '../model/ReportDraft'
import {Subcategory} from 'anomalies/Anomaly'
import {ConsumerEmailResult} from 'model/ConsumerEmailValidation'
import {ApiCreatedReport, ApiReportDraft} from 'model/reportsFromApi'
import {ResponseConsumerReview, ResponseConsumerReviewExists} from '../core/Events'

type PublicStat =
  | 'PromesseAction'
  | 'Reports'
  | 'TransmittedPercentage'
  | 'ReadPercentage'
  | 'ResponsePercentage'
  | 'WebsitePercentage'

export type CountByDate = {
  date: Date
  count: number
}

export class SignalConsoApiClient {
  private readonly client: BaseApiClient = new BaseApiClient({
    baseUrl: appConfig.apiBaseUrl + '/api',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  searchCompaniesByUrl = (url: string) => {
    return this.client.get<WebsiteCompanySearchResult>(`/companies/hosts`, {qs: {url}})
  }

  searchForeignCompaniesByUrl = (url: string) => {
    return this.client.get<Country[]>(`/websites/search-url`, {qs: {url}})
  }

  createReport = async (draft: ReportDraft, metadata: ApiReportDraft['metadata']): Promise<CreatedReport> => {
    const apiReportDraft: ApiReportDraft = ReportDraft.toApi(draft, metadata)

    const reportFromApi = await this.client.post<ApiCreatedReport>(`/reports`, {body: apiReportDraft})
    const {tags, companyAddress, companySiret, websiteURL, employeeConsumer, contactAgreement} = reportFromApi
    const res: CreatedReport = {
      tags,
      employeeConsumer,
      contactAgreement,
      ...(companySiret !== null ? {companySiret} : null),
      ...(websiteURL !== null ? {websiteURL} : null),
      companyAddress: {
        ...companyAddress,
        country: companyAddress.country?.name,
      },
    }
    return res
  }

  getPublicStatCount = (publicStat: PublicStat) => {
    return this.client.get<number>(`stats/reports/public/count`, {qs: {publicStat}})
  }

  getPublicStatCurve = async (publicStat: PublicStat): Promise<CountByDate[]> => {
    const res = await this.client.get<{count: number; date: string}[]>(`stats/reports/public/curve`, {qs: {publicStat}})
    return res.map(({date, ...rest}) => ({
      date: new Date(date),
      ...rest,
    }))
  }

  getCountries = () => this.client.get<Country[]>(`/constants/countries`)

  getDocumentLink = (file: UploadedFile) => `${this.client.baseUrl}/reports/files/${file.id}/${encodeURI(file.filename)}`

  uploadDocument = (file: File, origin: FileOrigin) => {
    const fileFormData: FormData = new FormData()
    fileFormData.append('reportFile', file, file.name)
    fileFormData.append('reportFileOrigin', origin)
    // We need to put manually the header since axios 1.x https://github.com/axios/axios/issues/5556
    // There are other ways but this is the quickest
    return this.client.post<UploadedFile>(`reports/files`, {body: fileFormData, headers: {'Content-Type': 'multipart/form-data'}})
  }

  rateSubcategory = (category: string, subcategories: Subcategory[], positive: boolean): Promise<void> => {
    return this.client.post(`/rating`, {
      body: {
        category,
        subcategories: subcategories
          ? subcategories.map(subcategory => (subcategory.title ? subcategory.title : subcategory))
          : [''],
        positive,
      },
    })
  }

  checkEmail = (email: string) => {
    return this.client.post<{valid: boolean}>('/email-validation/check', {body: {email}})
  }

  checkEmailAndValidate = (email: string, confirmationCode: string) => {
    return this.client.post<ConsumerEmailResult>('/email-validation/check-and-validate', {body: {email, confirmationCode}})
  }

  postReviewOnReportResponse = (reportId: string, review: ResponseConsumerReview) => {
    return this.client.post<void>(`/reports/${reportId}/response/review`, {body: review})
  }

  reviewExists = (reportId: string) => {
    return this.client.get<ResponseConsumerReviewExists>(`/reports/${reportId}/response/review/exists`)
  }
}
