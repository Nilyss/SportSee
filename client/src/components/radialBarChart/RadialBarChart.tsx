// styles
import './radialBarChart.scss'

// types
import { ReactElement } from 'react'

interface IRadialBarChartProps {
  datas: UserInfos
}

// hooks | library
import {
  RadialBar,
  RadialBarChart as Chart,
  ResponsiveContainer,
} from 'recharts'
import { UserInfos } from '../../API/models/UserModels.ts'

export default function RadialBarChart({
  datas,
}: IRadialBarChartProps): ReactElement {
  const todayScore = datas.score
  const scoreFill = todayScore * 360 + 90
  const scoreValue = todayScore * 100

  const data: [{ todayScore: number; fill: string }] = [
    { todayScore: scoreFill, fill: '#ff0000' },
  ]

  return (
    <div id={'radialBarChart'}>
      <h2>Score</h2>
      <p className={'legendWrapper'}>
        <span>{scoreValue}%</span>
        <span>de votre objectif</span>
      </p>
      <ResponsiveContainer width={'100%'} height={'100%'}>
        <Chart
          innerRadius="80%"
          outerRadius="80%"
          margin={{ top: 50 }}
          barSize={10}
          data={data}
          startAngle={90}
          endAngle={scoreFill}
        >
          <RadialBar cornerRadius={5} dataKey="todayScore" />
        </Chart>
      </ResponsiveContainer>
    </div>
  )
}
