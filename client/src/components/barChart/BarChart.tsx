// styles
import './barChart.scss';

// types
import { ReactElement } from 'react';

// Recharts components
import {
  BarChart as Chart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Define the type of data expected in the 'data' prop
interface BarChartData {
  name: string;
  pv: number;
  uv: number;
}

interface BarChartProps {
  data: BarChartData[];
}

export default function BarChart({ data }: BarChartProps): ReactElement {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <Chart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </Chart>
      </ResponsiveContainer>
    </>
  );
}
