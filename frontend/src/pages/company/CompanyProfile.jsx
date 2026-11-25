import { useEffect, useState } from "react";
import { getCompanyProfile } from "../../services/companyProfileService";
import CompanyProfileForm from "../../components/company/CompanyProfileForm";
import "./company-profile.css";

const CompanyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");
      setNotFound(false);

      const data = await getCompanyProfile();
      setProfile(data);
    } catch (err) {
      if (err.response?.status === 404) {
        setNotFound(true);
        setProfile(null);
      } else {
        setError(
          err.response?.data?.message || "Unable to load company profile.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleSuccess = (data) => {
    setProfile(data);
    setNotFound(false);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="company-profile-loading">Loading company profile...</div>
    );
  }

  if (error) {
    return (
      <div className="company-profile-error">
        <p>{error}</p>
        <button onClick={loadProfile}>Retry</button>
      </div>
    );
  }

  return (
    <div className="company-profile-page">
      <div className="company-profile-header">
        <div>
          <h1>Company Profile</h1>
          <p>Manage your company's information.</p>
        </div>
      </div>

      {showForm ? (
        <CompanyProfileForm
          profile={profile}
          onSuccess={handleSuccess}
          onCancel={() => setShowForm(false)}
        />
      ) : notFound ? (
        <div className="company-profile-empty">
          <h2>Company profile not created</h2>
          <p>
            Create your company profile to start managing recruitment
            activities.
          </p>
          <button onClick={() => setShowForm(true)}>
            Create Company Profile
          </button>
        </div>
      ) : (
        <div className="company-profile-view">
          <div className="company-profile-summary">
            <div>
              <h2>{profile?.companyName}</h2>
              <p>{profile?.industry}</p>

              <span
                className={`company-profile-verification ${
                  profile?.verificationStatus || "pending"
                }`}
              >
                {profile?.verificationStatus || "pending"}
              </span>
            </div>

            <button onClick={() => setShowForm(true)}>Edit Profile</button>
          </div>

          <div className="company-profile-details">
            <div className="company-profile-detail">
              <label>Website</label>
              <p>
                {profile?.website ? (
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {profile.website}
                  </a>
                ) : (
                  "Not provided"
                )}
              </p>
            </div>

            <div className="company-profile-detail">
              <label>Headquarters</label>
              <p>{profile?.headquarters || "Not provided"}</p>
            </div>

            <div className="company-profile-detail">
              <label>Company size</label>
              <p>{profile?.companySize || "Not provided"}</p>
            </div>

            <div className="company-profile-detail">
              <label>Contact person</label>
              <p>{profile?.contactPerson || "Not provided"}</p>
            </div>

            <div className="company-profile-detail">
              <label>Contact email</label>
              <p>{profile?.contactEmail || "Not provided"}</p>
            </div>

            <div className="company-profile-detail">
              <label>Contact phone</label>
              <p>{profile?.contactPhone || "Not provided"}</p>
            </div>
          </div>

          {profile?.description && (
            <div className="company-profile-description">
              <h3>About the company</h3>
              <p>{profile.description}</p>
            </div>
          )}

          {profile?.verificationStatus === "rejected" &&
            profile?.rejectionReason && (
              <div className="company-profile-rejection">
                <strong>Verification rejected:</strong>{" "}
                {profile.rejectionReason}
              </div>
            )}

          {profile?.description && (
            <div className="company-profile-description">
              <h3>About the company</h3>
              <p>{profile.description}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;
