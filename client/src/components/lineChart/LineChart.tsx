// styles
import './lineChart.scss'

// types
import { ReactElement } from 'react'

// hooks | library
import {
  LineChart as Chart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Rectangle,
} from 'recharts'

interface TooltipPayload {
  value: number
}

interface CustomTooltipSessionsProps {
  active?: boolean
  payload?: TooltipPayload[]
}

interface CustomizedCursorProps {
  points: { x: number; y: number }[]
}

interface ILineChartData {
  day: number
  sessionLength: number
}

interface ILineChartProps {
  datas: ILineChartData[]
}

const CustomTooltipSessions = ({
  active,
  payload,
}: CustomTooltipSessionsProps): ReactElement | null => {
  if (active && payload && payload.length > 0) {
    return (
      <div className="custom-tooltip-sessions">
        <p className="label">{`${payload[0].value} min`}</p>
      </div>
    )
  }

  return null
}

const CustomizedCursor = ({ points }: CustomizedCursorProps): ReactElement => {
  return (
    <Rectangle
      fill="#000000"
      opacity={0.1}
      x={points[0].x}
      width={258}
      height={263}
    />
  )
}

export default function LineChart({ datas }: ILineChartProps): ReactElement {
  const reformatedDay = (day: number): string => {
    const days: string[] = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
    return days[day - 1]
  }

  const transformedData = datas?.map((data: ILineChartData, idx: number) => ({
    ...data,
    day: reformatedDay(data.day),
    index: idx + 1,
  }))

  return (
    <div id={'lineChart'}>
      <h2>Durée moyenne des sessions</h2>
      <ResponsiveContainer width={'100%'} height={'100%'}>
        <Chart
          data={transformedData}
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 15,
          }}
        >
          <defs>
            <linearGradient
              id="paint0_linear_2_122"
              x1="309.906"
              y1="-1.97779"
              x2="-47.7754"
              y2="-1.97779"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" />
              <stop
                offset="0.810441"
                stopColor="white"
                stopOpacity="0.403191"
              />
            </linearGradient>
          </defs>
          <XAxis
            className="lineXAxis"
            dataKey="day"
            stroke="#ffffff81"
            padding={{ left: 4.4, right: 0 }}
            axisLine={false}
            tickLine={false}
          ></XAxis>
          <YAxis
            type="number"
            domain={['dataMin - 10', 'dataMax']}
            padding={{ top: 80, bottom: 15 }}
            hide={true}
          />
          <Tooltip
            content={<CustomTooltipSessions />}
            cursor={<CustomizedCursor points={[{ x: 0, y: 0 }]} />}
          />
          <Line
            type="natural"
            dataKey="sessionLength"
            stroke="url(#paint0_linear_2_122)"
            strokeWidth={2}
            activeDot={{ stroke: '#ffffff33', strokeWidth: 12, r: 5 }}
            dot={false}
            animationEasing="ease-in-out"
          />
        </Chart>
      </ResponsiveContainer>
    </div>
  )
}
