export enum FileOrigin {
  Consumer = 'consumer',
  Professional = 'professional',
}

export interface UploadedFile {
  id: string
  filename: string
  loading: boolean
  origin: FileOrigin
}
