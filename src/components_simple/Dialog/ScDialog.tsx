import {Confirm, ConfirmProps} from '../../alexlibs/mui-extension/Confirm/Confirm'
import {useI18n} from 'i18n'

export const ScDialog = ({confirmLabel, cancelLabel, ...props}: ConfirmProps) => {
  const {m} = useI18n()
  return <Confirm confirmLabel={confirmLabel ?? m.confirm} cancelLabel={cancelLabel ?? m.close} {...props} />
}
