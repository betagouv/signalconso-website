import {getI18n} from '@/i18n/I18nDictionnary'
import {AppLang} from '@/i18n/localization/AppLangs'

export function ErrorPageContent({lang}: {lang: AppLang}) {
  const {messages: m} = getI18n(lang)
  return (
    <main role="main" id="main-content">
      <div className="fr-container">
        <div className="my-20 py-1 px-5 border-l-[10px] border-scorange border-solid border-0">
          <h1 className="text-scorange ">{m.minimalErrorTitle}</h1>
          <p>{m.minimalErrorText}</p>
        </div>
      </div>
    </main>
  )
}
