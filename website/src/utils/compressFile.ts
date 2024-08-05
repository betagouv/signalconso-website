import imageCompression from 'browser-image-compression'

export function compressFile(f: File): Promise<File> {
  if (f.type.includes('image/')) {
    return imageCompression(f, {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 2000,
    })
  }
  return Promise.resolve(f)
}
