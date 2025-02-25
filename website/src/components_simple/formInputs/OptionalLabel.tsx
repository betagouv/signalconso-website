import {useI18n} from '@/i18n/I18n'

export function OptionalLabel({required}: {required: boolean}) {
  const {m} = useI18n()
  if (required) {
    return null
  }
  return <span className="text-sm italic text-gray-500"> ({m.optional})</span>
}
