import {useI18n} from '@/i18n/I18n'
import {FileOrigin, UploadedFile} from '../../model/UploadedFile'
import {ReportFile} from './ReportFile'

export interface ReportFilesConfirmationProps {
  files?: UploadedFile[]
  fileOrigin: FileOrigin
}

export const ReportFilesConfirmation = ({fileOrigin, files}: ReportFilesConfirmationProps) => {
  const {m} = useI18n()
  return files && files.length > 0 ? (
    <ul className="flex flex-wrap items-center mt-4 list-none gap-4 p-0">
      {files
        .filter(_ => _.origin === fileOrigin)
        .map(_ => (
          <li key={_.id}>
            <ReportFile file={_} />
          </li>
        ))}
    </ul>
  ) : (
    <p className="text-gray-600">{m.noAttachment}</p>
  )
}
