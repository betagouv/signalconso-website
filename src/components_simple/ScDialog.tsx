import {Confirm, ConfirmProps} from '../alexlibs/Confirm'
import {useI18n} from 'i18n/I18n'

export const ScDialog = ({confirmLabel, cancelLabel, ...props}: ConfirmProps) => {
  const {m} = useI18n()
  return <Confirm confirmLabel={confirmLabel ?? m.confirm} cancelLabel={cancelLabel ?? m.close} {...props} />
}
