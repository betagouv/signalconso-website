import React, {useEffect, useRef, useState} from 'react'
import Fuse from 'fuse.js'
import {Anomaly} from '../../anomalies/Anomaly'
import {useColors} from '@codegouvfr/react-dsfr/useColors'
import {allVisibleAnomalies, AnomalyIndex, createFuseIndex} from '../../anomalies/Anomalies'
import {AnomalySearchResultTile} from '../AnomalyCard/AnomalySearchResultTile'
import {useAnalyticContext} from '../../analytic/AnalyticContext'
import {EventCategories} from '../../analytic/analytic'

type SearchBarProps = {
  anomalies: Anomaly[]
}

const SearchBar: React.FC<SearchBarProps> = ({anomalies}) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<AnomalyIndex[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const dsfrTheme = useColors()
  const _analytic = useAnalyticContext()
  const fIndex = createFuseIndex(allVisibleAnomalies())

  console.log(fIndex)

  const fuse = new Fuse(fIndex, {
    keys: ['title', 'desc'],
    threshold: 0.2,
    minMatchCharLength: 4,
    distance: 100,
    ignoreLocation: true,
  })

  const searchBoxRef = useRef<HTMLDivElement>(null)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value
    setQuery(newQuery)

    if (newQuery.trim() !== '') {
      const results = fuse.search(newQuery.trim()).map(result => result.item)

      setSuggestions(results.filter((thing, i, arr) => arr.findIndex(t => t.id === thing.id) === i))
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleClickOutside = (event: MouseEvent) => {
    _analytic.trackEvent(EventCategories.categorySearch, 'Recherche par mot clé', 'keyword', query)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      <h2>Quel problème avez-vous rencontré ?</h2>
      <div className="fr-search-bar mb-8 relative" id="header-search" role="search" ref={searchBoxRef}>
        <input
          className="fr-input"
          placeholder="Rechercher par mot clé"
          type="search"
          id="search-784-input"
          name="search-784-input"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
        />
      </div>
      <div className="fr-container--fluid">
        <div className="fr-grid-row ">
          <div className="fr-accordions-group fr-col-12">
            {suggestions
              .map(ano => ano.root)
              .filter((thing, i, arr) => arr.findIndex(t => t.id === thing.id) === i)
              .map(a => (
                <section key={a.id} className="fr-accordion m-2">
                  <h3 className="fr-accordion__title bg-white mt-3 shadow-xl">
                    <button className="fr-accordion__btn" aria-expanded="false" aria-controls={`accordion-${a.id}`}>
                      <div className="max-h-20  w-20 mr-4 flex">
                        <img className="fr-responsive-img" src={`/image/pictos/${a.img}.png`} alt={a.title} />
                      </div>
                      <div>
                        <h3>{a.title}</h3>
                        <div className="m-2">{a.description}</div>
                      </div>
                    </button>
                  </h3>
                  <div className="fr-collapse" id={`accordion-${a.id}`}>
                    {suggestions
                      .filter(_a => a.id == _a.root.id)
                      .map(subAnomaly => (
                        <div key={subAnomaly.id} className="m-1">
                          <AnomalySearchResultTile anomaly={subAnomaly} />
                        </div>
                      ))}
                  </div>
                </section>
              ))}
          </div>
        </div>
      </div>

      {suggestions.length > 0 && <h2 className={'mt-6'}>Autres résultats :</h2>}
    </>
  )
}

export default SearchBar
