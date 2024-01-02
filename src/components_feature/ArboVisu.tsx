'use client'

import * as Plot from '@observablehq/plot'
import React, {useEffect, useMemo, useRef, useState} from 'react'
import {createElement as h} from 'react'
import * as d3 from 'd3'
import {allVisibleAnomalies} from '@/anomalies/Anomalies'
import {Subcategory} from '@/anomalies/Anomaly'

export function ArboVisu() {
  const containerRef = useRef<HTMLDivElement>()
  const data = useMemo(prepareData, [])

  useEffect(() => {
    if (data) {
      const plot = Plot.plot({
        axis: null,
        height: 2000,
        width: 1000,
        margin: 10,
        marginLeft: 60,
        marginRight: 200,
        marks: [
          Plot.cluster(data, {
            // textStroke: 'black'.
            // textLayout: 'mirrored',
            fontSize: '1.2em',
          }),
        ],
      })
      containerRef.current?.append(plot)
      return () => plot.remove()
    }
  }, [data])

  return <div className="shadow-lg border-solid border-black border m-4" ref={containerRef as any} />
}

const aapl = [
  {Date: new Date('2013-05-13'), Open: 64.501427, High: 65.414284, Low: 64.5, Close: 64.96286, Volume: 79237200},
  {Date: new Date('2013-05-14'), Open: 64.835716, High: 65.028572, Low: 63.164288, Close: 63.408573, Volume: 111779500},
  {Date: new Date('2013-05-15'), Open: 62.737144, High: 63.0, Low: 60.337143, Close: 61.264286, Volume: 185403400},
  {Date: new Date('2013-05-16'), Open: 60.462856, High: 62.549999, Low: 59.842857, Close: 62.082859, Volume: 150801000},
  {Date: new Date('2013-05-17'), Open: 62.721428, High: 62.869999, Low: 61.572857, Close: 61.894287, Volume: 106976100},
]

function prepareData() {
  const anomalies = allVisibleAnomalies('fr')[0].subcategories
  let paths: string[] = []
  anomalies.map(ano => {
    ano.subcategories?.map(ano2 => {
      paths.push(buildPath(ano, ano2))
      ano2.subcategories?.map(ano3 => {
        paths.push(buildPath(ano, ano2, ano3))
      })
    })
  })
  return paths
}

const gods = [
  'Chaos/Eros',
  'Chaos/Erebus',
  'Chaos/Tartarus',
  'Chaos/Gaia/Mountains',
  'Chaos/Gaia/Pontus',
  'Chaos/Gaia/Uranus',
  'other/taf',
]

function buildPath(...subcats: {title: string}[]) {
  return subcats.map(_ => _.title.replaceAll(`/`, '_')).join('/')
}
