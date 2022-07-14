import {ApiClientApi} from '../ApiClient'
import {FileOrigin, UploadedFile} from './UploadedFile'

export class FileClient {
  constructor(private client: ApiClientApi) {}

  readonly getLink = (file: UploadedFile) => `${this.client.baseUrl}/reports/files/${file.id}/${encodeURI(file.filename)}`

  readonly upload = (file: File, origin: FileOrigin) => {
    const fileFormData: FormData = new FormData()
    fileFormData.append('reportFile', file, file.name)
    fileFormData.append('reportFileOrigin', origin)
    return this.client.post<UploadedFile>(`reports/files`, {body: fileFormData})
  }

  readonly remove = (file: UploadedFile) => {
    return this.client.delete(`/reports/files/${file.id}/${encodeURI(file.filename)}`)
  }
}
