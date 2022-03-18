import React from 'react'
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {CountByValue} from "./CountByValue";
import {Box, createTheme, height} from "@mui/system";
import {Panel} from "../../shared/Panel/Panel";

interface Props {
  name?: string
  count: string | number
  curve?: CountByValue[]
  title: string
  description?: string,
  percentage?: boolean
}


const statTheme = createTheme({
  palette: {
    title: {
      lineHeight: 1,
      textAlign: 'center',
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#407e99',
    },
    panelWithChart: {
      height: 500
    },
    panelWithNoChart: {
      height: 200
    }
  }
});

export const Stat = React.memo(({name, count, curve, title, description, percentage}: Props) => {
  return (
    <Panel border sx={{height : curve ? 500 : 150}}>
      <Box component="div" sx={{height : 300}}>
        <br/>
        <Box component="span" sx={statTheme.palette.title}> {count} {percentage && "%"} </Box>

        <Box component="div" sx={{fontWeight: 'bold', fontSize: '18px',}}> {title}</Box>
        {description && <Box component="div" sx={{color: '#697584', fontSize: '16px',}}> {description}</Box>}

        {curve && name &&
          <span>
            <br/>
            <br/>
          <ResponsiveContainer width="100%" height="100%">
          <BarChart
            height={300}
            data={curve}
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
            <Bar legendType={"none"} name={name} dataKey="count" fill="#407e99"/>
          </BarChart>
        </ResponsiveContainer> </span>}

      </Box>
    </Panel>
  )
})
