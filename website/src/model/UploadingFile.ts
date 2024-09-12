export interface UploadingFIle {
  id: string
  filename: string
  progress: number
  controller: AbortController
}
