import {useI18n} from '@/i18n/I18n'
import {PortalToBody} from '@/utils/PortalToBody'
import Button from '@codegouvfr/react-dsfr/Button'
import {createModal} from '@codegouvfr/react-dsfr/Modal'

export function ReportFileDeleteButton({filename, onConfirm}: {filename: string; onConfirm: () => void}) {
  const {m} = useI18n()
  const modal = createModal({
    id: `file-delete-modal-${filename}`,
    isOpenedByDefault: false,
  })
  return (
    <>
      <Button
        size="small"
        iconId="fr-icon-delete-line"
        priority="tertiary no outline"
        className="!p-0"
        nativeButtonProps={{
          ...modal.buttonProps,
          'aria-label': `${m.delete} ${filename}`,
        }}
      >
        {m.delete.toLowerCase()}
      </Button>
      <PortalToBody>
        <modal.Component
          title={m.removeAsk}
          size="small"
          buttons={[
            {
              onClick: onConfirm,
              children: m.delete,
              doClosesModal: true,
            },
          ]}
        >
          <p className="mb-0" dangerouslySetInnerHTML={{__html: m.thisWillBeRemoved(filename)}} />
        </modal.Component>
      </PortalToBody>
    </>
  )
}
