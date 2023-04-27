import React, {useRef, useState} from 'react'
import Fuse from 'fuse.js'
import {Anomaly} from '../../anomalies/Anomaly'
import {createFuseIndex} from '../../anomalies/Anomalies'
import {AnomalyTile} from '../AnomalyTile/AnomalyTile'
import {EventCategories} from '../../analytic/analytic'
import {useAnalyticContext} from '../../analytic/AnalyticContext'
import {useI18n} from '../../i18n/I18n'
import {useConfig} from '../../context/ConfigContext'

type SearchBarProps = {
  anomalies: Anomaly[]
}

const SearchAnomalies: React.FC<SearchBarProps> = ({anomalies}) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Anomaly[]>(anomalies)
  const i18n = useI18n()
  const fIndex = createFuseIndex(anomalies)
  const _analytic = useAnalyticContext()
  const fuse = new Fuse(fIndex, {
    keys: ['title', 'description'],
    threshold: 0.2,
    minMatchCharLength: 4,
    distance: 100,
    ignoreLocation: true,
  })
  const {enableSearchCategories} = useConfig().config
  const handleInputBlur = () => {
    if (query !== '') {
      _analytic.trackEvent(EventCategories.categorySearch, 'Recherche par mot clé', 'query', query)
    }
  }

  const searchBoxRef = useRef<HTMLDivElement>(null)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value
    searchQuery(newQuery)
  }

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
      <h2>Quel problème avez-vous rencontré ?</h2>

      <div className="fr-search-bar mb-8 relative" id="header-search" role="search" ref={searchBoxRef}>
        {enableSearchCategories && (
          <input
            className="fr-input"
            placeholder={i18n.m.searchCategoryPlaceholder}
            id="search-784-input"
            name="search-784-input"
            value={query}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        )}
        {query.trim() !== '' && (
          <div
            className="w-10 group rounded-r-lg cursor-pointer hover:bg-[#1212ff] bg-[#000091] flex items-center justify-center"
            onClick={_ => setQuery('')}
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
                      Autre
                    </button>
                    <div className={'fr-tile__body'}>{i18n.m.displayAllAnomalies}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {suggestions.length === 0 && (
        <div className="fr-callout ">
          <h3 className="fr-callout__title">{i18n.m.noResultFound}</h3>
          <p className="fr-callout__text">Veuillez essayer avec un nouveau mot clé ou choisir dans la liste des catégories</p>
          <button className="fr-btn" onClick={_ => setQuery('')}>
            Voir toutes les catégories
          </button>
        </div>
      )}
    </>
  )
}

export default SearchAnomalies
