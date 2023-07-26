import {CountByDate} from 'clients/SignalConsoApiClient'
import {useI18n} from 'i18n/I18n'
import React, {useEffect} from 'react'
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'
import {Txt} from '../../alexlibs/mui-extension/Txt/Txt'
import {useFetcher} from '../../hooks/useFetcher'
import {ifDefined} from '../../utils/utils'
import {useColors} from '@codegouvfr/react-dsfr/useColors'

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
  const _curve = useFetcher(curve ?? (() => Promise.resolve(undefined)))
  const _count = useFetcher(count)
  const formatCurveDate = ({date, count}: CountByDate): {date: string; count: number} => ({
    date: (m.monthShort_ as any)[date.getMonth() + 1],
    count,
  })
  useEffect(() => {
    if (curve) _curve.fetch({force: true, clean: true})
    _count.fetch({force: true, clean: true})
  }, [])
  const dsfrTheme = useColors()

  return (
    <div className="border border-solid border-black p-4">
      <Txt
        block
        component="h2"
        skeleton={_count.loading && 100}
        sx={{
          lineHeight: 1,
          fontSize: 34,
          mb: 0,
          fontWeight: 'normal',
        }}
      >
        {ifDefined(_count.entity ?? undefined, formatLargeNumber)} {percentage && '%'}
      </Txt>

      <p>{title}</p>
      {description && <p>{description}</p>}

      {curve && (
        <div className="h-40 md:h-64 lg:h-80 mt-4 flex items-center justify-center">
          {_curve.loading ? (
            <div className="h-full w-full bg-gray-200 rounded-xl" />
          ) : (
            _curve.entity && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={_curve.entity.map(formatCurveDate)}
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
