export const reportFileConfig = {
  cardSize: 90,
  cardBorderRadius: 8,
}

export enum FileType {
  Image = 'Image',
  PDF = 'PDF',
  Doc = 'Doc',
  Other = 'Other',
}

export const extensionToType = (fileName: string): FileType | undefined => {
  const ext = fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase()
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
