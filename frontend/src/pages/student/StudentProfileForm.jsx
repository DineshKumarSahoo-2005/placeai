import { useState } from "react";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import {
  createStudentProfile,
  updateStudentProfile,
} from "../../services/studentProfileService";

import "./student-profile-form.css";

const initialFormData = {
  phone: "",
  rollNumber: "",
  branch: "",
  department: "",
  currentSemester: "",
  cgpa: "",
  activeBacklogs: "0",
  graduationYear: "",
  skills: [],
  projects: [],
  certifications: [],
};

function StudentProfileForm({ profile, onSuccess, onCancel }) {
  const [formData, setFormData] = useState(() => ({
    ...initialFormData,
    ...(profile || {}),
    currentSemester: profile?.currentSemester ?? "",
    cgpa: profile?.cgpa ?? "",
    activeBacklogs: profile?.activeBacklogs ?? 0,
    graduationYear: profile?.graduationYear ?? "",
    skills: profile?.skills ?? [],
    projects: profile?.projects ?? [],
    certifications: profile?.certifications ?? [],
  }));

  const [skillInput, setSkillInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Skills
  const addSkill = () => {
    const skill = skillInput.trim();

    if (!skill) return;

    if (
      formData.skills.some(
        (existingSkill) => existingSkill.toLowerCase() === skill.toLowerCase(),
      )
    ) {
      setSkillInput("");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, skill],
    }));

    setSkillInput("");
  };

  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  // Projects
  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          title: "",
          description: "",
          technologies: [],
          githubUrl: "",
          liveUrl: "",
        },
      ],
    }));
  };

  const updateProject = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((project, i) =>
        i === index ? { ...project, [field]: value } : project,
      ),
    }));
  };

  const removeProject = (index) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  // Certifications
  const addCertification = () => {
    setFormData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          name: "",
          issuingOrganization: "",
          issueDate: "",
          credentialUrl: "",
        },
      ],
    }));
  };

  const updateCertification = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((certification, i) =>
        i === index ? { ...certification, [field]: value } : certification,
      ),
    }));
  };

  const removeCertification = (index) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      // Basic validation
      if (
        !formData.phone.trim() ||
        !formData.rollNumber.trim() ||
        !formData.branch.trim() ||
        !formData.department.trim()
      ) {
        setError("Please fill in all personal and academic details.");
        return;
      }

      if (
        formData.currentSemester === "" ||
        formData.cgpa === "" ||
        formData.graduationYear === ""
      ) {
        setError("Please complete your semester, CGPA and graduation year.");
        return;
      }

      const cgpa = Number(formData.cgpa);
      const semester = Number(formData.currentSemester);
      const backlogs = Number(formData.activeBacklogs);
      const graduationYear = Number(formData.graduationYear);

      if (cgpa < 0 || cgpa > 10) {
        setError("CGPA must be between 0 and 10.");
        return;
      }

      if (semester < 1 || semester > 8) {
        setError("Semester must be between 1 and 8.");
        return;
      }

      if (backlogs < 0) {
        setError("Active backlogs cannot be negative.");
        return;
      }

      const payload = {
        ...formData,
        currentSemester: semester,
        cgpa,
        activeBacklogs: backlogs,
        graduationYear,

        skills: formData.skills,

        projects: formData.projects.map((project) => ({
          ...project,
          technologies:
            typeof project.technologies === "string"
              ? project.technologies
                  .split(",")
                  .map((technology) => technology.trim())
                  .filter(Boolean)
              : project.technologies,
        })),
      };

      const data = profile
        ? await updateStudentProfile(payload)
        : await createStudentProfile(payload);

      onSuccess(data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to save your profile. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-profile-form-page">
      <button className="form-back-button" onClick={onCancel}>
        <ArrowLeft size={16} />
        Back to profile
      </button>

      <div className="profile-form-header">
        <span className="profile-eyebrow">STUDENT PORTAL</span>
        <h1>{profile ? "Edit your profile" : "Create your profile"}</h1>
        <p>
          Share your academic background, skills and experience with your
          placement team.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="student-profile-form">
        {/* Personal details */}
        <section className="profile-form-section">
          <div className="form-section-heading">
            <span className="form-section-number">01</span>
            <div>
              <h2>Personal details</h2>
              <p>Basic information about you.</p>
            </div>
          </div>

          <div className="profile-form-grid">
            <div className="profile-form-field">
              <label htmlFor="phone">Phone number</label>
              <input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                maxLength={15}
              />
            </div>

            <div className="profile-form-field">
              <label htmlFor="rollNumber">Roll number</label>
              <input
                id="rollNumber"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                placeholder="Enter roll number"
                maxLength={30}
              />
            </div>
          </div>
        </section>

        {/* Academic details */}
        <section className="profile-form-section">
          <div className="form-section-heading">
            <span className="form-section-number">02</span>
            <div>
              <h2>Academic details</h2>
              <p>Your academic background and current standing.</p>
            </div>
          </div>

          <div className="profile-form-grid">
            <div className="profile-form-field">
              <label htmlFor="branch">Branch</label>
              <input
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                placeholder="e.g. CSE"
                maxLength={50}
              />
            </div>

            <div className="profile-form-field">
              <label htmlFor="department">Department</label>
              <input
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="e.g. Computer Science"
                maxLength={100}
              />
            </div>

            <div className="profile-form-field">
              <label htmlFor="currentSemester">Current semester</label>
              <input
                id="currentSemester"
                name="currentSemester"
                type="number"
                min="1"
                max="8"
                value={formData.currentSemester}
                onChange={handleChange}
                placeholder="1–8"
              />
            </div>

            <div className="profile-form-field">
              <label htmlFor="cgpa">CGPA</label>
              <input
                id="cgpa"
                name="cgpa"
                type="number"
                min="0"
                max="10"
                step="0.01"
                value={formData.cgpa}
                onChange={handleChange}
                placeholder="0–10"
              />
            </div>

            <div className="profile-form-field">
              <label htmlFor="activeBacklogs">Active backlogs</label>
              <input
                id="activeBacklogs"
                name="activeBacklogs"
                type="number"
                min="0"
                value={formData.activeBacklogs}
                onChange={handleChange}
              />
            </div>

            <div className="profile-form-field">
              <label htmlFor="graduationYear">Graduation year</label>
              <input
                id="graduationYear"
                name="graduationYear"
                type="number"
                value={formData.graduationYear}
                onChange={handleChange}
                placeholder="e.g. 2027"
              />
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="profile-form-section">
          <div className="form-section-heading">
            <span className="form-section-number">03</span>
            <div>
              <h2>Skills</h2>
              <p>Add technologies and skills you know.</p>
            </div>
          </div>

          <div className="skill-input-row">
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="e.g. Java, React, MongoDB"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
            />

            <button
              type="button"
              className="form-add-button"
              onClick={addSkill}
              disabled={!skillInput.trim()}
            >
              <Plus size={16} />
              Add skill
            </button>
          </div>

          {formData.skills.length > 0 && (
            <div className="profile-skills-list">
              {formData.skills.map((skill) => (
                <span className="profile-skill-tag" key={skill}>
                  {skill}

                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    aria-label={`Remove ${skill}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          {formData.skills.length === 0 && (
            <p className="skills-empty-message">
              No skills added yet. Add your technical or professional skills.
            </p>
          )}
        </section>

        {/* Projects */}
        <section className="profile-form-section">
          <div className="form-section-heading">
            <span className="form-section-number">04</span>
            <div>
              <h2>Projects</h2>
              <p>Showcase your work and practical experience.</p>
            </div>
          </div>

          {formData.projects.length === 0 && (
            <p className="projects-empty-message">
              No projects added yet. Add projects to showcase your practical
              skills.
            </p>
          )}

          {formData.projects.map((project, index) => (
            <div className="dynamic-form-item" key={index}>
              <div className="dynamic-form-item-header">
                <h3>Project {index + 1}</h3>

                <button
                  type="button"
                  className="remove-item-button"
                  onClick={() => removeProject(index)}
                >
                  <Trash2 size={15} />
                  Remove
                </button>
              </div>

              <div className="profile-form-grid">
                <div className="profile-form-field full-width">
                  <label htmlFor={`project-title-${index}`}>
                    Project title
                  </label>
                  <input
                    id={`project-title-${index}`}
                    value={project.title}
                    onChange={(e) =>
                      updateProject(index, "title", e.target.value)
                    }
                    placeholder="e.g. AI Resume Analyzer"
                    maxLength={100}
                  />
                </div>

                <div className="profile-form-field full-width">
                  <label htmlFor={`project-description-${index}`}>
                    Description
                  </label>
                  <textarea
                    id={`project-description-${index}`}
                    value={project.description}
                    onChange={(e) =>
                      updateProject(index, "description", e.target.value)
                    }
                    rows={4}
                    maxLength={1000}
                    placeholder="Explain what the project does, the problem it solves and your contribution."
                  />
                </div>

                <div className="profile-form-field full-width">
                  <label htmlFor={`project-tech-${index}`}>
                    Technologies used
                  </label>
                  <input
                    id={`project-tech-${index}`}
                    value={
                      Array.isArray(project.technologies)
                        ? project.technologies.join(", ")
                        : project.technologies
                    }
                    onChange={(e) =>
                      updateProject(index, "technologies", e.target.value)
                    }
                    placeholder="React, Node.js, MongoDB"
                  />
                  <span className="form-field-hint">
                    Separate technologies with commas.
                  </span>
                </div>

                <div className="profile-form-field">
                  <label htmlFor={`project-github-${index}`}>GitHub URL</label>
                  <input
                    id={`project-github-${index}`}
                    type="url"
                    value={project.githubUrl}
                    onChange={(e) =>
                      updateProject(index, "githubUrl", e.target.value)
                    }
                    placeholder="https://github.com/username/project"
                  />
                </div>

                <div className="profile-form-field">
                  <label htmlFor={`project-live-${index}`}>
                    Live project URL
                  </label>
                  <input
                    id={`project-live-${index}`}
                    type="url"
                    value={project.liveUrl}
                    onChange={(e) =>
                      updateProject(index, "liveUrl", e.target.value)
                    }
                    placeholder="https://your-project.com"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="add-section-item-button"
            onClick={addProject}
          >
            <Plus size={17} />
            Add project
          </button>
        </section>

        {/* Certifications */}
        <section className="profile-form-section">
          <div className="form-section-heading">
            <span className="form-section-number">05</span>
            <div>
              <h2>Certifications</h2>
              <p>Add certifications and credentials you've earned.</p>
            </div>
          </div>

          {formData.certifications.length === 0 && (
            <p className="certifications-empty-message">
              No certifications added yet. Add certifications to demonstrate
              your knowledge and skills.
            </p>
          )}

          {formData.certifications.map((certification, index) => (
            <div className="dynamic-form-item" key={index}>
              <div className="dynamic-form-item-header">
                <h3>Certification {index + 1}</h3>

                <button
                  type="button"
                  className="remove-item-button"
                  onClick={() => removeCertification(index)}
                >
                  <Trash2 size={15} />
                  Remove
                </button>
              </div>

              <div className="profile-form-grid">
                <div className="profile-form-field">
                  <label htmlFor={`cert-name-${index}`}>
                    Certification name
                  </label>
                  <input
                    id={`cert-name-${index}`}
                    value={certification.name}
                    onChange={(e) =>
                      updateCertification(index, "name", e.target.value)
                    }
                    placeholder="e.g. AWS Cloud Practitioner"
                    maxLength={150}
                  />
                </div>

                <div className="profile-form-field">
                  <label htmlFor={`cert-org-${index}`}>
                    Issuing organization
                  </label>
                  <input
                    id={`cert-org-${index}`}
                    value={certification.issuingOrganization}
                    onChange={(e) =>
                      updateCertification(
                        index,
                        "issuingOrganization",
                        e.target.value,
                      )
                    }
                    placeholder="e.g. Amazon Web Services"
                    maxLength={150}
                  />
                </div>

                <div className="profile-form-field">
                  <label htmlFor={`cert-date-${index}`}>Issue date</label>
                  <input
                    id={`cert-date-${index}`}
                    type="date"
                    value={certification.issueDate?.substring(0, 10) || ""}
                    onChange={(e) =>
                      updateCertification(index, "issueDate", e.target.value)
                    }
                  />
                </div>

                <div className="profile-form-field">
                  <label htmlFor={`cert-url-${index}`}>Credential URL</label>
                  <input
                    id={`cert-url-${index}`}
                    type="url"
                    value={certification.credentialUrl}
                    onChange={(e) =>
                      updateCertification(
                        index,
                        "credentialUrl",
                        e.target.value,
                      )
                    }
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="add-section-item-button"
            onClick={addCertification}
          >
            <Plus size={17} />
            Add certification
          </button>
        </section>

        {error && <div className="profile-form-error">{error}</div>}

        {/* Form actions */}
        <div className="profile-form-actions">
          <button
            type="button"
            className="form-cancel-button"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="form-submit-button"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : profile
                ? "Save changes"
                : "Create profile"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default StudentProfileForm;
