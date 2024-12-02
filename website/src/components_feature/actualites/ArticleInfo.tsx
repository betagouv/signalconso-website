'use client'

import {isoToHumanReadableText} from '@/utils/utils'
import {useI18n} from '@/i18n/I18n'
import {isPreview, NewsArticle} from '@/components_feature/actualites/newsArticlesData'
import Tag from '@codegouvfr/react-dsfr/Tag'
import {AppLang} from '@/i18n/localization/AppLangs'

const ArticleInfo = ({article}: {article: NewsArticle}) => {
  const {m, currentLang} = useI18n()

  return (
    <span className="text-sm">
      {isPreview(article) && <Tag className={'bg-sclightpurple'}>{m.preview}</Tag>}&nbsp;
      {isoToHumanReadableText(article.date, currentLang)}
    </span>
  )
}

export default ArticleInfo
