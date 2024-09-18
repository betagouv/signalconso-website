export interface UploadingFile {
  id: string
  filename: string
  progress: number
  controller: AbortController
}
