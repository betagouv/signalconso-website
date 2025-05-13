import {LimitedWidthPageContainer} from '@/components_simple/PageContainers'
import {PageComponentProps} from '@/core/metadatas'
import {getI18n} from '../i18n/I18nDictionnary'

export async function AutresSitesInternationaux(props: PageComponentProps) {
  const {lang} = await props.params
  const {messages: m} = getI18n(lang)
  return (
    <LimitedWidthPageContainer>
      {<div dangerouslySetInnerHTML={{__html: m.autresSitesInternationaux}} />}
    </LimitedWidthPageContainer>
  )
}
