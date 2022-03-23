import React, {useEffect} from 'react'
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'
import {Box, createTheme} from '@mui/system'
import {Panel} from 'shared/Panel/Panel'
import {CountByDate, SimpleStat} from '@signal-conso/signalconso-api-sdk-js'
import {useI18n} from 'core/i18n'
import {useFetcher} from '@alexandreannic/react-hooks-lib'
import {Txt} from 'mui-extension'
import {map} from '@alexandreannic/ts-utils'
import {Skeleton} from '@mui/material'

interface Props {
  name?: string
  title: string
  description?: string,
  percentage?: boolean
  count: () => Promise<SimpleStat>
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
    if (curve)
      _curve.fetch({force: true, clean: true})
    _count.fetch({force: true, clean: true})
  }, [])

  return (
    <Panel border>
      <Box>
        <Txt block skeleton={_count.loading && 100} sx={{
          lineHeight: 1,
          fontSize: 34,
          fontWeight: t => t.typography.fontWeightBold,
          color: t => t.palette.primary.main,
        }}>{map(_count.entity?.value as number | undefined, formatLargeNumber)} {percentage && '%'}</Txt>

        <Txt size="big" bold block>{title}</Txt>
        {description && <Txt color="hint">{description}</Txt>}

        {curve && (

          <Box sx={{height: 400, mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {_curve.loading ? (
              <Skeleton variant="rectangular" height={360} width="100%" sx={{borderRadius: '8px'}}/>
            ) : _curve.entity && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  height={300}
                  data={_curve.entity.map(formatCurveDate)}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="date"/>
                  <YAxis/>
                  <Tooltip/>
                  <Legend/>
                  <Bar legendType={'none'} name={name} dataKey="count" fill="#407e99"/>
                </BarChart>
              </ResponsiveContainer>
            )}
          </Box>
        )}
      </Box>
    </Panel>
  )
})
