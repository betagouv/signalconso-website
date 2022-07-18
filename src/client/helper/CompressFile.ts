import imageCompression from 'browser-image-compression'

export class CompressFile {
  static readonly compress = (f: File): Promise<File> => {
    if (f.type.includes('image/')) {
      return CompressFile.compressImage(f, {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 2000,
      })
    }
    return Promise.resolve(f)
  }

  static readonly compressImage = (
    f: File,
    options: {
      /** @default Number.POSITIVE_INFINITY */
      maxSizeMB?: number
      /** @default undefined */
      maxWidthOrHeight?: number
      /** @default false */
      useWebWorker?: boolean
      /** @default 10 */
      maxIteration?: number
      /** Default to be the exif orientation from the image file */
      exifOrientation?: number
      /** A function takes one progress argument (progress from 0 to 100) */
      onProgress?: (progress: number) => void
      /** Default to be the original mime type from the image file */
      fileType?: string
      /** @default 1.0 */
      initialQuality?: number
    },
  ): Promise<File> => imageCompression(f, options)
}
