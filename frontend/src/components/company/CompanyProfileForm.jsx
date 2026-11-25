import { useState } from "react";
import {
  createCompanyProfile,
  updateCompanyProfile,
} from "../../services/companyProfileService";
import "./company-profile-form.css";

const initialFormData = {
  companyName: "",
  industry: "",
  website: "",
  description: "",
  headquarters: "",
  contactPerson: "",
  contactEmail: "",
  contactPhone: "",
  companySize: "",
};

const CompanyProfileForm = ({ profile, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    ...initialFormData,
    ...(profile || {}),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      if (!formData.companyName.trim() || !formData.industry.trim()) {
        setError("Company name and industry are required.");
        return;
      }

      const payload = {
        companyName: formData.companyName.trim(),
        industry: formData.industry.trim(),
        website: formData.website.trim(),
        description: formData.description.trim(),
        headquarters: formData.headquarters.trim(),
        contactPerson: formData.contactPerson.trim(),
        contactEmail: formData.contactEmail.trim(),
        contactPhone: formData.contactPhone.trim(),
        companySize: formData.companySize,
      };

      const data = profile
        ? await updateCompanyProfile(payload)
        : await createCompanyProfile(payload);

      onSuccess(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to save company profile. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="company-form-container">
      <div className="company-form-heading">
        <h2>{profile ? "Edit Company Profile" : "Create Company Profile"}</h2>
        <p>
          Provide accurate information so students can learn about your
          organization.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <section className="company-form-section">
          <h3>Company information</h3>

          <div className="company-form-grid">
            <div className="company-form-field">
              <label htmlFor="companyName">Company name *</label>
              <input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                maxLength={150}
                required
                placeholder="Enter company name"
              />
            </div>

            <div className="company-form-field">
              <label htmlFor="industry">Industry *</label>
              <input
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
                placeholder="e.g. Information Technology"
              />
            </div>

            <div className="company-form-field">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="url"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com"
              />
              <span className="company-form-hint">Include https://</span>
            </div>

            <div className="company-form-field">
              <label htmlFor="headquarters">Headquarters</label>
              <input
                id="headquarters"
                name="headquarters"
                value={formData.headquarters}
                onChange={handleChange}
                placeholder="City, Country"
              />
            </div>

            <div className="company-form-field">
              <label htmlFor="companySize">Company size</label>
              <select
                id="companySize"
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
              >
                <option value="">Select company size</option>
                <option value="1-10">1–10 employees</option>
                <option value="11-50">11–50 employees</option>
                <option value="51-200">51–200 employees</option>
                <option value="201-500">201–500 employees</option>
                <option value="501-1000">501–1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </select>
            </div>

            <div className="company-form-field full-width">
              <label htmlFor="description">Company description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                maxLength={2000}
                placeholder="Tell students about your organization, culture and opportunities..."
              />
              <span className="company-form-hint">
                Maximum 2000 characters.
              </span>
            </div>
          </div>
        </section>

        <section className="company-form-section">
          <h3>Contact information</h3>

          <div className="company-form-grid">
            <div className="company-form-field">
              <label htmlFor="contactPerson">Contact person</label>
              <input
                id="contactPerson"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                placeholder="HR representative name"
              />
            </div>

            <div className="company-form-field">
              <label htmlFor="contactEmail">Contact email</label>
              <input
                id="contactEmail"
                name="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="hr@example.com"
              />
            </div>

            <div className="company-form-field">
              <label htmlFor="contactPhone">Contact phone</label>
              <input
                id="contactPhone"
                name="contactPhone"
                type="tel"
                value={formData.contactPhone}
                onChange={handleChange}
                maxLength={20}
                placeholder="+91 9876543210"
              />
            </div>
          </div>
        </section>

        {error && <div className="company-form-error">{error}</div>}

        <div className="company-form-actions">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="company-form-btn company-form-btn-secondary"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="company-form-btn company-form-btn-primary"
          >
            {loading
              ? "Saving..."
              : profile
                ? "Update Profile"
                : "Create Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyProfileForm;
