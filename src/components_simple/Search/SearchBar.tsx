import React, {useState} from 'react'
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
  const dsfrTheme = useColors()
  const fuse = new Fuse(createFuseIndex(allVisibleAnomalies()), {
    keys: ['title', 'desc'],
    threshold: 0.2,
    minMatchCharLength: 3,
    distance: 100,
    ignoreLocation: true,
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value
    setQuery(newQuery)

    if (newQuery.trim() !== '') {
      const results = fuse.search(newQuery.trim()).map(result => result.item)

      console.log(results.map(_ => _.desc))
      console.log(results.map(_ => _.title))

      setSuggestions(results.map(_ => _.root).filter((thing, i, arr) => arr.findIndex(t => t.id === thing.id) === i))
    } else {
      setSuggestions([])
    }
  }

  const handleSelectAnomaly = (_: any) => {
    setQuery('')
    setSuggestions([])
  }

  return (
    <div className="fr-search-bar mb-8 relative" id="header-search" role="search">
      <input
        className="fr-input"
        placeholder="Rechercher par mot clé"
        type="search"
        id="search-784-input"
        name="search-784-input"
        value={query}
        onChange={handleInputChange}
      />
      <div
        className={'w-full z-20 max-h-96 overflow-y-scroll left-0 top-full shadow-xl absolute'}
        style={{
          background: dsfrTheme.decisions.background.overlap.grey.default,
          // border: suggestions.length > 0 ? `1px solid black` : 0,
        }}
      >
        {suggestions.length > 0 && (
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
        )}
      </div>
    </div>
  )
}

export default SearchBar
