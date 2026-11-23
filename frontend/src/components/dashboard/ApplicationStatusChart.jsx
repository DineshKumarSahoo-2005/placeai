import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const STATUS_CONFIG = [
  { key: "applied", label: "Applied", color: "#64748b" },
  { key: "under-review", label: "Under review", color: "#eab308" },
  { key: "shortlisted", label: "Shortlisted", color: "#8b5cf6" },
  { key: "selected", label: "Selected", color: "#10b981" },
  { key: "rejected", label: "Rejected", color: "#ef4444" },
  { key: "withdrawn", label: "Withdrawn", color: "#94a3b8" },
];

export default function ApplicationStatusChart({ data = {} }) {
  const chartData = STATUS_CONFIG.map((status) => ({
    name: status.label,
    value: Number(data[status.key] || 0),
    color: status.color,
  }));

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <section className="analytics-panel">
      <div className="panel-heading">
        <div>
          <h3>Application status</h3>
          <p>Distribution across recruitment stages</p>
        </div>
        <span className="panel-period">All time</span>
      </div>

      {total === 0 ? (
        <div className="chart-empty">
          <p>No application activity yet</p>
          <span>Application data will appear here.</span>
        </div>
      ) : (
        <div className="status-chart-layout">
          <div className="donut-wrapper">
            <ResponsiveContainer width="100%" height={230}>
              <PieChart>
                <Pie
                  data={chartData.filter((item) => item.value > 0)}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={72}
                  outerRadius={94}
                  paddingAngle={3}
                  stroke="none"
                >
                  {chartData
                    .filter((item) => item.value > 0)
                    .map((item) => (
                      <Cell key={item.name} fill={item.color} />
                    ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="donut-center">
              <strong>{total}</strong>
              <span>Applications</span>
            </div>
          </div>

          <div className="status-legend">
            {chartData.map((item) => (
              <div className="legend-row" key={item.name}>
                <div className="legend-label">
                  <span
                    className="legend-dot"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.name}</span>
                </div>

                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
