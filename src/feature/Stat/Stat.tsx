import {Skeleton} from '@mui/material'
import {Box} from '@mui/system'
import {CountByDate} from 'client/stats/PublicStatsClient'
import {useI18n} from 'core/i18n'
import React, {useEffect} from 'react'
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'
import {Panel} from 'shared/Panel/Panel'
import {Txt} from '../../alexlibs/mui-extension'
import {useFetcher} from '../../alexlibs/react-hooks-lib'
import {map} from '../../alexlibs/ts-utils'

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
  const height = 300
  useEffect(() => {
    if (curve) _curve.fetch({force: true, clean: true})
    _count.fetch({force: true, clean: true})
  }, [])

  return (
    <Panel border>
      <Box>
        <Txt
          block
          skeleton={_count.loading && 100}
          sx={{
            lineHeight: 1,
            fontSize: 34,
            // fontWeight: t => t.typography.fontWeightBold,
            color: t => t.palette.primary.main,
          }}
        >
          {map(_count.entity ?? undefined, formatLargeNumber)} {percentage && '%'}
        </Txt>

        <Txt block bold>
          {title}
        </Txt>
        {description && <Txt color="hint">{description}</Txt>}

        {curve && (
          <Box sx={{height: height, mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {_curve.loading ? (
              <Skeleton variant="rectangular" height={height - 30} width="100%" sx={{borderRadius: '8px'}} />
            ) : (
              _curve.entity && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    height={height - 60}
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
                    <Bar legendType={'none'} name={name} dataKey="count" fill="#407e99" />
                  </BarChart>
                </ResponsiveContainer>
              )
            )}
          </Box>
        )}
      </Box>
    </Panel>
  )
})
