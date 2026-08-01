import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const RevenueGraph = ({ graphData, isAnimationActive = true }) => (
  <div style={{ width: "100%", height: "350px" }}>
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={graphData}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2c7af8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#327ef8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          interval={0}
          tick={{ fontSize: 13 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          interval={0}
          tick={{ fontSize: 14 }}
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="income"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorIncome)"
          isAnimationActive={isAnimationActive}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default RevenueGraph;
