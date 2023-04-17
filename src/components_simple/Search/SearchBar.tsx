import React, {useState, useEffect, useRef} from 'react'
import Fuse from 'fuse.js'
import {Anomaly} from '../../anomalies/Anomaly'
import {useColors} from '@codegouvfr/react-dsfr/useColors'
import Link from 'next/link'
import {cx} from '@codegouvfr/react-dsfr/tools/cx'
import {allVisibleAnomalies, createFuseIndex} from '../../anomalies/Anomalies'

type SearchBarProps = {
  anomalies: Anomaly[]
}

const SearchBar: React.FC<SearchBarProps> = ({anomalies}) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Anomaly[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const dsfrTheme = useColors()
  const fuse = new Fuse(createFuseIndex(allVisibleAnomalies()), {
    keys: ['title', 'desc'],
    threshold: 0.2,
    minMatchCharLength: 3,
    distance: 100,
    ignoreLocation: true,
  })

  const searchBoxRef = useRef<HTMLDivElement>(null)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value
    setQuery(newQuery)

    if (newQuery.trim() !== '') {
      const results = fuse.search(newQuery.trim()).map(result => result.item)

      setSuggestions(results.map(_ => _.root).filter((thing, i, arr) => arr.findIndex(t => t.id === thing.id) === i))

      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleSelectAnomaly = (_: any) => {
    setQuery('')
    setSuggestions([])
    setShowSuggestions(false)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
      setShowSuggestions(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
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
      {showSuggestions && suggestions.length > 0 && (
        <div
          className={'w-full z-20 max-h-96 overflow-y-scroll left-0 top-full shadow-xl absolute'}
          style={{
            background: dsfrTheme.decisions.background.overlap.grey.default,
            // border: suggestions.length > 0 ? `1px solid black` : 0,
          }}
        >
          <ul className={'p-px  list-none w-full'}>
            {suggestions.map((category, index) => (
              <Link key={category.id} href={'/' + category.path}>
                <li
                  className={`hover:bg-[#f6f6f6] cursor-pointer p-1 ml-1`}
                  style={{
                    borderBottom: index !== suggestions.length - 1 ? '1px solid #ccc' : 0,
                  }}
                  key={category.id}
                  onClick={() => handleSelectAnomaly(category)}
                >
                  <b>{category.title}</b>
                  <p className={'mb-2 mt-2'}>{category.description}</p>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SearchBar
