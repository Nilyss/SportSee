// styles
import './radarChart.scss'

// types
import { ReactElement } from 'react'

interface IRadarChartDatas {
  value: number
  kind: number
}

interface IRadarChartProps {
  datas: IRadarChartDatas[]
}

interface IRadarChartDataFormated {
  A: number
  subject: number
}

// hooks | library
import {
  RadarChart as Chart,
  ResponsiveContainer,
  Radar,
  PolarAngleAxis,
  PolarGrid,
} from 'recharts'

export default function RadarChart({ datas }: IRadarChartProps): ReactElement {
  const data: IRadarChartDataFormated[] = datas.map(
    (data: IRadarChartDatas): IRadarChartDataFormated => {
      return {
        A: data.value,
        subject: data.kind,
      }
    },
  )

  const kindDictionary = (data: IRadarChartDataFormated): string => {
    const kind: number = data.subject
    switch (kind) {
      case 1:
        return 'Intensité'
      case 2:
        return 'Vitesse'
      case 3:
        return 'Force'
      case 4:
        return 'Endurance'
      case 5:
        return 'Energie'
      case 6:
        return 'Cardio'
      default:
        return 'Valeur inconnue'
    }
  }

  return (
    <div id={'radarChart'}>
      <ResponsiveContainer width={'100%'} height={'100%'}>
        <Chart
          outerRadius="80%"
          data={data}
          margin={{ top: 35, right: 35, bottom: 35, left: 35 }}
        >
          <PolarGrid radialLines={false} />
          <PolarAngleAxis
            dataKey={kindDictionary}
            tick={{ fill: 'white', fontSize: 12 }}
          />
          <Radar
            dataKey="A"
            fill="#FF0101"
            fillOpacity={0.7}
            dot={false}
            animationEasing="ease-in-out"
          />
        </Chart>
      </ResponsiveContainer>
    </div>
  )
}
