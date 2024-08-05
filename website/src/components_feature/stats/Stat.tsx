import {CountByDate} from '@/clients/SignalConsoApiClient'
import {useI18n} from '@/i18n/I18n'
import {useColors} from '@codegouvfr/react-dsfr/useColors'
import {useQuery} from '@tanstack/react-query'
import React, {useEffect, useId, useState} from 'react'
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'

interface Props {
  name: string
  title: string
  description?: string
  percentage?: boolean
  count: () => Promise<number>
  curve?: () => Promise<CountByDate[]>
}

export const Stat = React.memo(({name, count, curve, title, description, percentage}: Props) => {
  const {m, formatLargeNumber} = useI18n()

  const _count = useQuery({queryKey: ['stats_count', name], queryFn: count})
  const _curve = useQuery({
    queryKey: ['stats_curve', name],
    queryFn: curve ?? (() => Promise.resolve(undefined)),
    enabled: !!curve,
  })
  const formatCurveDate = ({date, count}: CountByDate): {date: string; count: number} => ({
    date: (m.monthShort_ as any)[date.getMonth() + 1],
    count,
  })

  return (
    <div className="border border-solid border-black p-4">
      <h2 className="mb-0 font-normal">
        {_count.data !== undefined ? (
          <>
            {formatLargeNumber(_count.data)} {percentage && '%'}
          </>
        ) : (
          <span>&nbsp;</span>
        )}
      </h2>

      <p>{title}</p>
      {description && <p>{description}</p>}

      {curve && (
        <>
          <div className="h-40 md:h-64 lg:h-80 mt-4 flex items-center justify-center">
            {_curve.isPending ? (
              <div className="h-full w-full bg-gray-200 rounded-xl" />
            ) : (
              _curve.data && <ActualChart data={_curve.data.map(formatCurveDate)} name={name} />
            )}
          </div>
          <AccessibleDataDropdown data={_curve.data} {...{name}} />
        </>
      )}
    </div>
  )
})

// Purement pour des raisons d'accessibilité
function AccessibleDataDropdown({name, data}: {name: string; data?: CountByDate[]}) {
  const {m} = useI18n()
  const [expanded, setIsExpanded] = useState(false)
  function formatDate(d: Date): string {
    return (m.month_ as any)[d.getMonth() + 1]
  }

  return (
    <div>
      <button type="button" aria-expanded={expanded} onClick={() => setIsExpanded(!expanded)}>
        {m.seeRawGraphData}
        {expanded ? <> ({m.fold})</> : null}
      </button>
      {data && expanded && (
        <ul className="text-sm bg-gray-100 p-2 list-inside">
          {data.map(row => {
            return (
              <li key={row.date.toISOString()}>
                {name} {m.inMonth} {formatDate(row.date)} : {row.count}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

// Polling to detect when the SVG is mounted
// The usual method with the ref attribute didn't seem to work
// it's probably not implemented correctly by the underlying lib
function useElementManualModification(eltId: string, applyModification: (elt: Element) => void) {
  useEffect(() => {
    const intervalId = setInterval(() => {
      const elt = document.getElementById(eltId)
      if (elt) {
        applyModification(elt)
        clearInterval(intervalId)
      }
    }, 100)
    return () => clearInterval(intervalId)
  }, [])
}

function ActualChart({data, name}: {data: {date: string; count: number}[]; name: string}) {
  const dsfrTheme = useColors()
  const {m} = useI18n()
  const svgId = useId()
  useElementManualModification(svgId, svg => {
    svg.setAttribute('aria-label', `${name} (${m.detailGraphDataAvailable})`)
  })
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        role="img"
        accessibilityLayer
        id={svgId}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar legendType={'none'} name={name} dataKey="count" fill={dsfrTheme.decisions.artwork.minor.blueEcume.default} />
      </BarChart>
    </ResponsiveContainer>
  )
}
