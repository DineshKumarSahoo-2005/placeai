
import { useEffect, useState } from "react";
import {
  Users,
  Building2,
  BriefcaseBusiness,
  FileText,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react";

import {
  getOverview,
  getApplicationsByStatus,
  getBranchStatistics,
  getTopCompanies,
} from "../services/analyticsService";

import ApplicationStatusChart from "../components/dashboard/ApplicationStatusChart";
import BranchPerformanceChart from "../components/dashboard/BranchPerformanceChart";
import TopCompaniesTable from "../components/dashboard/TopCompaniesTable";

import "../components/dashboard/dashboard-analytics.css";

const initialStats = [
  {
    label: "Total Students",
    key: "totalStudentProfiles",
    note: "Registered student profiles",
    icon: Users,
    color: "blue",
  },
  {
    label: "Companies",
    key: "totalCompanies",
    note: "Registered companies",
    icon: Building2,
    color: "violet",
  },
  {
    label: "Job Drives",
    key: "totalJobDrives",
    note: "Total job drives",
    icon: BriefcaseBusiness,
    color: "amber",
  },
  {
    label: "Applications",
    key: "totalApplications",
    note: "Across all job drives",
    icon: FileText,
    color: "teal",
  },
];

function StatCard({ stat, value }) {
  const Icon = stat.icon;

  return (
    <article className="stat-card">
      <div className="stat-card-top">
        <span className="stat-label">{stat.label}</span>

        <div className={`stat-icon ${stat.color}`}>
          <Icon size={19} strokeWidth={1.8} />
        </div>
      </div>

      <div className="stat-value">{value}</div>

      <div className="stat-footer">
        <span>{stat.note}</span>
        <ArrowUpRight size={15} />
      </div>
    </article>
  );
}

function LoadingState() {
  return (
    <div className="dashboard-loading">
      <RefreshCw size={20} className="loading-icon" />
      <p>Loading placement analytics...</p>
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="dashboard-error">
      <h3>Unable to load placement analytics</h3>
      <p>{message}</p>

      <button className="retry-button" onClick={onRetry}>
        <RefreshCw size={15} />
        Retry
      </button>
    </div>
  );
}

export default function AdminDashboard() {
  const [overview, setOverview] = useState(null);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [branchStatistics, setBranchStatistics] = useState([]);
  const [topCompanies, setTopCompanies] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        overviewData,
        applicationStatusData,
        branchStatisticsData,
        topCompaniesData,
      ] = await Promise.all([
        getOverview(),
        getApplicationsByStatus(),
        getBranchStatistics(),
        getTopCompanies(),
      ]);

      setOverview(overviewData);
      setApplicationStatus(applicationStatusData);
      setBranchStatistics(branchStatisticsData);
      setTopCompanies(topCompaniesData);
    } catch (err) {
      console.error("Dashboard analytics error:", err);

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Something went wrong while fetching analytics.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-heading">
        <div>
          <p className="eyebrow">PLACEMENT OFFICE</p>

          <h1>Placement overview</h1>

          <p className="dashboard-description">
            Monitor student placements, recruiter activity and campus hiring.
          </p>
        </div>

        <div className="academic-badge">
          <span className="academic-dot" />
          <span>Academic year 2026–27</span>
        </div>
      </div>

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchDashboardData} />
      ) : (
        <>
          {/* Overview statistics */}
          <section className="stats-grid">
            {initialStats.map((stat) => (
              <StatCard
                stat={stat}
                value={overview?.[stat.key] ?? 0}
                key={stat.key}
              />
            ))}
          </section>

          {/* Analytics */}
          <section className="dashboard-section">
            <div className="section-heading">
              <div>
                <h2>Placement activity</h2>
                <p>
                  Insights into recruitment across your institution.
                </p>
              </div>
            </div>

            <div className="dashboard-analytics-grid">
              <ApplicationStatusChart
                data={applicationStatus || {}}
              />

              <BranchPerformanceChart
                data={branchStatistics || []}
              />
            </div>
          </section>

          {/* Company performance */}
          <section className="dashboard-section">
            <TopCompaniesTable
              data={topCompanies || []}
            />
          </section>
        </>
      )}
    </div>
  );
}
