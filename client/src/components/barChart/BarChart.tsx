// styles
import './barChart.scss'

// types
import { ReactElement } from 'react'

import {
  BarChart as Chart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // TooltipProps,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface BarChartData {
  day: string
  kilogram: number
  calories: number
  index: number
}

interface BarChartProps {
  datas: BarChartData[] | undefined
  index: number
}

export default function BarChart({ datas }: BarChartProps): ReactElement {
  console.log('datas (barCharts) —>', datas)

  const transformedData = datas?.map((data: BarChartData, idx: number) => ({
    ...data,
    index: idx + 1,
  }))

  // const CustomToolTip = ({
  //   active,
  //   payload,
  // }: TooltipProps<number, string>): ReactElement | null => {
  //   if (active && payload) {
  //     return (
  //       <div className="custom-tooltip">
  //         <p className="label">{`${payload[0].value} kg`}</p>
  //         <p className="label">{`${payload[1].value} kCal`}</p>
  //       </div>
  //     )
  //   }
  //   return null
  // }

  const legendFormatter = (value: string) => {
    if (value === 'kilogram') return 'Poids (kg)'
    if (value === 'calories') return 'Calories brûlées (kCal)'
    return value
  }

  return (
    <div id="barChart">
      <h2>Activité quotidienne</h2>
      <ResponsiveContainer width="100%" height="100%">
        <Chart
          data={transformedData}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
          barCategoryGap="0%"
          barGap={0}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#dedede"
            vertical={false}
          />
          <XAxis dataKey="index" padding={{ left: 0, right: 0 }} />
          <YAxis
            yAxisId="left"
            orientation="right"
            stroke="#9B9EAC"
            axisLine={false}
            tickLine={false}
            dx={15}
            dy={-4}
            domain={['dataMin - 1', 'dataMax']}
            allowDecimals={false}
          />
          <YAxis
            yAxisId="right"
            orientation="left"
            stroke="#9B9EAC"
            axisLine={false}
            tickLine={false}
            tick={false}
            label={{ display: 'none' }}
          />
          <Tooltip
            allowEscapeViewBox={{ x: true, y: true }}
            // content={<CustomToolTip />} //
          />
          <Legend
            verticalAlign="top"
            align="right"
            height={70}
            iconType="circle"
            iconSize={10}
            wrapperStyle={{
              top: '-9%',
              right: '2rem',
              lineHeight: '40px',
            }}
            formatter={legendFormatter}
          />
          <Bar
            yAxisId="left"
            dataKey="kilogram"
            fill="#000000"
            barSize={7}
            radius={[50, 50, 0, 0]}
          />
          <Bar
            yAxisId="right"
            dataKey="calories"
            fill="#ff0000"
            barSize={7}
            radius={[50, 50, 0, 0]}
          />
        </Chart>
      </ResponsiveContainer>
    </div>
  )
}
