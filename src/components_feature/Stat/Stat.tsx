import {useColors} from '@codegouvfr/react-dsfr/useColors'
import {useQuery} from '@tanstack/react-query'
import {CountByDate} from 'clients/SignalConsoApiClient'
import {useI18n} from 'i18n/I18n'
import React from 'react'
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'
import {Txt} from '../../alexlibs/mui-extension/Txt/Txt'
import {ifDefined} from '../../utils/utils'

interface Props {
  name?: string
  title: string
  description?: string
  percentage?: boolean
  count: () => Promise<number>
  curve?: () => Promise<CountByDate[]>
}

export const Stat = React.memo(({name, count, curve, title, description, percentage}: Props) => {
  const {m, formatLargeNumber} = useI18n()

  const _count = useQuery(['stats_count', name], count)
  const _curve = useQuery(['stats_curve', name], curve ?? (() => Promise.resolve(undefined)), {enabled: !!curve})
  const formatCurveDate = ({date, count}: CountByDate): {date: string; count: number} => ({
    date: (m.monthShort_ as any)[date.getMonth() + 1],
    count,
  })
  const dsfrTheme = useColors()
  return (
    <div className="border border-solid border-black p-4">
      <Txt
        block
        component="h2"
        skeleton={_count.data ? undefined : 100}
        sx={{
          lineHeight: 1,
          fontSize: 34,
          mb: 0,
          fontWeight: 'normal',
        }}
      >
        {ifDefined(_count.data, formatLargeNumber)} {percentage && '%'}
      </Txt>

      <p>{title}</p>
      {description && <p>{description}</p>}

      {curve && (
        <div className="h-40 md:h-64 lg:h-80 mt-4 flex items-center justify-center">
          {_curve.isLoading ? (
            <div className="h-full w-full bg-gray-200 rounded-xl" />
          ) : (
            _curve.data && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={_curve.data.map(formatCurveDate)}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    legendType={'none'}
                    name={name}
                    dataKey="count"
                    fill={dsfrTheme.decisions.artwork.minor.blueEcume.default}
                  />
                </BarChart>
              </ResponsiveContainer>
            )
          )}
        </div>
      )}
    </div>
  )
})
