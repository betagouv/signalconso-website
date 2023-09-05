export const reportFileConfig = {
  cardSize: 100,
}

export enum FileType {
  Image = 'Image',
  PDF = 'PDF',
  Doc = 'Doc',
  Other = 'Other',
}

export const extractFileExt = (fileName: string) => fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase()

export const extensionToType = (fileName: string): FileType | undefined => {
  const ext = extractFileExt(fileName)
  switch (ext) {
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'png': {
      return FileType.Image
    }
    case 'pdf': {
      return FileType.PDF
    }
    case 'doc':
    case 'docx': {
      return FileType.Doc
    }
    default: {
      return undefined
    }
  }
}
