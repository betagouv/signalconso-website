import Fuse from 'fuse.js'
import React, {useRef, useState} from 'react'
import {createFuseIndex} from '../anomalies/Anomalies'
import {Anomaly} from '../anomalies/Anomaly'
import {useI18n} from '../i18n/I18n'
import {AppLangs} from '../i18n/localization/AppLangs'
import {AnomalyTile} from './AnomalyTile'
import {TranslatedWebsiteAlert} from './bigBanners/TranslatedWebsiteAlert'

type SearchBarProps = {
  anomalies: Anomaly[]
}

const SearchAnomalies: React.FC<SearchBarProps> = ({anomalies}) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Anomaly[]>(anomalies)
  const i18n = useI18n()
  const fIndex = createFuseIndex(anomalies)
  const fuse = new Fuse(fIndex, {
    keys: ['title', 'description'],
    threshold: 0.2,
    minMatchCharLength: 4,
    distance: 100,
    ignoreLocation: true,
  })

  const searchBoxRef = useRef<HTMLDivElement>(null)

  const searchQuery = (newQuery: string) => {
    setQuery(newQuery)

    if (newQuery.trim() !== '') {
      const results = fuse.search(newQuery.trim()).map(result => result.item)
      setSuggestions(results.map(ano => ano.root).filter((thing, i, arr) => arr.findIndex(t => t.id === thing.id) === i))
    } else {
      setSuggestions(anomalies)
    }
  }
  return (
    <>
      <h2>{i18n.m.searchAnomalies.title}</h2>
      {i18n.currentLang === AppLangs.en && <TranslatedWebsiteAlert />}
      <div className="fr-search-bar mb-8 relative" id="header-search" role="search" ref={searchBoxRef}>
        {query.trim() !== '' && (
          <div
            className="w-10 group rounded-r-lg cursor-pointer hover:bg-[#1212ff] bg-[#000091] flex items-center justify-center"
            onClick={_ => searchQuery('')}
          >
            <span className={'text-white '}> X </span>
          </div>
        )}
      </div>
      <div className="fr-container--fluid">
        <div className="fr-grid-row fr-grid-row--gutters">
          {suggestions.map(a => (
            <div key={a.id} className="fr-col-12 fr-col-sm-6 fr-col-md-4 fr-col-xl-3">
              <AnomalyTile anomaly={a} />
            </div>
          ))}
          {suggestions.length < anomalies.length && suggestions.length > 0 && (
            <div className="fr-col-12 fr-col-sm-6 fr-col-md-4 fr-col-xl-3" onClick={_ => searchQuery('')}>
              <div className={'fr-tile fr-enlarge-link'}>
                <div className={'fr-tile__body'}>
                  <div className="fr-card__img" />
                  <div className={'fr-card__content'}>
                    <button className={'fr-tile__title'} onClick={_ => searchQuery('')}>
                      {i18n.m.searchAnomalies.other}
                    </button>
                    <div className={'fr-tile__body'}>{i18n.m.searchAnomalies.displayAllAnomalies}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {suggestions.length === 0 && (
        <div className="fr-callout ">
          <h3 className="fr-callout__title">{i18n.m.searchAnomalies.noResultFound}</h3>
          <p className="fr-callout__text">{i18n.m.searchAnomalies.tryAnotherKeyword}</p>
          <button className="fr-btn" onClick={_ => searchQuery('')}>
            {i18n.m.searchAnomalies.showAllCategories}
          </button>
        </div>
      )}
    </>
  )
}

export default SearchAnomalies
