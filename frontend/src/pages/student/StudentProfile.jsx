import { useEffect, useState } from "react";
import {
  UserRound,
  GraduationCap,
  Code2,
  FolderGit2,
  Award,
  Pencil,
  ArrowUpRight,
  Plus,
} from "lucide-react";

import { getStudentProfile } from "../../services/studentProfileService";
import StudentProfileForm from "./StudentProfileForm";
import "./student-profile.css";

const profileSections = [
  { id: "personal", label: "Personal details", icon: UserRound },
  { id: "academic", label: "Academic details", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "certifications", label: "Certifications", icon: Award },
];

function StudentProfile() {
  const [activeSection, setActiveSection] = useState("personal");

  const [profile, setProfile] = useState(null);
  const [completionPercentage, setCompletionPercentage] = useState(0);

  const [loading, setLoading] = useState(true);
  const [profileNotFound, setProfileNotFound] = useState(false);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");
      setProfileNotFound(false);

      const data = await getStudentProfile();

      setProfile(data.profile);
      setCompletionPercentage(data.completionPercentage);
    } catch (error) {
      if (error.response?.status === 404) {
        setProfileNotFound(true);
        setProfile(null);
      } else {
        setError(
          error.response?.data?.message ||
            "Unable to load your profile. Please try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Handle successful profile creation/update
  const handleProfileSuccess = (data) => {
    setProfile(data.profile);
    setCompletionPercentage(data.completionPercentage);
    setProfileNotFound(false);
    setShowForm(false);
    setActiveSection("personal");
  };

  // Loading state
  if (loading) {
    return (
      <div className="profile-message">
        <p>Loading your profile...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="profile-message">
        <h3>Something went wrong</h3>
        <p>{error}</p>

        <button className="profile-edit-button" onClick={fetchProfile}>
          Try again
        </button>
      </div>
    );
  }

  // Form state
  if (showForm) {
    return (
      <StudentProfileForm
        profile={profile}
        onSuccess={handleProfileSuccess}
        onCancel={() => setShowForm(false)}
      />
    );
  }

  // Empty profile state
  if (profileNotFound) {
    return (
      <div className="student-profile-page">
        <header className="profile-page-header">
          <div>
            <span className="profile-eyebrow">STUDENT PORTAL</span>
            <h1>My Profile</h1>
            <p>
              Build your profile to showcase your academic background, skills
              and projects.
            </p>
          </div>
        </header>

        <section className="profile-empty-state">
          <div className="profile-empty-icon">
            <UserRound size={32} />
          </div>

          <span className="profile-status-label">YOUR PROFILE</span>

          <h2>Let's build your student profile</h2>

          <p>
            Add your academic details, technical skills, projects and
            certifications to help you get noticed during placement drives.
          </p>

          <button
            className="profile-create-button"
            onClick={() => setShowForm(true)}
          >
            <Plus size={17} />
            Create your profile
          </button>
        </section>
      </div>
    );
  }

  // Existing profile state
  return (
    <div className="student-profile-page">
      {/* Page heading */}
      <header className="profile-page-header">
        <div>
          <span className="profile-eyebrow">STUDENT PORTAL</span>
          <h1>My Profile</h1>
          <p>
            Manage your academic details, skills and projects to strengthen your
            placement profile.
          </p>
        </div>

        <button
          className="profile-edit-button"
          onClick={() => setShowForm(true)}
        >
          <Pencil size={16} />
          Edit profile
        </button>
      </header>

      {/* Profile overview */}
      <section className="profile-overview">
        <div className="profile-identity">
          <div className="profile-avatar">
            <UserRound size={32} />
          </div>

          <div className="profile-identity-info">
            <span className="profile-status-label">STUDENT PROFILE</span>
            <h2>{profile.user?.name || "Student"}</h2>
            <p>
              {profile.branch || "Branch not specified"}
              {profile.graduationYear
                ? ` • Class of ${profile.graduationYear}`
                : ""}
            </p>
          </div>
        </div>

        <div className="profile-completion">
          <div className="completion-heading">
            <span>Profile completion</span>
            <strong>{completionPercentage}%</strong>
          </div>

          <div className="completion-track">
            <div
              className="completion-fill"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>

          <p>Complete your details to make your profile stand out.</p>
        </div>
      </section>

      {/* Main content */}
      <div className="profile-content-layout">
        <aside className="profile-navigation">
          <span className="profile-nav-heading">PROFILE SECTIONS</span>

          {profileSections.map((section) => {
            const Icon = section.icon;

            return (
              <button
                key={section.id}
                className={`profile-nav-item ${
                  activeSection === section.id ? "active" : ""
                }`}
                onClick={() => setActiveSection(section.id)}
              >
                <Icon size={18} />
                <span>{section.label}</span>
                <ArrowUpRight size={15} className="profile-nav-arrow" />
              </button>
            );
          })}
        </aside>

        <main className="profile-section-content">
          <div className="profile-section-heading">
            <div>
              <span className="profile-section-kicker">YOUR INFORMATION</span>
              <h3>
                {
                  profileSections.find(
                    (section) => section.id === activeSection,
                  )?.label
                }
              </h3>
            </div>
          </div>

          {/* Personal */}
          {activeSection === "personal" && (
            <div className="profile-details-grid">
              <ProfileDetail label="Full name" value={profile.user?.name} />
              <ProfileDetail label="Email" value={profile.user?.email} />
              <ProfileDetail label="Phone" value={profile.phone} />
              <ProfileDetail label="Roll number" value={profile.rollNumber} />
            </div>
          )}

          {/* Academic */}
          {activeSection === "academic" && (
            <div className="profile-details-grid">
              <ProfileDetail label="Branch" value={profile.branch} />
              <ProfileDetail label="Department" value={profile.department} />
              <ProfileDetail
                label="Current semester"
                value={profile.currentSemester}
              />
              <ProfileDetail label="CGPA" value={profile.cgpa} />
              <ProfileDetail
                label="Active backlogs"
                value={profile.activeBacklogs}
              />
              <ProfileDetail
                label="Graduation year"
                value={profile.graduationYear}
              />
            </div>
          )}

          {/* Skills */}
          {activeSection === "skills" && (
            <div className="profile-display-list">
              {profile.skills?.length > 0 ? (
                profile.skills.map((skill, index) => (
                  <span className="profile-skill-tag" key={index}>
                    {skill}
                  </span>
                ))
              ) : (
                <EmptySection message="No skills added yet." />
              )}
            </div>
          )}

          {/* Projects */}
          {activeSection === "projects" && (
            <div className="profile-records-list">
              {profile.projects?.length > 0 ? (
                profile.projects.map((project, index) => (
                  <article className="profile-record" key={index}>
                    <h4>{project.title}</h4>
                    <p>{project.description}</p>

                    {project.technologies?.length > 0 && (
                      <div className="profile-display-list">
                        {project.technologies.map((technology, techIndex) => (
                          <span className="profile-skill-tag" key={techIndex}>
                            {technology}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="profile-record-links">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          GitHub
                        </a>
                      )}

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Live project
                        </a>
                      )}
                    </div>
                  </article>
                ))
              ) : (
                <EmptySection message="No projects added yet." />
              )}
            </div>
          )}

          {/* Certifications */}
          {activeSection === "certifications" && (
            <div className="profile-records-list">
              {profile.certifications?.length > 0 ? (
                profile.certifications.map((certification, index) => (
                  <article className="profile-record" key={index}>
                    <h4>{certification.name}</h4>

                    <p>{certification.issuingOrganization}</p>

                    {certification.issueDate && (
                      <span className="profile-record-date">
                        Issued:{" "}
                        {new Date(certification.issueDate).toLocaleDateString()}
                      </span>
                    )}

                    {certification.credentialUrl && (
                      <div className="profile-record-links">
                        <a
                          href={certification.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View credential
                        </a>
                      </div>
                    )}
                  </article>
                ))
              ) : (
                <EmptySection message="No certifications added yet." />
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// Reusable detail component
function ProfileDetail({ label, value }) {
  return (
    <div className="profile-detail-item">
      <span>{label}</span>
      <strong>
        {value !== undefined && value !== null && value !== ""
          ? value
          : "Not provided"}
      </strong>
    </div>
  );
}

// Reusable empty section
function EmptySection({ message }) {
  return (
    <div className="profile-section-empty">
      <p>{message}</p>
      <button
        className="profile-inline-edit-button"
        onClick={() => window.location.reload()}
      >
        Refresh
      </button>
    </div>
  );
}

export default StudentProfile;
