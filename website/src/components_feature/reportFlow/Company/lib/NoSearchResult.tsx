import {useI18n} from '@/i18n/I18n'

export function NoSearchResult({text}: {text?: string}) {
  const {m} = useI18n()
  return (
    <div>
      <h6 className="mb-2">
        <i className="ri-emotion-normal-line fr-icon--lg text-black" /> {m.noResultEmphasis}
      </h6>
      <p>{text ?? m.tryAdjustSearch}</p>
    </div>
  )
}
