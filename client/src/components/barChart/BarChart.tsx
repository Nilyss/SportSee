// styles
import './barChart.scss'

// types
import { ReactElement } from 'react'

// hooks | library
import {
  BarChart as Chart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  TooltipProps,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface IBarChartData {
  day: string
  kilogram: number
  calories: number
}

interface IBarChartProps {
  datas: IBarChartData[]
}

export default function BarChart({ datas }: IBarChartProps): ReactElement {
  const transformedData = datas?.map((data: IBarChartData, idx: number) => ({
    ...data,
    index: idx + 1,
  }))

  const CustomToolTip = ({
    active,
    payload,
  }: TooltipProps<number, string>): ReactElement | null => {
    if (active && payload) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${payload[0].value} kg`}</p>
          <p className="desc">{`${payload[1].value} kCal`}</p>
        </div>
      )
    }
    return null
  }

  const legendFormatter = (value: string): string => {
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
            right: -40,
            left: 20,
            bottom: 0,
          }}
          barCategoryGap="0%"
          barGap={8}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#dedede"
            vertical={false}
          />
          <XAxis
            dataKey="index"
            padding={{ left: 10, right: 10 }}
            scale="point"
            dy={10}
            stroke="#9B9EAC"
          />
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
            orientation="right"
            stroke="#9B9EAC"
            axisLine={false}
            tickLine={false}
            tick={false}
            label={{ display: 'none' }}
          />
          <Tooltip
            allowEscapeViewBox={{ x: true, y: true }}
            content={<CustomToolTip />}
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
