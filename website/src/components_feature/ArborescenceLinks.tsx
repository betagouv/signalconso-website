'use client'
import {allVisibleAnomalies} from '@/anomalies/Anomalies'
import {Anomaly} from 'shared/anomalies/Anomaly'
import {ContentPageContainer} from '@/components_simple/PageContainers'
import {useI18n} from '@/i18n/I18n'

import type {JSX} from 'react'

function extractAllStrings(input: any): string[] {
  const result: string[] = []
  function recurse(value: any): void {
    if (typeof value === 'string') {
      result.push(value)
    } else if (Array.isArray(value)) {
      for (const item of value) {
        recurse(item)
      }
    } else if (value !== null && typeof value === 'object') {
      for (const key in value) {
        if (value.hasOwnProperty(key)) {
          recurse(value[key])
        }
      }
    }
  }
  recurse(input)
  return result
}

function extractLinks(input: string): string[] {
  // find https://, http://, or www.
  const urlRegex = /(?:http:\/\/|https:\/\/|www\.)[^\s"'<>]+/g
  const matches = input.match(urlRegex)
  return matches ? matches : []
}

function listLinks(anomalies: Anomaly[]): string[] {
  const strings = extractAllStrings(anomalies)
  const links = strings.flatMap(extractLinks)
  return Array.from(new Set(links)).sort()
}

export function ArborescenceLinks(): JSX.Element {
  const {currentLang} = useI18n()
  const anomalies = allVisibleAnomalies(currentLang)

  const links = listLinks(anomalies)
  return (
    <ContentPageContainer>
      <h1 className="fr-h2">Liens présents dans l'arborescence</h1>
      <p>
        Cette page liste tous les liens qui sont présents dans l'arborescence (pour la langue {currentLang}).
        <br />
        Ils ont été détectés en faisant une simple recherche dans tout le YAML pour "https://", "http://", et "www.".
      </p>
      <p>
        Peut-être que certains de ces liens ne marchent plus. Ce serait bien de cliquer sur tous les liens de cette liste de temps
        en temps pour vérifier.
      </p>
      <ul>
        {links.map((url, i) => {
          const finalUrl = url.startsWith('www.') ? `https://${url}` : url
          return (
            <li key={i}>
              <a href={finalUrl} target="_blank">
                {url}
              </a>
            </li>
          )
        })}
      </ul>
    </ContentPageContainer>
  )
}
