import {appConfig} from '@/core/appConfig'
import {getSubcategories} from '@/feature/reportUtils'
import {toApi} from '@/feature/toApi'
import {ConsumerEmailResult} from '@/model/ConsumerEmailValidation'
import {Report} from '@/model/Report'
import {ApiCreatedReport, ApiReport} from '@/model/reportsFromApi'
import {GenericAbortSignal} from 'axios'
import {SocialNetwork, Subcategory} from 'shared/anomalies/Anomaly'
import {ResponseConsumerReview, ResponseConsumerReviewExists} from '../core/Events'
import {AppLang} from '../i18n/localization/AppLangs'
import {BarcodeProduct} from '../model/BarcodeProduct'
import {WebsiteCompanySearchResult} from '../model/Company'
import {Country} from '../model/Country'
import {CreatedReport} from '../model/CreatedReport'
import {FileOrigin, UploadedFile} from '../model/UploadedFile'
import {ApiError, BaseApiClient} from './BaseApiClient'

export class SignalConsoApiClient {
  private readonly client: BaseApiClient = new BaseApiClient({
    baseUrl: appConfig.apiBaseUrl + '/api',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  searchByBarcode = async (barcode: string): Promise<BarcodeProduct | undefined> => {
    try {
      return await this.client.get<BarcodeProduct>(`/barcode/gtin/${barcode}`)
    } catch (e) {
      if (e instanceof ApiError && e.details.code === 404) {
        return undefined
      }
      throw e
    }
  }

  searchCompaniesByUrl = (url: string) => {
    return this.client.get<WebsiteCompanySearchResult>(`/companies/hosts`, {qs: {url}})
  }

  searchCertifiedInfluencer = (influencer: string, socialNetwork: SocialNetwork) => {
    return this.client.get<boolean>(`/certified-influencer`, {qs: {name: influencer, socialNetwork}})
  }

  searchForeignCompaniesByUrl = (url: string) => {
    return this.client.get<Country[]>(`/websites/search-url`, {qs: {url}})
  }

  createReport = async (draft: Report, metadata: ApiReport['metadata']): Promise<CreatedReport> => {
    const apiReport: ApiReport = toApi(draft, metadata)
    const reportFromApi = await this.client.post<ApiCreatedReport>(`/reports`, {body: apiReport})

    const subcategories = getSubcategories(draft)
    const postReportHelper = subcategories.findLast(_ => _.postReportHelper)?.postReportHelper

    const {tags, companyAddress, companySiret, websiteURL, employeeConsumer, contactAgreement} = reportFromApi
    const res: CreatedReport = {
      tags,
      employeeConsumer,
      postReportHelper,
      contactAgreement,
      ...(companySiret !== null ? {companySiret} : null),
      ...(websiteURL !== null ? {websiteURL} : null),
      companyAddress: {
        ...companyAddress,
        country: companyAddress.country,
      },
    }
    return res
  }

  getCountries = () => this.client.get<Country[]>(`/constants/countries`)

  getUploadedFileUrl = (file: UploadedFile) =>
    `${this.client.baseUrl}/reports/files/temporary/${file.id}/${encodeURI(file.filename)}`

  uploadFile = (
    file: File,
    origin: FileOrigin,
    id: string,
    uploadProgress?: (percent: number) => void,
    signal?: GenericAbortSignal,
  ) => {
    const fileFormData: FormData = new FormData()
    fileFormData.append('reportFile', file, file.name)
    fileFormData.append('reportFileOrigin', origin)
    // We need to put manually the header since axios 1.x https://github.com/axios/axios/issues/5556
    // There are other ways but this is the quickest
    return this.client.post<UploadedFile>(`reports/files?reportFileId=${id}`, {
      body: fileFormData,
      headers: {'Content-Type': 'multipart/form-data'},
      onUploadProgress: uploadProgress
        ? progressEvent => {
            const percentCompleted = progressEvent.total ? Math.round((progressEvent.loaded * 100) / progressEvent.total) : 0.0
            uploadProgress(percentCompleted)
          }
        : undefined,
      signal: signal,
    })
  }

  removeUploadedFile = (file: UploadedFile) => {
    return this.client.delete<void>(`reports/files/temporary/${file.id}?filename=${encodeURI(file.filename)}`)
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

  checkEmail = (email: string, lang: AppLang) => {
    return this.client.post<{valid: boolean}>('/email-validation/check', {body: {email, lang}})
  }

  checkEmailAndValidate = (email: string, confirmationCode: string) => {
    return this.client.post<ConsumerEmailResult>('/email-validation/check-and-validate', {
      body: {
        email,
        confirmationCode,
      },
    })
  }

  postReviewOnReportResponse = (reportId: string, review: ResponseConsumerReview) => {
    return this.client.post<void>(`/reports/${reportId}/response/review`, {body: review})
  }

  reviewExists = (reportId: string) => {
    return this.client.get<ResponseConsumerReviewExists>(`/reports/${reportId}/response/review/exists`)
  }

  postEngagementReview = (reportId: string, review: ResponseConsumerReview) => {
    return this.client.post<void>(`/reports/${reportId}/engagement/review`, {body: review})
  }

  engagementReviewExists = (reportId: string) => {
    return this.client.get<ResponseConsumerReviewExists>(`/reports/${reportId}/engagement/review/exists`)
  }
}
