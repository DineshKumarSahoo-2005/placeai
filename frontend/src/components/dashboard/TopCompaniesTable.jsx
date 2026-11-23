export default function TopCompaniesTable({ data = [] }) {
  if (!data.length) {
    return (
      <section className="analytics-panel">
        <div className="panel-heading">
          <div>
            <h3>Recruiter performance</h3>
            <p>Companies ranked by application activity</p>
          </div>
        </div>

        <div className="chart-empty">
          <p>No recruiter data available</p>
          <span>Company activity will appear here.</span>
        </div>
      </section>
    );
  }

  return (
    <section className="analytics-panel">
      <div className="panel-heading">
        <div>
          <h3>Recruiter performance</h3>
          <p>Companies ranked by application activity</p>
        </div>
      </div>

      <div className="company-table-wrapper">
        <table className="company-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Applications</th>
              <th>Shortlisted</th>
              <th>Selected</th>
            </tr>
          </thead>

          <tbody>
            {data.map((company) => (
              <tr key={company._id}>
                <td>
                  <div className="company-name-cell">
                    <div className="company-avatar">
                      {company.companyName?.charAt(0)?.toUpperCase() || "C"}
                    </div>

                    <div>
                      <strong>{company.companyName}</strong>
                      <span>
                        {company.industry || "Industry not specified"}
                      </span>
                    </div>
                  </div>
                </td>

                <td>{company.totalApplications}</td>
                <td>{company.shortlistedApplications}</td>
                <td>
                  <span className="selected-count">
                    {company.selectedApplications}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
