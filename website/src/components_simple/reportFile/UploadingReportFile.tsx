import Button from '@codegouvfr/react-dsfr/Button'

interface UploadingReportFileProps {
  fileName: string
  percent: number
  onRemove?: () => void
}

export const UploadingReportFile = ({fileName, percent, onRemove}: UploadingReportFileProps) => {
  return (
    <div className="flex flex-col">
      <div className="inline-flex border border-solid border-gray-500 overflow-hidden rounded h-[100px] w-[100px] relative">
        <div>
          <svg className="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200" stroke-width="2"></circle>
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className="stroke-current text-scbluefrance"
              stroke-width="2"
              stroke-dasharray="100"
              stroke-dashoffset={100 - percent}
              stroke-linecap="round"
            ></circle>
          </svg>

          <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <span className="text-center text-sm font-bold text-scbluefrance">{percent} %</span>
          </div>
        </div>
      </div>
      <span className="px-1 w-[100px] text-black text-center text-sm whitespace-nowrap overflow-hidden text-ellipsis">
        {fileName}
      </span>
      {onRemove && (
        <div className="w-full text-center">
          <Button
            size="small"
            iconId="fr-icon-delete-line"
            priority="tertiary no outline"
            className="!p-0"
            onClick={onRemove}
            nativeButtonProps={{
              'aria-label': `Annuler ${fileName}`,
            }}
          >
            Annuler
          </Button>
        </div>
      )}
    </div>
  )
}
