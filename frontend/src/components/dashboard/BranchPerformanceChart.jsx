import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function BranchPerformanceChart({ data = [] }) {
  const chartData = data.map((branch) => ({
    branch: branch._id || "Unknown",
    Applications: Number(branch.totalApplications || 0),
    Selected: Number(branch.selectedApplications || 0),
  }));

  return (
    <section className="analytics-panel">
      <div className="panel-heading">
        <div>
          <h3>Branch performance</h3>
          <p>Applications and selections by department</p>
        </div>
      </div>

      {chartData.length === 0 ? (
        <div className="chart-empty">
          <p>No branch data available</p>
          <span>Branch statistics will appear here.</span>
        </div>
      ) : (
        <div className="branch-chart">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={chartData}
              margin={{ top: 15, right: 10, left: -20, bottom: 5 }}
              barGap={8}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e5e7eb"
              />

              <XAxis
                dataKey="branch"
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                allowDecimals={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip />

              <Bar
                dataKey="Applications"
                fill="#3268d5"
                radius={[5, 5, 0, 0]}
                maxBarSize={42}
              />

              <Bar
                dataKey="Selected"
                fill="#10b981"
                radius={[5, 5, 0, 0]}
                maxBarSize={42}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}
