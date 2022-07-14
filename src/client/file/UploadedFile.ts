export enum FileOrigin {
  Consumer = 'consumer',
}

export interface UploadedFile {
  id: string
  filename: string
  loading: boolean
  origin: FileOrigin
}
